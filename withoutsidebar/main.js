const image = document.getElementById("animeImage");
const infoBox = document.getElementById("info");
const downloadBtn = document.getElementById("downloadBtn");

async function fetchAnime() {
  image.classList.add("hidden");
  infoBox.classList.add("hidden");
  downloadBtn.classList.add("hidden");
  image.src = "";
  infoBox.innerHTML = "";

  try {
    const res = await fetch("https://pic.re/image.json", {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    const fileUrl = data.file_url.startsWith("http") ? data.file_url : "https://" + data.file_url;

    image.onload = () => {
      image.classList.remove("hidden");
      downloadBtn.classList.remove("hidden");

      downloadBtn.onclick = () => {
        const a = document.createElement("a");
        a.href = fileUrl;
        a.download = "anime.jpg";
        a.click();
      };

      infoBox.innerHTML = `
        <p class="text-lg"><strong>Tác giả:</strong> ${data.author}</p>
        <p class="text-lg"><strong>Gốc:</strong> <a class="text-blue-400 underline" href="${data.source}" target="_blank">Pixiv</a></p>
        <p class="text-lg"><strong>Kích thước:</strong> ${data.width} × ${data.height}px</p>
        <p class="text-lg"><strong>Tags:</strong> ${data.tags.slice(0, 10).join(", ")}${data.tags.length > 10 ? ", ..." : ""}</p>
      `;
      infoBox.classList.remove("hidden");
    };

    image.onerror = () => {
      image.classList.add("hidden");
      downloadBtn.classList.add("hidden");
      infoBox.innerHTML = `<p class="text-red-400 text-lg">Ảnh không tải được. Có thể lỗi kết nối.</p>`;
      infoBox.classList.remove("hidden");
    };

    image.src = fileUrl;
  } catch (err) {
    console.error("Lỗi khi fetch:", err);
    image.src = "";
    downloadBtn.classList.add("hidden");
    infoBox.innerHTML = `<p class="text-red-400 text-lg">Lỗi khi tải ảnh!</p>`;
    infoBox.classList.remove("hidden");
  }
}

function clearViewer() {
  image.src = "";
  image.classList.add("hidden");
  infoBox.innerHTML = "";
  infoBox.classList.add("hidden");
  downloadBtn.classList.add("hidden");
}
