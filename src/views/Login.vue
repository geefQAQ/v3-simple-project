<template>
  <div class="form-wrapper">
    <van-form ref="loginForm"
      style="width: 100%;"
      @failed="onFailed"
      validate-trigger="onSubmit"
      :show-error-message="false"
      validate-first
    >
      <van-cell-group inset>
        <van-field
          v-model="mobile"
          name="mobile"
          type="number"
          placeholder="请输入您的手机号码"
          autocomplete="off"
          :rules="rulesPhoneNumber"
          clearable
          maxlength="11"
        />
        <van-field
          v-model="sms"
          center
          name="code"
          type="number"
          clearable
          autocomplete="off"
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]"
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
        v-model="gotCode"
        name="gotCode"
        :rules="[{validator: () => gotCode === 'Y', message: '请先获取短信验证码' }]"
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
      </div>
    </van-form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Toast } from 'vant';
// import { useWindowSize } from '@vant/use';
import { phoneNumberReg } from '@/utils';
import {
  postSendCode,
  postLogin
} from '@/api'
import { useRouter } from 'vue-router';
import { setLocalStorage, getLocalStorage, clearLocalStorage } from '@/utils/storage';

const router = useRouter();

// const { width, height } = useWindowSize();

// console.log(width.value); // -> 窗口宽度
// console.log(height.value); // -> 窗口高度

// watch([width, height], () => {
//   // console.log('window resized');
//   Toast('window resized')
// });

// 短信已下发
// 验证码错误
const loginForm = ref();
const state = reactive({
  mobile: getLocalStorage('mobile') ?? '',
  sms: '',
  loginForm,
  smsButtonDisabled: false
})

const mobile = ref(getLocalStorage('mobile') ?? '')
console.log(`output->mobile`,mobile.value)
const sms = ref('')

const smsButtonDisabled = ref(false);

const onSubmit = () => {

}

// 考虑use封装
// const useCountdown = () => {}
// const { countDown, gotCode, smsButtonDisabled } = useCountdown({
// 
// })

const countDown = ref(2);
const gotCode = ref('N');
const handleSendSMS = async () => {
  try {
    await loginForm.value.validate('mobile')
  } catch (error) {
    console.log(`output->errorInfo`,error)
    const { message } = error;
    Toast(message);
    return;
  }
  Toast('短信已下发');
  await postSendCode({mobile: mobile.value }, { loading: false, delay: false, withToken: false });
  countDown.value = 2;
  gotCode.value = 'Y';
  smsButtonDisabled.value = true;
  let timer = setInterval(() => {
    countDown.value --
    if(countDown.value === 0) {
      clearInterval(timer);
      smsButtonDisabled.value = false;
    }
  }, 1000)
}

// 考虑use封装
const isLoggingIn = ref(false);
const handleSubmit = () => {
  loginForm.value.validate().then(() => {
    postLogin({
      mobile: mobile.value,
      code: sms.value
    }, { withToken: false }).then(res => {
      const { token } = res?.data;
      clearLocalStorage('token');
      setLocalStorage('token', token);
      setLocalStorage('mobile', mobile.value);
      isLoggingIn.value = true;
      setTimeout(() => {
        isLoggingIn.value = false;
      }, 1000)
      // return
      router.push({ name: 'home' })
    })
  })
}

const validatorHasGotCode = (val) => {
  return gotCode.value === 'Y';
}

const validatorPhoneNumber = (val) => {
  return phoneNumberReg.test(val);
}

const rulesPhoneNumber = [
  { required: true,  message: '请输入您的手机号码' },
  { pattern: phoneNumberReg, message: '手机号码格式不正确，请重新输入' }
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
  transition: padding-top 0.2s ease;
}
</style>