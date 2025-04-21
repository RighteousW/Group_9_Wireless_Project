document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');

    slider.addEventListener('mousedown', () => {
        slider.classList.add('paused');
    });

    document.addEventListener('mouseup', () => {
        slider.classList.remove('paused');
    });
});