import os, sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 2026

class Handoff2026Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '/index.html':
            self.path = '/handoff_2026.html'
        return super().do_GET()

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', PORT), Handoff2026Handler)
    print(f"Handoff 2026 Server is live and running on http://localhost:{PORT}/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Server stopped.")
