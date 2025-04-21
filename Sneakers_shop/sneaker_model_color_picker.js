const color_wheel = document.getElementById('color-wheel');
const ctx = color_wheel.getContext('2d');
const current_color_view = document.getElementById('output');
const alphaSlider = document.getElementById('alpha-slider');

const modelViewer = document.getElementById('warriorModel');
const materialSelect = document.getElementById('materialSelect');

let activeMaterial = 'Purpleshoe';

materialSelect.addEventListener('change', () => {
    activeMaterial = materialSelect.value;
});

function setMaterialColor(materialName, colorRGBA) {
    const material = modelViewer.model?.materials.find(mat => mat.name === materialName);
    if (!material) {
        console.warn("Material " + materialName + " not found.");
        return;
    }

    material.pbrMetallicRoughness.setBaseColorFactor(colorRGBA);
}


const drawColorWheel = () => {
    const radius = color_wheel.width / 2;
    const image = ctx.createImageData(color_wheel.width, color_wheel.height);

    for (let y = -radius; y < radius; y++) {
        for (let x = -radius; x < radius; x++) {
            const dx = x / radius;
            const dy = y / radius;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= 1) {
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);
                const hue = (angle + 360) % 360;
                const saturation = distance;
                const value = 1;

                const i = ((y + radius) * color_wheel.width + (x + radius)) * 4;
                const [r, g, b] = hsvToRgb(hue, saturation, value);
                image.data[i] = r;
                image.data[i + 1] = g;
                image.data[i + 2] = b;
                image.data[i + 3] = 255;
            }
        }
    }

    ctx.putImageData(image, 0, 0);
};

const hsvToRgb = (h, s, v) => {
    let f = (n, k = (n + h / 60) % 6) =>
        v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
    return [f(5) * 255, f(3) * 255, f(1) * 255].map(Math.round);
};

let isDrawing = false;

color_wheel.addEventListener('mousedown', (e) => {
    isDrawing = true;
    handleColorPick(e);
});

color_wheel.addEventListener('mousemove', (e) => {
    if (isDrawing) {
        handleColorPick(e);
    }
});

color_wheel.addEventListener('mouseup', () => {
    isDrawing = false;
});
color_wheel.addEventListener('mouseleave', () => {
    isDrawing = false;
});

function handleColorPick(e) {
    const rect = color_wheel.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    const alpha = 1;

    current_color_view.style.backgroundColor = `rgba(${pixel[0]}, ${pixel[1]}, ${pixel[2]}, ${alpha})`;

    setMaterialColor(activeMaterial, [
        pixel[0] / 255,
        pixel[1] / 255,
        pixel[2] / 255,
        alpha
    ]);
}

drawColorWheel();