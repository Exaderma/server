import { convertToJPEG } from "./utils/convert";
import { CryptData } from "./utils/encryption";

const data : string = "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";

const convertedData : Promise<string> = convertToJPEG(data);

convertedData.then((result) => {
    console.log("data", data.length);
    const encryptedData : string = CryptData.encrypt(result);
    const decryptedData : string = CryptData.decrypt(encryptedData);
    console.log("convert", result.length);
    console.log("encrypt", encryptedData.length);
    console.log("print", encryptedData);
    console.log("print", decryptedData);
    console.log("decrypt", decryptedData.length);
    // calculate the compression ratio
    const compressionRatio : number = (data.length - decryptedData.length) / data.length *100;
    console.log("compression ratio", compressionRatio, "%");
});
