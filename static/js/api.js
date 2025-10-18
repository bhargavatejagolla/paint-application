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
// API functions for communicating with Flask backend
const API = {
    // Save drawing
    async saveDrawing(imageData, filename = null) {
        try {
            const response = await fetch('/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: imageData,
                    filename: filename
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error saving drawing:', error);
            return { success: false, message: 'Network error' };
        }
    },

    // Download image
    downloadImage(filename) {
        window.open(`/download/${filename}`, '_blank');
    },

    // Get gallery images
    async getGallery() {
        try {
            const response = await fetch('/gallery');
            return await response.json();
        } catch (error) {
            console.error('Error fetching gallery:', error);
            return { images: [] };
        }
    },

    // Apply filter
    async applyFilter(imageData, filterType) {
        try {
            const response = await fetch('/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: imageData,
                    filter: filterType
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error applying filter:', error);
            return { success: false, message: 'Network error' };
        }
    },

    // Enhance image with AI
    async enhanceImage(imageData, enhancementType = 'auto') {
        try {
            const response = await fetch('/enhance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: imageData,
                    enhancement: enhancementType
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error enhancing image:', error);
            return { success: false, message: 'Network error' };
        }
    }
};