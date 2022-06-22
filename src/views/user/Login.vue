<template>
  <main>

    <div id="login-box">
      <h2 style="text-align: center">电商后台管理系统</h2>
      <a-form
          :model="formState"
          name="basic"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 19 }"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
      >
        <a-form-item
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '用户名不能为空!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
            label="密码"
            name="password"
            :rules="[{ required: true, message: '密码不能为空!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 5, span: 19 }">
          <a-checkbox v-model:checked="formState.remember">记住我</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 5, span: 19 }">
          <a-button type="primary" html-type="submit" block :loading="loading">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </main>

</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import {api_login} from "@/api/user_api";
import {message} from "ant-design-vue";
import { useStore } from 'vuex';
import {useRouter} from "vue-router";
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter()
    const loading = ref(false)
    const formState = reactive<FormState>({
      username: 'admin',
      password: 'macro123',
      remember: true,
    });
    const onFinish =async (values: any) => {
     try {
       loading.value = true
        const res =  await api_login(values)
        console.log(res)

       store.commit('setUserInfo',res)
       await store.dispatch('getMenusList')
       await router.push({name: 'HomeLayout'})
       message.success('登录成功!')
       } catch (error) {

       }
      loading.value = false
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
    return {
      formState,
      onFinish,
      onFinishFailed,
      loading
    };
  },
});
</script>
<style lang="scss">
main{
  width: 100%;
  height: 100%;
  position: relative;
}

#login-box{
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translate(-50%);
width: 30%;
 border: 1px solid #ddd;
  padding: 20px;
border-radius: 3px;
  box-shadow: 0px 0px 10px 3px #ddd;
}
</style>
