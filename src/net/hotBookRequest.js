import {request} from "./request";

export function addHotBook(data){
  return request({
    url:'/hot',
    method:'post',
    data
  })
}

export function deleteHotBook(data){
  return request({
    url:'/hot/'+data,
    method:'delete'
  })
}

export function updateHotBook(data){
  return request({
    url:'/hot',
    method:'put',
    data
  })
}

export function selectHot(data){
  return request({
    url:'/hot',
    method:'patch',
    data
  })
}
