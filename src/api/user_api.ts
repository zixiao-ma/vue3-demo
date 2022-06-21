/*
* @file 用来封装用户相关的api
* */
import request from "@/api/request";
type loginModel = {
    username: string;
    password: string;
}
export const api_login = (model:loginModel) => {
  return request.post('login',model)
}


