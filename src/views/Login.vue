<template>
  <!-- @failed="onFailed" -->
  <div class="form-wrapper">
    <van-form ref="loginForm"
      style="width: 100%;"
      :show-error-message="false"
      validate-trigger="onSubmit"
      validate-first
    >
      <van-cell-group inset>
        <van-field
          v-model="state.mobile"
          name="mobile"
          type="number"
          placeholder="请输入您的手机号码"
          autocomplete="off"
          :rules="rulesPhoneNumber"
          clearable
          maxlength="11"
        />
        <van-field
          v-model="state.sms"
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
              :disabled="state.smsButtonDisabled"
              @click="handleSendSMS">
              {{ state.smsButtonDisabled ? `重新发送(${state.countDown})` : `发送验证码` }}
            </van-button>
          </template>
        </van-field>
        <van-field
          style="display: none;"
          v-model="state.gotCode"
          name="state."
          :rules="[{validator: () => state.gotCode === 'Y', message: '请先获取短信验证码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button
          :loading="state.isLoggingIn" round block
          :loading-text="state.isLoggingIn ? `登录中...` : ``"
          :disabled="state.isLoggingIn"
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
import { phoneNumberReg } from '@/utils';
import {
  postSendCode,
  postLogin
} from '@/api'
import { useRouter } from 'vue-router';
import { setLocalStorage, getLocalStorage, clearLocalStorage } from '@/utils/storage';

const router = useRouter();
const loginForm = ref();

const state = reactive({
  mobile: getLocalStorage('mobile') ?? '',
  countDown: 3,
  gotCode: 'N',
  sms: '',
  smsButtonDisabled: false,
  isLoggingIn: false
});

const rulesPhoneNumber = [
  { required: true,  message: '请输入您的手机号码' },
  { pattern: phoneNumberReg, message: '手机号码格式不正确，请重新输入' }
]

// 获取验证码
const handleSendSMS = async () => {
  try {
    await loginForm.value.validate('mobile')
  } catch (error) {
    Toast(error?.message);
    return;
  }
  Toast('短信已下发');
  await postSendCode({ mobile: state.mobile }, { loading: false, delay: false, needToken: false });
  state.countDown = 2;
  state.gotCode = 'Y';
  state.smsButtonDisabled = true;
  let timer = setInterval(() => {
    state.countDown --
    if(state.countDown === 0) {
      clearInterval(timer);
      state.smsButtonDisabled = false;
    }
  }, 1000)
}

// 提交登录
const handleSubmit = () => {
  loginForm.value.validate().then(() => {
    postLogin({
      mobile: state.mobile,
      code: state.sms
    }, { needToken: false }).then(res => {
      const { token } = res?.data;
      clearLocalStorage('token');
      setLocalStorage('token', token);
      setLocalStorage('mobile', state.mobile);
      state.isLoggingIn = true;
      setTimeout(() => {
        state.isLoggingIn = false;
      }, 1000)
      console.log(`output->localStorage`,localStorage.getItem('token'))
      router.push({ name: 'home' })
    })
  }).catch(errors => {
    Toast(errors[0].message);
  })
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;
  padding: 0 12px;
  justify-content: center;
  padding-top: 20vh;
  transition: padding-top 0.2s ease;
}
</style>