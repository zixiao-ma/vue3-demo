/*
* @file 用来封装用户相关的api
* */
import request from "@/api/request";
/*
* @loginModel 登陆model对象类型
* */
type loginModel = {
    username: string;
    password: string;
}
/*
* @api_login 用户登录接口
* */
export const api_login = (model:loginModel) => {
  return request.post('admin/login',model)
}
/*
* @api_getMenus 获取菜单参数接口
* */
export const api_getMenus = () => {
  return request.get('admin/info')
}
/*
* @api_loginOut 退出登录接口
* */
export const api_loginOut =()=>{
    return request.post('admin/logout')
}




