import { nextTick } from 'vue';

export const scrollToBottom = () => {
  nextTick(() => {
    const scrollHeight = document.documentElement.scrollHeight; // 总高度
    window.scrollTo({
      top: scrollHeight,
      behavior: 'smooth'
    })
  })
}
export const scrollToTop = () => {
  nextTick(() => {
    window.scrollY > 0 && window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

export const phoneNumberReg = /^1(3|4|5|6|7|8|9)\d{9}$/