"""
ScienceGuide Fast Streaming TTS Server
- Uses Microsoft Edge Neural TTS with real-time streaming chunks
- Transfer-Encoding: chunked for near-zero latency playback
- Cache for instant repeat queries
"""
import io, asyncio, urllib.parse, hashlib, os, sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

CACHE_DIR = "__tts_cache__"
os.makedirs(CACHE_DIR, exist_ok=True)

VOICE_NAME = "ar-EG-ShakirNeural"  # Egyptian Male Teacher Voice

def get_cache_path(text):
    h = hashlib.md5(f"{VOICE_NAME}:{text}".encode("utf-8")).hexdigest()
    return os.path.join(CACHE_DIR, f"{h}.mp3")

async def stream_edge_tts(text, wfile, cache_file=None):
    import edge_tts
    # rate="+10%" for quick, energetic, natural 30-year-old Egyptian teacher style
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
    if cache_file and chunks:
        try:
            with open(cache_file, "wb") as f:
                f.write(b"".join(chunks))
        except Exception:
            pass

class FastTTSHandler(SimpleHTTPRequestHandler):
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

            # If cached, send full file immediately
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

            # Not cached: Stream in real-time as chunks arrive
            self.send_response(200)
            self.send_header("Content-Type", "audio/mpeg")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()

            try:
                asyncio.run(stream_edge_tts(text, self.wfile, cache_path))
            except Exception as e:
                print(f"[Streaming Error] {e}", file=sys.stderr)
        else:
            super().do_GET()

    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass

if __name__ == "__main__":
    print(f"ScienceGuide Fast TTS Server running on http://localhost:8000")
    print(f"Active Voice: {VOICE_NAME} (Egyptian Young Male)")
    HTTPServer(("localhost", 8000), FastTTSHandler).serve_forever()
