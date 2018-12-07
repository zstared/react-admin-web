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