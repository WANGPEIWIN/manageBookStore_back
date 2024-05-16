import axios from "axios";

const instance=axios.create({
  baseURL:'http://localhost:8080',
  // baseURL:'https://wppjh.top/manageBook',
  timeout:5000
})

instance.interceptors.request.use(function (req){
  let token=sessionStorage.getItem("token");
  if(token){
    req.headers['Authorization']=token;
  }
  return req;
})
instance.interceptors.response.use(function (rep){
  return rep.data;
})

export function request(config){
  return instance(config);
}
