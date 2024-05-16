import {request} from "./request";

export function addClassicItem(data){
  return request({
    url:'/classicItem',
    method:'post',
    data
  })
}

export function deleteClassicItem(data){
  return request({
    url:'/classicItem/'+data,
    method:'delete'
  })
}

export function updateClassicItem(data){
  return request({
    url:'/classicItem',
    method:'put',
    data
  })
}

export function classicItemSelectAll(data){
  return request({
    url:'/classicItem',
    method:'patch',
    data
  })
}

export function selectById(data){
  return request({
    url:'/classicItem/'+data,
    method:'get'
  })
}
