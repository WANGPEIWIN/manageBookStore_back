import {request} from "./request";
export function addCollect(data){
  return request({
    url:'/collect',
    method:'post',
    data
  })
}

export function deleteCollect(data){
  return request({
    url:'/collect/'+data,
    method:'delete'
  })
}

export function updateCollect(data){
  return request({
    url:'/collect',
    method:'put',
    data
  })
}

export function selectCollect(data){
  return request({
    url:'/collect',
    method:'patch',
    data
  })
}
