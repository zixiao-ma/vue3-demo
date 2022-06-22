<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1" @click="$router.push({name:'welcome'})">
      <home-outlined/>
      <span>首页</span>
    </a-menu-item>

    <a-sub-menu v-for="(item,index) in menus" :key="item.id">

      <template #icon>
        <component :is="menuInfo[index].parentIcon"></component>

      </template>
      <template #title>{{ item.title }}</template>
      <a-menu-item v-for="(ite,ind) in item.children" :key="ite.id" @click="$router.push({path:`/${menuInfo[index].router[ind]}`})">
        <component :is="menuInfo[index].children[ind]"></component>
        <span> {{ ite.title }}</span>

       </a-menu-item>

    </a-sub-menu>
  </a-menu>
</template>

<script lang="ts">
import {defineComponent, onUpdated, ref} from 'vue';
import {useStore} from "vuex";
import menuInfo from './menuInfo.js'
export default defineComponent({
  setup() {
    const store = useStore()
    const menus = store.getters.getMenuArr;
    const selectedKeys = ref<string[]>(['1'])
    console.log(menus,'menus')
 onUpdated(()=>{
 })
    return {
      selectedKeys,
      menus,
      menuInfo
    }
  }

});
</script>
<style lang="scss">

</style>
