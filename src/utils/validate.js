/**手机号正则表达式 */
export const  regPhone=/^1[34578]\d{9}$/

/**账号 */
export const  regAccount=/^[a-zA-Z0-9@._]{1,50}$/

/**中英文名 */
export const  regName=/^[\u4e00-\u9fa5a-zA-Z. ]{1,50}$/

/**英文名 */
export const  regNameEn=/^[a-zA-Z. ]{1,50}$/

/**密码 */
export const  regPassword=/^[^\s]{4,50}$/