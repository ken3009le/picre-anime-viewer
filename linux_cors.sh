#!/bin/bash

# Script: linux_cors.sh
# Purpose: Launch Chrome or Firefox with CORS disabled (for development/testing)

echo "[+] Starting CORS bypass mode on Linux..."

# Try launching Google Chrome or Chromium with CORS disabled
if command -v google-chrome >/dev/null 2>&1; then
    echo "[+] Launching Google Chrome with CORS disabled..."
    google-chrome --disable-web-security --user-data-dir=/tmp/chrome-bypass-cors --disable-gpu &
elif command -v chromium >/dev/null 2>&1; then
    echo "[+] Launching Chromium with CORS disabled..."
    chromium --disable-web-security --user-data-dir=/tmp/chrome-bypass-cors --disable-gpu &
else
    echo "[-] Chrome or Chromium not found on this system."
    echo "[*] If you're using Firefox:"
    echo "    1. Run: firefox --no-remote -P cors_profile"
    echo "    2. In the address bar, go to about:config"
    echo "    3. Set the following preferences:"
    echo "       - security.fileuri.strict_origin_policy = false"
    echo "       - privacy.file_unique_origin = false"
    echo "       - network.websocket.allowInsecureFromHTTPS = true (if needed)"
fi
