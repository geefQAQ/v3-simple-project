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