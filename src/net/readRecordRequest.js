import {request} from "./request";

export function addReadRecord(data){
  return request({
    url:'/readRecord',
    method:'post',
    data
  })
}

export function deleteReadRecord(data){
  return request({
    url:'/readRecord/'+data,
    method:'delete'
  })
}

export function updateReadRecord(data){
  return request({
    url:'/readRecord',
    method:'put',
    data
  })
}

export function selectReadRecord(data){
  return request({
    url:'/readRecord',
    method:'patch',
    data
  })
}
