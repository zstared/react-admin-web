import request from '../utils/request'


/**检测 */
export async function detect(params) {
    return await request.post('/face_recognition/recognize/detect', params)
}

/**识别 */
export async function matching(params) {
    return await request.post('/face_recognition/recognize/matching', params)
}

/**获取人脸库数据 */
export async function getPageList(params) {
    return await request.get('/face_recognition/recognize/pageList', params)
}

/**获取人脸拼图 */
export async function getFaceSprite(params) {
    return await request.get('/face_recognition/recognize/sprite', params)
}