import os, sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 4217

class PlanHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '/index.html':
            self.path = '/plan.html'
        return super().do_GET()

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', PORT), PlanHandler)
    print(f"Plan Server is live and running on http://localhost:{PORT}/")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("Server stopped.")
