<template>
  <van-nav-bar :title="title" @click-right="handleClickRight" safe-area-inset-top>
    <template v-if="token" #right>
        <van-popover
          :show-arrow="false"
          theme="dark"
          placement="bottom-end"
          v-model:show="showPopover"
          :actions="actions"
          @select="handleSelect"
        >
          <template #reference>
            <van-icon name="user-o" color="#323233" size="18" />
          </template>
        </van-popover>
    </template>
  </van-nav-bar>
</template>

<script setup>
import { getLocalStorage, clearLocalStorage } from '../utils/storage';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: "默认标题"
  },
  actions: {
    type: Array,
    default: () => []
  }
})

const router = useRouter();
const showPopover = ref(false);
const token = getLocalStorage('token')

const handleClickRight = () => {
  showPopover.value = true;
}

const handleSelect = (action) => {
  switch(action.value) {
    case 'logout':
      clearLocalStorage('token');
      router.replace({name: 'login'})
      break;
    case 'home':
      router.replace({name: 'home'})
      break;
    default:
      break;
  }
}
</script>