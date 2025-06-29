
# 📸 pic.re Anime Viewer

A lightweight web app to view random anime images from [`https://pic.re/image.json`] with author, source, tags, and image size displayed neatly.

---
## 📁 Folders

- `withsidebar-nocorsbypass/` – Version with tag sidebar and tag filtering (requires CORS bypass)
- `withoutsidebar/` – Minimal version with centered image display and no sidebar

---

## 🔧 Requirements

- Modern browser (Chrome/Chromium/Firefox recommended)
- Internet connection
- For `withsidebar-nocorsbypass`: must bypass CORS to fetch from pic.re

---

## 🚀 How to Run

### ▶️ `withoutsidebar/` version

Just open `index.html` in any browser. No setup needed.

---

### 🔐 `withsidebar-nocorsbypass/` version

This version uses POST requests and loads image tags dynamically. You must disable browser CORS to run it locally.

### 🪟 Windows – Using `window_cors.bat`

Create a file named `window_cors.bat` with this content: or download the file from repo

```bat
"C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemps
```
### Linux - Using `linux_cors.sh` 
```bash
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
    echo "    2. Go to: about:config"
    echo "    3. Set:"
    echo "       - security.fileuri.strict_origin_policy = false"
    echo "       - privacy.file_unique_origin = false"
    echo "       - network.websocket.allowInsecureFromHTTPS = true (if needed)"
fi
```
## 🚀 Features

- ✅ Fetch random anime images from `pic.re`
- ✅ Show image details (author, source, tags, size)
- ✅ Download button for saving the image
- ✅ Fully responsive interface (desktop & mobile)
- ✅ Centered layout for clean, focused viewing

---

## 🛠 How to Use

1. **Clone or download the project:**

```bash
git clone https://github.com/ken3009le/picre-anime-viewer
```
```bash
cd picre-anime-viewer
```

2. **Open in your browser:**

Just open the `index.html` file in any modern browser.

---

## 💡 Ideas for Improvement

- ✅ Multi-tag checkbox filtering (done)
- ✅ Sidebar toggle like ChatGPT (done)
- 🔄 Fetch and view multiple images in sequence
- 🕘 View history of previously seen images
- 🌗 Toggle dark/light mode or i18n (multi-language)

---

## 🔗 API Reference

- [https://pic.re/image.json](https://pic.re/image.json)  
  Sample response:
```json
{
  "file_url": "...",
  "author": "...",
  "tags": ["tag1", "tag2"],
  "source": "https://...",
  "width": 1920,
  "height": 1080
}
```

---

## 🧠 Credits

- 📷 Images powered by [pic.re](https://pic.re)
- 🎨 UI styled with [TailwindCSS](https://tailwindcss.com)
- 👨‍💻 Developer: Kenzema

---

## 📝 License

Free to use, modify, and share for educational or personal purposes.
