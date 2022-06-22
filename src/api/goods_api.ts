import request from "@/api/request";
/*
*
* @api_getCategory 获取商品分类
* */
export const api_getCategory=()=>{
    return request.get('productCategory/list/withChildren')
}
/*
* @api_getBrandList 获取商品品牌
* */
export const api_getBrandList = ()=>{
    return request.get('brand/list?pageNum=1&pageSize=100')
}
