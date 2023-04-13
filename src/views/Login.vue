<template>
  <div class="form-wrapper">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
          v-model="username"
          name="用户名"
          placeholder="请输入您的手机号码"
          :rules="[{ required: true, message: '请输入您的手机号码' }]"
        />
        <van-field
          v-model="sms"
          center
          clearable
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请输入短信验证码' }]"
        >
          <template #button>
            <van-button size="small" round type="success" @click="handleSendSMS">发送验证码</van-button>
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
const onSubmit = () => {

}

const handleSendSMS = () => {

}

const username = ''
const password = ''
const sms = ''
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  // align-items: center;
  padding-top: 30vh;
}
</style>