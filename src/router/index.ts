import { createRouter, createWebHashHistory } from 'vue-router'
import { beforeEnterMainPage } from '@/router/beforeEnter/beforeEnterMainPage'
import { beforeEnterMovieDetailPage } from '@/router/beforeEnter/beforeEnterMovieDetailPage'
import { beforeEnterAccount } from '@/router/beforeEnter/beforeEnterAccount'
import { beforeEnterGenresPage } from '@/router/beforeEnter/beforeEnterGenresPage'
import { beforeEnterGenrePage } from '@/router/beforeEnter/beforeEnterGenrePage'

const NotFoundPage = () => import('@/pages/NotFoundPage.vue')
const MainPage = () => import('@/pages/MainPage.vue')
const MovieDetailPage = () => import('@/pages/MovieDetailPage.vue')
const GenresPage = () => import('@/pages/GenresPage.vue')
const GenrePage = () => import('@/pages/GenrePage.vue')
const AccountPage = () => import('@/pages/AccountPage.vue')

import { useAuthStore } from '@/stores/authStore'
import { useGlobalStore } from '@/stores/globalStore'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_API_URL),
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
      meta: { requiresAuth: false },
      beforeEnter: beforeEnterMainPage
    },
    {
      path: '/movie/:id',
      name: 'MovieDetailPage',
      component: MovieDetailPage,
      meta: { requiresAuth: false },
      beforeEnter: beforeEnterMovieDetailPage
    },
    {
      path: '/account',
      name: 'AccountPage',
      component: AccountPage,
      meta: { requiresAuth: true },
      beforeEnter: beforeEnterAccount
    },
    {
      path: '/genres',
      name: 'GenresPage',
      component: GenresPage,
      meta: { requiresAuth: false },
      beforeEnter: beforeEnterGenresPage
    },
    {
      path: '/genres/:genre',
      name: 'GenrePage',
      component: GenrePage,
      meta: { requiresAuth: false },
      beforeEnter: beforeEnterGenrePage,
      props: true
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundPage',
      component: NotFoundPage,
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const globalStore = useGlobalStore()

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isLogin) {
      globalStore.toggleLoginModal(true)
      return { name: 'MainPage' }
    }
  }
})

export default router
