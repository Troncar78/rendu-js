export const deg2rad = (deg) => {
    return deg * Math.PI / 180;
}

export const distance2d = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy); // Théroème de Pythagore
}

export const randomRange = (min, max) => {
    const min_ = min > max ? max : min;
    const max_ = max > min ? min : max;
    return min + Math.random() * (max - min);
}