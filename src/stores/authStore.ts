import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AxiosResponse } from 'axios'
import { useAxios } from '@/useAxios'
import { REGISTRATION_PATH, LOGIN_PATH, LOGOUT_PATH, USER_DATA_PATH } from '@/variables'
import type { UserRegistration, UserLogin, UserData } from '@/types/user'

export const useAuthStore = defineStore('authStore', () => {
  const isRegistrationSuccess = ref<boolean>(false)
  const isRegistrationLoading = ref<boolean>(false)

  const isLogin = ref<boolean>(false)
  const isLoginLoading = ref<boolean>(false)
  const isLogoutLoading = ref<boolean>(false)

  const userData = ref<UserData | null>(null)

  function isFavoriteMovie(movieId: string | number): boolean {
    if (userData.value) {
      return userData.value.favorites.some((id) => id === movieId.toString())
    }
    return false
  }

  function addOrDelFavorite(movieId: string) {
    if (!userData.value) {
      return
    }
    if (isFavoriteMovie(movieId)) {
      userData.value.favorites = userData.value.favorites.filter((id) => id !== movieId)
    } else {
      userData.value.favorites.push(movieId)
    }
  }

  async function fetchRegistration(userData: UserRegistration) {
    try {
      isRegistrationLoading.value = true
      isRegistrationSuccess.value = false
      const { data }: AxiosResponse<{ success: boolean }> = await useAxios.post(
        REGISTRATION_PATH,
        userData
      )
      isRegistrationSuccess.value = data.success
    } catch (err) {
      console.error(err)
    } finally {
      isRegistrationLoading.value = false
    }
  }

  async function fetchLogin({ email, password }: UserLogin) {
    try {
      isLoginLoading.value = true
      const { data }: AxiosResponse<{ result: boolean }> = await useAxios.post(LOGIN_PATH, {
        email,
        password
      })
      isLogin.value = data.result
      if (isLogin.value) {
        await fetchGetUserData()
      }
    } catch (err) {
      console.error(err)
    } finally {
      isLoginLoading.value = false
    }
  }

  async function fetchLogout() {
    try {
      isLogoutLoading.value = true
      const { data } = await useAxios.get(LOGOUT_PATH)
      isLogin.value = !data.result
      userData.value = null
    } catch (err) {
      console.error(err)
    } finally {
      isLogoutLoading.value = false
    }
  }

  async function fetchGetUserData() {
    try {
      const { data }: AxiosResponse<UserData> = await useAxios.get(USER_DATA_PATH)
      userData.value = data
      console.log(data)
    } catch (err) {
      console.error(err)
    }
  }

  return {
    fetchRegistration,
    isRegistrationLoading,
    isRegistrationSuccess,
    fetchLogin,
    isLoginLoading,
    fetchLogout,
    isLogoutLoading,
    isLogin,
    fetchGetUserData,
    userData,
    isFavoriteMovie,
    addOrDelFavorite
  }
})
