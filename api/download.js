import fetch from "node-fetch";

export default async function handler(req, res) {
  try {
    const url = req.query.url;
    const type = req.query.type; // tiktok / youtube / mp3

    if (!url) {
      return res.status(400).json({ error: "URL tidak boleh kosong" });
    }

    // ==============================
    // TIKTOK DOWNLOADER
    // ==============================
    if (type === "tiktok") {
      const apiURL = `https://api.tiklydown.me/api/download?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiURL);
      const data = await response.json();
      return res.status(200).json(data);
    }

    // ==============================
    // YOUTUBE / MP3 DOWNLOADER
    // ==============================
    if (type === "youtube" || type === "mp3") {
      const response = await fetch("https://api.onlinevideoconverter.pro/api/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url,
          format: type === "mp3" ? "mp3" : "mp4"
        })
      });

      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: "Tipe tidak dikenal" });

  } catch (err) {
    res.status(500).json({
      error: "Server error",
      detail: err.message
    });
  }
}