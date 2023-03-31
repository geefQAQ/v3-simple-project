<template>
  <van-nav-bar
    :title="title"
    left-arrow
    @click-left="onClickLeft"
  />
  <van-collapse v-model="activeNames">
    <van-collapse-item name="1">
      <template #title>
        <div class="title-wrapper">
          <div class="icon-wrapper">
            <van-icon name="friends" color="#fff" size="20"/>
          </div>
          <span>缺勤20人</span>
        </div>
      </template>
      <template #default>
        <van-row justify="space-between">
          <van-col @click="show = true" span="12">span: 6</van-col>
          <van-col span="12">span: 6</van-col>
        </van-row>
        <van-row justify="space-between">
          <van-col span="12">span: 6</van-col>
          <van-col span="12">span: 6</van-col>
        </van-row>
        <van-row justify="space-between">
          <van-col span="12">span: 6</van-col>
          <van-col span="12">span: 6</van-col>
        </van-row>
      </template>
    </van-collapse-item>
    <van-collapse-item title="标题2" name="2">
      技术无非就是那些开发它的人的共同灵魂。
    </van-collapse-item>
    <van-collapse-item title="标题3" name="3">
      在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
    </van-collapse-item>
  </van-collapse>

  <van-popup
    v-model:show="show"
    :style="{ height: '50%', width: '80%' }"
    round
  >
    hihi
  </van-popup>

</template>

<script setup>
  import { useRouter, useRoute } from 'vue-router';
  import { ref } from 'vue';
  const router = useRouter();
  const route = useRoute();
  const { title } = route.query ?? '';
  const activeNames = ref(['1']);
  const show = ref(false);
  // console.log(`output->route`,route.query)
  const onClickLeft = () => {
    router.back();
  }
</script>

<style lang="scss" scoped>
.title-wrapper {
  display: flex;
}

.icon-wrapper {
  height: 24px;
  width: 24px;
  line-height: 24px;
  background-color: #1989fa;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>