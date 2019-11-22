import request from '../utils/request'


/**获取人脸列表 */
export async function getFaceList(params) {
    return await request.get('/face_recognition/face/pageList', params)
}

/**新增人脸 */
export async function create(params) {
    return await request.post('/face_recognition/face/create', params)
}

/**编辑人脸 */
export async function update(params) {
    return await request.post('/face_recognition/face/update', params)
}

/**删除人脸 */
export async function deleteFace(params) {
    return await request.post('/face_recognition/face/delete', params)
}
