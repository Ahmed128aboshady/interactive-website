"""
ScienceGuide TTS Server - serves static files + Arabic TTS via gTTS
"""
import io, urllib.parse
from http.server import HTTPServer, SimpleHTTPRequestHandler
from gtts import gTTS

class TTSHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/tts"):
            parsed = urllib.parse.urlparse(self.path)
            params = urllib.parse.parse_qs(parsed.query)
            text = params.get("text", [""])[0]
            if not text:
                self.send_response(400); self.end_headers(); return
            try:
                tts = gTTS(text=text, lang="ar", slow=False)
                buf = io.BytesIO()
                tts.write_to_fp(buf)
                data = buf.getvalue()
                self.send_response(200)
                self.send_header("Content-Type", "audio/mpeg")
                self.send_header("Content-Length", str(len(data)))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(data)
            except Exception as e:
                self.send_response(500); self.end_headers(); self.wfile.write(str(e).encode())
        else:
            super().do_GET()
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()
    def log_message(self, fmt, *args): pass

if __name__ == "__main__":
    print("TTS Server at http://localhost:8000 | Arabic TTS: /tts?text=...")
    HTTPServer(("localhost", 8000), TTSHandler).serve_forever()
