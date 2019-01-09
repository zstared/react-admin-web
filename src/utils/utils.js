import crypto from 'crypto'

/**
 * 加密信息
 *
 * @param str
 * @param secret
 * @return
 */
export function encryptData(str, secret) {
    try {
        if (!str) return ''
        var cipher = crypto.createCipher('aes192', secret);
        var enc = cipher.update(str, 'utf8', 'hex');
        enc += cipher.final('hex');
        return enc;
    } catch (e) {
        return '';
    }
};

/**
 * 解密信息
 *
 * @param str
 * @param secret
 * @return
 */
export function decryptData(str, secret) {
    try {
        if (!str) return ''
        var decipher = crypto.createDecipher('aes192', secret);
        var dec = decipher.update(str, 'hex', 'utf8');
        dec += decipher.final('utf8');
        return dec;
    } catch (e) {
        return ''
    }
};

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function urlToList(url) {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}