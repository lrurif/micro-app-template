import CryptoJs from "crypto-js";
export const KEY = "TheKeyOfmyDatadx";
export const IV = 24;
function encryp(data, keyStr = KEY) {
    if (typeof data === "object") {
        try {
            data = JSON.stringify(data);
        } catch (e) {
            console.log(e, "error");
            return;
        }
    }
    const key = CryptoJs.enc.Utf8.parse(keyStr); // 将字符串的转为WordArray类型
    const mydata = CryptoJs.enc.Utf8.parse(data);
    const udata = CryptoJs.AES.encrypt(mydata, key, {
        mode: CryptoJs.mode.ECB, // 加密模式，ECB模式
        padding: CryptoJs.pad.Pkcs7, // 填充方式
    });
    const encrypted = udata.toString(); //  返回的是base64的密文,是字符串类型
    return encrypted;
}
// 解密, 调用该方法时，传入的data是base64的密文
function decrypt(data, keyStr = KEY) {
    const key = CryptoJs.enc.Utf8.parse(keyStr);
    const udata = CryptoJs.AES.decrypt(data, key, {
        mode: CryptoJs.mode.ECB,
        padding: CryptoJs.pad.Pkcs7,
    });
    const decrypted = udata.toString(CryptoJs.enc.Utf8); // 返回的是加密之前的原始数据,是字符串类型
    return decrypted;
}
export function encrypData(data) {
    return encryp(data);
}
export function decryptData(data) {
    const str = decrypt(data);
    return JSON.parse(str);
}