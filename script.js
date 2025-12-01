let selectedPlatform = null;

function setPlatform(p) {
  selectedPlatform = p;
  document.getElementById("status").innerText = "Platform dipilih: " + p.toUpperCase();
}

async function downloadVideo() {
  const url = document.getElementById("urlInput").value.trim();
  const status = document.getElementById("status");

  if (!selectedPlatform) {
    status.textContent = "Pilih platform dulu.";
    return;
  }

  if (!url) {
    status.textContent = "Masukkan URL dulu.";
    return;
  }

  status.textContent = "Memproses...";

  const api = `/api/download?type=${selectedPlatform}&url=${encodeURIComponent(url)}`;

  const res = await fetch(api);
  const data = await res.json();

  if (data.error) {
    status.textContent = "Error: " + data.error;
    return;
  }

  // TikTok
  if (selectedPlatform === "tiktok") {
    const dl = data.video.noWatermark || data.video.watermark;
    window.location.href = dl;
    status.textContent = "Video selesai didownload. Terima kasih sudah menggunakan website kami.";
  }

  // YouTube & MP3
  if (selectedPlatform === "youtube" || selectedPlatform === "mp3") {
    window.location.href = data.result.download_url;
    status.textContent = "Download selesai!";
  }
}