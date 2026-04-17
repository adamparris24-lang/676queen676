/**
 * O.Y.O ARCHIVAL ZOOM - Global Functionality
 * Automatically handles modal injection and zoom logic for .zoomable-img
 */

(function() {
    // 1. Inject Modal HTML into the end of the body if not present
    function injectModal() {
        if (document.getElementById('photo-modal')) return;
        
        const modalHtml = `
            <div id="photo-modal">
                <span id="photo-modal-close">&times;</span>
                <img id="photo-modal-content">
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    // 2. Setup Listeners
    function initZoom() {
        injectModal();
        
        const modal = document.getElementById("photo-modal");
        const modalImg = document.getElementById("photo-modal-content");
        const closeBtn = document.getElementById("photo-modal-close");

        if (!modal || !modalImg) return;

        // Delegate clicks on .zoomable-img
        document.body.addEventListener('click', function(e) {
            if (e.target.classList.contains('zoomable-img')) {
                const img = e.target;
                modal.style.display = "flex";
                modalImg.src = img.src;
            }
        });

        // Close logic
        closeBtn.onclick = () => {
            modal.style.display = "none";
        };
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        };
    }

    // Start on DOMContentLoaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initZoom);
    } else {
        initZoom();
    }
})();
