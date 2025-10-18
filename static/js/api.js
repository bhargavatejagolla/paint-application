// api.js
const api = {
  postJSON: async (url, obj) => {
    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
    return resp.json();
  },
  getJSON: async (url) => {
    const resp = await fetch(url);
    return resp.json();
  },
};

// Main API
const API = {
  /**
   * Save drawing both locally (download) and on backend.
   */
  async saveDrawing(imageData, filename = null) {
    try {
      // 1️⃣ Instantly download in browser (safe for Render)
      const link = document.createElement("a");
      link.href = imageData;
      link.download =
        filename ||
        `ProPaint_${new Date()
          .toISOString()
          .replace(/[:.]/g, "-")
          .slice(0, 19)}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 2️⃣ Also save to backend (optional, temp storage)
      const response = await fetch("/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: imageData,
          filename: filename,
        }),
      });

      return await response.json();
    } catch (error) {
      console.error("Error saving drawing:", error);
      return { success: false, message: "Network error" };
    }
  },

  /**
   * Download image from server by filename (manual re-download)
   */
  downloadImage(filename) {
    window.open(`/download/${filename}`, "_blank");
  },

  /**
   * Get saved images (gallery)
   */
  async getGallery() {
    try {
      const response = await fetch("/gallery");
      return await response.json();
    } catch (error) {
      console.error("Error fetching gallery:", error);
      return { images: [] };
    }
  },

  /**
   * Apply filter to image
   */
  async applyFilter(imageData, filterType) {
    try {
      const response = await fetch("/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageData,
          filter: filterType,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error applying filter:", error);
      return { success: false, message: "Network error" };
    }
  },

  /**
   * Enhance image with AI (disabled on Render)
   */
  async enhanceImage(imageData, enhancementType = "auto") {
    try {
      const response = await fetch("/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageData,
          enhancement: enhancementType,
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error enhancing image:", error);
      return { success: false, message: "Network error" };
    }
  },
};
