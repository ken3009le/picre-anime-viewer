const image = document.getElementById("animeImage");
const infoBox = document.getElementById("info");
const tagContainer = document.getElementById("tagContainer");
const downloadBtn = document.getElementById("downloadBtn");
const toggleBtn = document.getElementById("toggleSidebarBtn");
const sidebar = document.getElementById("sidebar");


toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("-translate-x-full");
});


async function fetchTags() {
  try {
    const res = await fetch("https://pic.re/tags");
    const tags = await res.json();

    tagContainer.innerHTML = "";
    tags.slice(0, 100).forEach(tag => {
      const div = document.createElement("div");
      div.className = "flex items-center space-x-2 text-sm";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = tag.name;
      checkbox.className = "form-checkbox text-blue-500";

      const label = document.createElement("label");
      label.textContent = `${tag.name} (${tag.count})`;

      div.appendChild(checkbox);
      div.appendChild(label);
      tagContainer.appendChild(div);
    });
  } catch (e) {
    console.error("Không thể lấy tag.", e);
  }
}


async function fetchAnime() {
  image.classList.add("hidden");
  infoBox.classList.add("hidden");
  downloadBtn.classList.add("hidden");
  image.src = "";
  infoBox.innerHTML = "";

  const selectedTags = Array.from(tagContainer.querySelectorAll("input[type=checkbox]:checked"))
    .map(cb => cb.value)
    .join(",");

  let url = "https://pic.re/image.json";
  if (selectedTags) {
    url += "?trong=" + encodeURIComponent(selectedTags);
  }

  try {
    const res = await fetch(url);
    const data = await res.json();

    const fileUrl = data.file_url.startsWith("http") ? data.file_url : "https://" + data.file_url;

    image.onload = () => {
      image.classList.remove("hidden");
      downloadBtn.classList.remove("hidden");

      downloadBtn.onclick = () => {
        const a = document.createElement("a");
        a.href = fileUrl;

        const filename = fileUrl.split("/").pop() || "anime.jpg";
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        image.src = "";
        image.classList.add("hidden");
        infoBox.innerHTML = "";
        infoBox.classList.add("hidden");
        downloadBtn.classList.add("hidden");
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

  const checkboxes = tagContainer.querySelectorAll("input[type=checkbox]");
  checkboxes.forEach(cb => cb.checked = false);
}


fetchTags();
