import {request} from "./request";

export function addClassic(data){
  return request({
    url:'/classic',
    method:'post',
    data
  })
}

export function deleteClassic(data){
  return request({
    url:'/classic/'+data,
    method:'delete'
  })
}

export function updateClassic(data){
  return request({
    url:'/classic',
    method:'put',
    data
  })
}

export function classicSelectAll(data){
  return request({
    url:'/classic',
    method:'patch',
    data
  })
}

export function selectById(data){
  return request({
    url:'/classic/'+data,
    method:'get'
  })
}
