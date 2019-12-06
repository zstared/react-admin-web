import request from '../utils/request'


/**识别 */
export async function matching(params) {
    return await request.post('/face_recognition/recognize/matching', params)
}

/**获取人脸库数据 */
export async function getPageList(params){
	return await request.get('/face_recognition/recognize/pageList', params)
}


