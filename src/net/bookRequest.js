import {request} from "./request";

export function addBook(data){
  return request({
    url:'/book',
    method:'post',
    data,
  })
}
export function uploadImg(data){
  return request({
    url:'/upload',
    method:'post',
    data,
    headers:{'Content-Type':'multipart/form-data'}
  })
}
export function deleteFile(data){
  return request({
    url:'/deleteFile',
    method:'post',
    data,
    header:{'Content-Type':'multipart/form-data'},
  })
}

export function deleteBook(data){
  return request({
    url:'/book/'+data,
    method:'delete'
  })
}

export function updateBook(data){
  return request({
    url:'/book',
    method:'put',
    data
  })
}

export function selectAll(data){
  return request({
    url:'/book',
    method:'patch',
    data
  })
}
//get请求传参要用params.其他的传参都用data
export function selectById(params){
  return request({
    url:'/book',
    method:'get',
    params
  })
}
