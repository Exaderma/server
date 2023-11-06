import * as crypto from "crypto";
import Zlib from "zlib";

export class CryptData {
  private static readonly algorithm: string = "aes-256-cbc";
  private static readonly secretKey: Buffer = Buffer.from(
    "A9DnSZ2X3Y+Z6Z8Za=S7eE!d02JkLmN%",
    "utf8",
  );
  private static readonly iv: Buffer = Buffer.from("1AZs567)aQsD2!56");

  public static encrypt(data: any): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      this.secretKey,
      this.iv,
    );
    let encrypted = cipher.update(Zlib.deflateSync(data));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex");
  }

  public static decrypt(data: string): string {
    const encrypteddata = Buffer.from(data, "hex");
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      this.secretKey,
      this.iv,
    );
    let decrypted = decipher.update(encrypteddata);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return Zlib.inflateSync(decrypted).toString();
  }
}
