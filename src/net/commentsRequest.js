import {request} from "./request";

export function addComments(data){
  return request({
    url:'/comments',
    method:'post',
    data
  })
}

export function deleteComments(data){
  return request({
    url:'/comments/'+data,
    method:'delete'
  })
}

export function updateComments(data){
  return request({
    url:'/comments',
    method:'put',
    data
  })
}

export function selectComments(data){
  return request({
    url:'/comments',
    method:'patch',
    data
  })
}
