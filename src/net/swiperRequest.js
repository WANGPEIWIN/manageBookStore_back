import {request} from "./request";

export function addSwiper(data){
  return request({
    url:'/swiper',
    method:'post',
    data
  })
}

export function deleteSwiper(data){
  return request({
    url:'/swiper/'+data,
    method:'delete'
  })
}

export function updateSwiper(data){
  return request({
    url:'/swiper',
    method:'put',
    data
  })
}

export function selectAll(data){
  return request({
    url:'/swiper',
    method:'patch',
    data
  })
}

export function selectById(data){
  return request({
    url:'/swiper/'+data,
    method:'get'
  })
}
