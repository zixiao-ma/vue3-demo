<template>
  <div>
    <a-result status="404" title="404" sub-title="很抱歉，您访问的页面不存在。">
      <template #extra>
        <a-button type="primary" @click="$router.push({name:'welcome'})">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>

<script>
export default {
  name: "not-found"
}
</script>

<style scoped>

</style>
