import { computed } from 'vue'
import { useUserStore } from '../store/user.ts'
import type { IAuth, ILoginInfo } from '../types'
import { auth } from '../api/user.ts'

export function useAuth() {
  const store = useUserStore()
  const user = computed(() => store.getUserInfo)
  const login = async (info: ILoginInfo) => {
    const { code, data} = await auth(info)
    if (code === 200) {
      if (data !== undefined) {
        const { token, userInfo } = data as IAuth
        store.setInfo({ token, userInfo })
      }
    }
  }
  const logout = () => {
    store.removeInfo()
  }
  return {
    user,
    login,
    logout,
  }
}
