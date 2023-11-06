import sharp from "sharp";

export async function convertToJPEG(base64Image: string): Promise<string> {
  try {
    // Décodez l'image base64 en tampon (Buffer)
    const imageBuffer = Buffer.from(base64Image, "base64");

    // Utilisez Sharp pour redimensionner et convertir en JPEG
    const outputBuffer = await sharp(imageBuffer)
      .jpeg() // Convertir en JPEG
      .toBuffer();

    // Encodez le tampon résultant en base64
    const base64JPEG = outputBuffer.toString("base64");

    return base64JPEG;
  } catch (error) {
    return ""; // Gérer l'erreur selon vos besoins
  }
}
