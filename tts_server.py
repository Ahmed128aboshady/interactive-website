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
    "أهلاً بيك يا بطل! أنا مستر مينا جرجس، يلا بينا نقفل امتحان العلوم سوا!",
    "أهلاً بك يا بطل! مستر مينا جرجس جاهز للشرح والتحدث معك.",
    "أهلاً بيك في منهج أولى إعدادي! اختر أي تجربة أو اسألني.",
    "أهلاً بيك في منهج تانية إعدادي! اختر أي تجربة أو اسألني.",
    "النواة موجبة الشحنة وتتركز فيها كتلة الذرة بالكامل لأن جواها بروتونات موجبة ونيوترونات متعادلة!",
    "المستوى K هو أقرب المستويات للنواة وأقلها طاقة ويتشبع باثنين إلكترون حسب قاعدة 2n²!",
    "المستوى L هو المستوى الثاني ويتشبع بـ 8 إلكترونات!",
    "المستوى M هو المستوى الثالث ويتشبع بـ 18 إلكترون كحد أقصى!",
    "الخشب كثافته 0.6 أقل من المية علشان كده بيطفو على السطح!",
    "الحديد كثافته 7.8 أكبر من المية علشان كده بيغوص في القاع فوراً!",
    "عند أعلى نقطة طاقة الوضع بتكون أكبر ما يمكن وطاقة الحركة صفر لأن السرعة صفر!",
    "عند موضع السكون السرعة بتكون أقصى ما يمكن وطاقة الحركة أكبر ما يمكن!",
    "الأقلاء فلزات نشطة جداً أحادية التكافؤ وتتفاعل مع الماء بعنف مع تصاعد الهيدروجين!",
    "الهالوجينات لافلزات نشطة تتحد مع الفلزات لتكوين الأملاح زي كلوريد الصوديوم!",
    "الماء مركب فريد بسبب الروابط الهيدروجينية اللي بتخليه يغلي عند 100 ويتجمد عند صفر!",
    "التروبوسفير هي الطبقة الأولى وفيها كل التقلبات الجوية و75% من هواء الغلاف الجوي!",
    "الستراتوسفير مناسبة لحركة الطائرات وفيها طبقة الأوزون اللي بتحمينا من الأشعة فوق البنفسجية!",
    "الله ينور عليك يا بطل! إجابة صحيحة!",
    "الله ينور عليك يا بطل! إجابة صحيحة وممتازة!",
    "معلش يا بطل، ركز في السؤال اللي جاي!",
    "عاش يا بطل! قفلت كويز أولى إعدادي بنجاح 4 من 4!",
    "عاش يا بطل! قفلت كويز تانية إعدادي بنجاح 4 من 4!"
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
