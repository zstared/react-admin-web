import request from '../utils/request'

/**删除文件 */
export async function remove(params) {
    return await request.delete('/core/file/delete', params);
}

/**下载文件 */
export async function download(code,name='') {
    if(typeof(code)=="string"){
        return await request.download(`/core/file/download`,code,name);
    }else{
        return await request.download('/core/file/downloadPackage', code,name,true);
    }
}
  