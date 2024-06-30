import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('globalStore', () => {
  const isLoginModalOpen = ref<boolean>(false)
  const buttonOpenModal = ref<HTMLElement | null>(null)
  const showScreenSpinner = ref<boolean>(false)
  const screenWidth = ref<number>(0)
  const isMobileScreenWidth = computed<boolean>(() => screenWidth.value < 992)

  function toggleLoginModal(isOpen: boolean) {
    isLoginModalOpen.value = isOpen
  }

  function setBtnOpenModal(e: Event) {
    if (e.target instanceof Element) {
      const target: Element = e.target
      buttonOpenModal.value = target.closest('button')
    }
  }
  function clearBtnOpenModal() {
    buttonOpenModal.value = null
  }

  function toggleScreenSpinner(isVisible: boolean) {
    showScreenSpinner.value = isVisible
  }

  function setScreenWidth(width: number) {
    screenWidth.value = width
  }

  return {
    toggleLoginModal,
    isLoginModalOpen,
    setBtnOpenModal,
    clearBtnOpenModal,
    buttonOpenModal,
    toggleScreenSpinner,
    showScreenSpinner,
    setScreenWidth,
    screenWidth,
    isMobileScreenWidth
  }
})
