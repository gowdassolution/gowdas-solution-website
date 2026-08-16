"""Tiny static dev server that disables browser caching.

Serves the current directory on http://localhost:5599 and sends
Cache-Control: no-store on every response, so edits to HTML/CSS/JS
always show up on a normal reload — no hard-refresh needed.

Run:  python serve.py
"""
import http.server

PORT = 5599


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    protocol_version = "HTTP/1.1"  # honor Content-Length so connections close cleanly

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, *args):
        pass  # keep the console quiet


if __name__ == "__main__":
    # ThreadingHTTPServer: one stuck/keep-alive connection can't block others.
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    with http.server.ThreadingHTTPServer(("", PORT), NoCacheHandler) as httpd:
        httpd.daemon_threads = True
        print(f"Gowda's Solution — serving http://localhost:{PORT}  (no-cache)", flush=True)
        httpd.serve_forever()
