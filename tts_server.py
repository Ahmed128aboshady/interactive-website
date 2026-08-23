"""
ScienceGuide Ultra-Fast Pre-Cached & Streaming Arabic TTS Server
- Instant 0ms playback for all pre-cached lessons and common questions
- Real-time chunked streaming for dynamic custom queries
"""
import io, asyncio, urllib.parse, hashlib, os, sys, threading, time
from http.server import HTTPServer, SimpleHTTPRequestHandler

CACHE_DIR = "__tts_cache__"
os.makedirs(CACHE_DIR, exist_ok=True)

VOICE_NAME = "ar-EG-ShakirNeural"  # Egyptian Male Teacher Voice

def get_cache_path(text):
    h = hashlib.md5(f"{VOICE_NAME}:{text}".encode("utf-8")).hexdigest()
    return os.path.join(CACHE_DIR, f"{h}.mp3")

async def generate_and_save_tts(text, cache_path):
    if os.path.exists(cache_path):
        return
    import edge_tts
    communicate = edge_tts.Communicate(text, VOICE_NAME, rate="+10%", pitch="+0Hz")
    chunks = []
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            chunks.append(chunk["data"])
    if chunks:
        with open(cache_path, "wb") as f:
            f.write(b"".join(chunks))

async def stream_edge_tts(text, wfile, cache_path):
    import edge_tts
    communicate = edge_tts.Communicate(text, VOICE_NAME, rate="+10%", pitch="+0Hz")
    chunks = []
    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            data = chunk["data"]
            chunks.append(data)
            try:
                wfile.write(data)
                wfile.flush()
            except (BrokenPipeError, ConnectionResetError):
                break
    if cache_path and chunks:
        try:
            with open(cache_path, "wb") as f:
                f.write(b"".join(chunks))
        except Exception:
            pass

# Pre-cache common phrases on startup in background
PRE_CACHE_PHRASES = [
    "أهلاً بيك يا بطل! أنا مستر شريف، يلا بينا نكتشف العلوم سوا!",
    "الخلية هي وحدة البناء والوظيفة في جسم الكائن الحي",
    "لو ضغطت على رقم 1 في مجسم الخلية ستجد النواة",
    "لو ضغطت على رقم 2 في مجسم الخلية ستجد الميتوكوندريا",
    "لو ضغطت على رقم 3 في مجسم الخلية ستجد السيتوبلازم",
    "لو ضغطت على بطاقة عنصر الكربون ستجد عدده الذري 6 وكتلته الذرية 12",
    "لو ضغطت على بطاقة عنصر الأكسجين ستجد عدده الذري 8",
    "لو ضغطت على بطاقة عنصر الحديد ستجد عدده الذري 26",
    "لو ضغطت على بطاقة عنصر الهيدروجين ستجد عدده الذري 1",
    "العناصر الكيميائية هي المواد النقية الأساسية! لو ضغطت على أي عنصر ستجد بياناته",
    "لو ضغطت على زر الصلبة ستلاحظ أن الجزيئات متقاربة جداً ومتراصة",
    "لو ضغطت على زر السائلة ستشاهد أن الجزيئات تنزلق بحرية أكبر",
    "لو ضغطت على زر الغازية ستشاهد الجزيئات متباعدة جداً وتتحرك بحرية تامة",
    "توجد المادة في ثلاث حالات أساسية: الصلبة والسائلة والغازية",
    "جاهز لتحدي مستر شريف العلمي؟ لو ضغطت على زر ابدأ الكويز سيبدأ الاختبار فوراً",
    "أهلاً بك يا صديقي! مستر شريف جاهز للشرح والتحدث معك.",
    "سؤال جميل جداً! بصفتي معلم العلوم الخاص بك، يسعدني الإجابة على أي سؤال"
]

def warm_up_cache():
    time.sleep(1)
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    for phrase in PRE_CACHE_PHRASES:
        p = get_cache_path(phrase)
        if not os.path.exists(p):
            try:
                loop.run_until_complete(generate_and_save_tts(phrase, p))
            except Exception as e:
                pass
    loop.close()

class UltraFastTTSHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/tts"):
            parsed = urllib.parse.urlparse(self.path)
            params = urllib.parse.parse_qs(parsed.query)
            text = params.get("text", [""])[0].strip()
            
            if not text:
                self.send_response(400)
                self.end_headers()
                return

            cache_path = get_cache_path(text)

            # If cached: serve in 1 millisecond
            if os.path.exists(cache_path):
                try:
                    with open(cache_path, "rb") as f:
                        data = f.read()
                    self.send_response(200)
                    self.send_header("Content-Type", "audio/mpeg")
                    self.send_header("Content-Length", str(len(data)))
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.send_header("Cache-Control", "public, max-age=86400")
                    self.end_headers()
                    self.wfile.write(data)
                    return
                except Exception:
                    pass

            # Not cached: Stream real-time
            self.send_response(200)
            self.send_header("Content-Type", "audio/mpeg")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()

            try:
                asyncio.run(stream_edge_tts(text, self.wfile, cache_path))
            except Exception as e:
                pass
        else:
            super().do_GET()

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass

if __name__ == "__main__":
    threading.Thread(target=warm_up_cache, daemon=True).start()
    print("ScienceGuide Ultra-Fast TTS Server on http://localhost:8000")
    HTTPServer(("localhost", 8000), UltraFastTTSHandler).serve_forever()
