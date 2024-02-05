
document.addEventListener("DOMContentLoaded", function() {
    const pinchZoom = (imageElement) => {
        let imageElementScale = 1;
        let start = {};

        const distance = (event) => {
            return Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
        };

        imageElement.addEventListener('touchstart', (event) => {
            if (event.touches.length === 2) {
                event.preventDefault();
                start.x = (event.touches[0].pageX + event.touches[1].pageX) / 2;
                start.y = (event.touches[0].pageY + event.touches[1].pageY) / 2;
                start.distance = distance(event);
            }
        });

        imageElement.addEventListener('touchmove', (event) => {
            if (event.touches.length === 2) {
                event.preventDefault();
                let scale;
                if (event.scale) {
                    scale = event.scale;
                } else {
                    const deltaDistance = distance(event);
                    scale = deltaDistance / start.distance;
                }
                imageElementScale = Math.min(Math.max(1, scale), 4);
                const deltaX = (((event.touches[0].pageX + event.touches[1].pageX) / 2) - start.x) * 2;
                const deltaY = (((event.touches[0].pageY + event.touches[1].pageY) / 2) - start.y) * 2;
                const transform = `translate3d(${deltaX}px, ${deltaY}px, 0) scale(${imageElementScale})`;
                imageElement.style.transform = transform;
                imageElement.style.WebkitTransform = transform;
                imageElement.style.zIndex = "9999";
            }
        });

        imageElement.addEventListener('touchend', (event) => {
            imageElement.style.transform = "";
            imageElement.style.WebkitTransform = "";
            imageElement.style.zIndex = "";
        });
    };

    const zoomableImages = document.querySelectorAll('.zoomable-image');
    zoomableImages.forEach(image => {
        pinchZoom(image);
    });

    // Add event listener for touchmove on the document
    document.addEventListener('touchmove', (event) => {
        if (event.touches.length === 1) {
            event.stopPropagation(); // Stop propagation to prevent interference with pinch zoom
        }
    }, { passive: false });
});