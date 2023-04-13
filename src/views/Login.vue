<template>
  <div class="form-wrapper">
    <van-form ref="loginForm"
      style="width: 100%;"
      @failed="onFailed"
      validate-trigger="onSubmit"
      :show-error-message="false"
      @submit="onSubmit"
      validate-first
    >
      <van-cell-group inset>
        <van-field
          v-model="phoneNumber"
          name="phoneNumber"
          placeholder="请输入您的手机号码"
          autocomplete="off"
          :rules="rulesPhoneNumber"
        />
        <van-field
          v-model="sms"
          center
          name="code"
          clearable
          autocomplete="off"
          placeholder="请输入短信验证码"
          :rules="[{ required: true, message: '请输入短信验证码' }]"
        >
          <template #button>
            <van-button
              size="small"
              round
              type="success"
              :disabled="smsButtonDisabled"
              @click="handleSendSMS">
              {{ !smsButtonDisabled ? `发送验证码` : `重新发送(${countDown})`}}
            </van-button>
          </template>
        </van-field>
        <van-field
          style="display: none;"
          v-model="hasGotCode"
          name="hasGotCode"
          :rules="[{validator: validatorHasGotCode, message: '请先获取短信验证码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button
          :loading="isLoggingIn" round block
          :loading-text="isLoggingIn ? `登录中...` : ``"
          :disabled="isLoggingIn"
          type="primary"
          native-type="submit"
          @click="handleSubmit"
        >
          提交
        </van-button>
        <!-- <van-button :disabled="disabled" round block type="primary" native-type="submit" @click="handleSubmit">
          提交
        </van-button> -->
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Toast } from 'vant';

// 短信已下发
// 验证码错误

const phoneNumber = ref('')
// const password = ''
const sms = ref('')

const loginForm = ref();

const disabled = ref(true);

const phoneRegex = /^\d{11}$/

const smsButtonDisabled = ref(false);

const onSubmit = () => {

}
const countDown = ref(2);
const hasGotCode = ref('N');
const handleSendSMS = () => {
  Toast('短信已下发');
  countDown.value = 2;
  hasGotCode.value = 'Y';
  smsButtonDisabled.value = true;
  let timer = setInterval(() => {
    countDown.value --
    if(countDown.value === 0) {
      clearInterval(timer);
      smsButtonDisabled.value = false;
    }
  }, 1000)
}
const isLoggingIn = ref(false);
const handleSubmit = () => {
  // console.log('handleSubmit')
  if(sms.value !== '1234') {
    Toast('验证码错误')
  }
  loginForm.value.validate().then((valid) => {
    console.log('valid', valid)
    console.log('ok')

    isLoggingIn.value = true;
    setTimeout(() => {
      isLoggingIn.value = false;
    }, 1000)
  }).catch(err => {
    console.log(`output->err`,err)
  })
}

const validatorHasGotCode = (val) => {
  return hasGotCode.value === 'Y';
}

const validatorPhoneNumber = (val) => {
  const phoneRegex = /^\d{11}$/
  return phoneRegex.test(val);
}

const rulesPhoneNumber = [
  { required: true,  message: '请输入您的手机号码' },
  { validator: validatorPhoneNumber, message: '手机号码格式不正确，请重新输入' }
]

const onFailed = (errorInfo) => {
  console.log(`output->errorInfo`,errorInfo)
  const { errors } = errorInfo;
  Toast(errors[0].message);
}


</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 0 12px;
  justify-content: center;
  // align-items: center;
  padding-top: 20vh;
}
</style>