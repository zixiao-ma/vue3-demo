<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
     <home-menus></home-menus>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0 20px 0 20px">
        <div class="header-left">
          <div class="collapsible">
            <menu-unfold-outlined
                v-if="collapsed"
                class="trigger"
                @click="() => (collapsed = !collapsed)"
                style="font-size: 20px"
            />
            <menu-fold-outlined v-else class="trigger"     style="font-size: 20px" @click="() => (collapsed = !collapsed)" />
          </div>
          <div class="bread">
            <a-breadcrumb>
              <a-breadcrumb-item @click="$router.push({name:'welcome'})">首页</a-breadcrumb-item>
              <a-breadcrumb-item v-if="parentName!==''"><a href="" >{{ parentName }}</a></a-breadcrumb-item>
              <a-breadcrumb-item v-if="childName!==''"><a href="">{{ childName }}</a></a-breadcrumb-item>

            </a-breadcrumb>
          </div>
        </div>
        <div class="header-right">

          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              <a-avatar :src="$store.state.menus.icon" />
              <DownOutlined style="color: black"/>
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;" @click="$router.push({name:'welcome'})">首页</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;" @click="exitLogin">退出</a>
                </a-menu-item>

              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content
          :style="{ margin: '0', padding: '20px', background: '#fff'}"
      >
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import menuInfo from "@/layout/componts/menuInfo";
import {defineComponent, onUpdated, ref} from 'vue';
import HomeMenus from "@/layout/componts/HomeMenus.vue";
import {useRoute} from "vue-router";
import {message, Modal} from "ant-design-vue";
import {useStore} from "vuex";
import router from "@/router";
import {api_loginOut} from "@/api/user_api";

export default defineComponent({
  components: {
    HomeMenus
  },
  setup() {
    const collapsed = ref<boolean>(false)
    const parentName=ref<string>('');
    const childName=ref<string>('');
    const route = useRoute()
const store = useStore()
   onUpdated(()=>{
     const path:string = route.path.replace('/','')
     console.log(path)
     UpdateMenus(path)
   })
    /*
    * @UpdateMenus 路由发生变化时更新面包屑导航
    * */
    const UpdateMenus = (path:string)=>{
      if(path==='welcome'||path==='not-found'){
        parentName.value ='';
        childName.value ='';
        return
      }

      menuInfo.forEach((item:any,i:number)=>{
        let index:number = item.router.findIndex((ite:any)=>{
          return ite===path
        })
       if(index!==-1){
        parentName.value = item.parentName;
         childName.value = item.childNavName[index];
       }
      })
    }
    /*
    * @function exitLogin 用户退出登录
    * */
    const exitLogin = () => {
      Modal.confirm({
        okText: '确认',
        cancelText: '取消',
        title: '提示!',
        icon: "",
        content: '您确定要退出登录吗?',

        async onOk() {
          await api_loginOut()
         await store.commit('loginOut')
          await router.push({name:'login'})
          message.success('退出成功!')
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onCancel() {
          message.warn('取消')
        },
      });
    };

    return {
      collapsed,
      parentName,
      childName,
      exitLogin
    };
  },
});
</script>
<style lang="scss">
.ant-layout-header{
  border-bottom: 1px solid #d9d9d9;
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  .header-left{
    display: flex !important;
    align-items: center;
  }
  .ant-breadcrumb{
    position: relative;
    top: -3px;
    margin-left: 10px;
    a{
      font-size: 16px !important;
    }
    .ant-breadcrumb-link{
      font-size: 16px !important;
    }
  }
}
.ant-layout{
  height: 100%;
  overflow-x: hidden;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
