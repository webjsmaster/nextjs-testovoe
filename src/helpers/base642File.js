export const base642File = (base64) => {
    const image = new Image();
    image.src = base64;
    return image;
}
