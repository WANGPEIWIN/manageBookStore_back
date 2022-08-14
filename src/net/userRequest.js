import {request} from "./request";

export function addUser(data){
  return request({
    url:'/user',
    method:'post',
    data
  })
}

export function deleteUser(data){
  return request({
    url:'/user/'+data,
    method:'delete'
  })
}

export function updateUser(data){
  return request({
    url:'/user',
    method:'put',
    data
  })
}

export function selectAll(data){
  return request({
    url:'/user',
    method:'patch',
    data
  })
}

export function selectById(data){
  return request({
    url:'/user/'+data,
    method:'get'
  })
}

export function getLogin(data){
  return request({
    url:"/login",
    method:"post",
    data
  })
}
