<template>
<div>
  <a-card  style="width:100%">
    <div class="header_top">
      <span class="search_title"><search-outlined />  筛选搜索</span>
      <span>
        <a-button @click="resetModel()">重置</a-button>
        <a-button type="primary" @click="getData()">查询</a-button>
      </span>
    </div>
    <div class="header_bottom">
      <a-row>
        <a-col :span="8">
          <a-input v-model:value="Model.keyword" placeholder="商品名称" allowClear>
            <template #addonBefore>
              <span>输入搜索：</span>
            </template>
          </a-input>
        </a-col>
        <a-col :span="8">
          <a-input v-model:value="Model.productSn" placeholder="商品货号" allowClear>
            <template #addonBefore>
              <span> 商品货号：</span>
            </template>
          </a-input>

        </a-col>
        <a-col :span="8">
          商品分类：
          <a-cascader
              v-model:value="Model.productCategoryId"
              :options="Category"
              :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
              expand-trigger="hover"
              placeholder="请选择"
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="8">
          商品品牌：
          <a-cascader
              v-model:value="Model.brandId"
              :options="brandList.list"
              :fieldNames="{ label: 'name', value: 'id', children: 'children' }"
              expand-trigger="hover"
              placeholder="请选择"
          /></a-col>
        <a-col :span="8">
          上架状态：
          <a-cascader
              v-model:value="Model.publishStatus"
              :options="publishOption"
              expand-trigger="hover"
              placeholder="请选择"
          />
        </a-col>
        <a-col :span="8">
          审核状态：
          <a-cascader
              v-model:value="Model.verifyStatus"
              :options="verifyOption"
              expand-trigger="hover"
              placeholder="请选择"
          />
        </a-col>
      </a-row>
    </div>
  </a-card>
  <a-card style="margin-top: 10px">
    <div class="header_top">
      <span class="search_title"><container-outlined /> 数据列表</span>
      <span>
        <a-button type="primary">添加</a-button>
      </span>
    </div>
  </a-card>
</div>
</template>

<script lang="ts">

import {defineComponent, onMounted, reactive, ref} from 'vue';
import {api_getBrandList, api_getCategory} from "@/api/goods_api";
import type { CascaderProps } from 'ant-design-vue';
// const statusOption = [{'label':'上架','id':1},{'label':'下架','id':0}]
const publishOption: CascaderProps['options'] = [
  {
    value: '1',
    label: '上架'
  },
  {
    value: '0',
    label: '下架'
  },
];
const verifyOption: CascaderProps['options'] = [
  {
    value: '1',
    label: '审核通过'
  },
  {
    value: '0',
    label: '未通过'
  },
];
interface search_model{
  //搜索
  keyword:string,
  //页数
  pageNum:number,
  //条数
  pageSize:number,
  //货号
  productSn?:number,
  //分类
  productCategoryId?:number,
  //品牌
  brandId?:number
  //上架状态
  publishStatus?:number,
  //审核状态
  verifyStatus?:number
}
export default defineComponent({
setup(){
  let Model = reactive<search_model>({
    keyword:'',
    pageNum:1,
    pageSize:5,
  })
  let Category = ref<any>([])
  let brandList = ref<any>([])

  onMounted(()=>{
    getSearchPayload()

  })
  /*
  * @getSearchPayload 获取商品列表搜索的一些参数
  * */
  const getSearchPayload= async ()=>{
    Category.value = await api_getCategory()
    brandList.value =await api_getBrandList()
    console.log(brandList.value,'1')
  }
  /*
  * @getData 点击查询
  * */
  const getData = ()=>{
    console.log(Model)
  }
  /*
  * @resetModel 重置商品搜索信息
  * */
  const resetModel = ()=>{
    Model.keyword='';
  }
  return{
    Model,
    Category,
    brandList,
    getData,
    publishOption,
  verifyOption,
    resetModel
  }
}

});
</script>
<style lang="scss">

.ant-input-group-addon{
  border: 0 !important;
  background: none !important;
}

.header_top{
  display: flex;
  padding: 10px;
  justify-content: space-between;
  button{
    margin-right: 10px;
  }
 .search_title{
   font-size: 18px;
 }

}
.ant-row{
  margin: 10px 0;
}
.ant-col{
}

.header_bottom{
  display: flex;
  flex-direction: column;
  .ant-input-affix-wrapper{
    width: 60%;
  }
}
</style>
