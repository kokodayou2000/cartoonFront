import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/welcome/index.vue'
import WorkBench from '../views/workbench/index.vue'
import CartoonDetail from '../views/cartoon/cartoonDetail/index.vue'
import ChapterDetail from "../views/cartoon/chapterDetail/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/workbench',
      name: 'workbench',
      component: WorkBench,
    },
    {
      path: '/cartoonDetail',
      name: 'cartoonDetail',
      component: CartoonDetail,
    },
    {
      path: '/chapterDetail',
      name: 'chapterDetail',
      component: ChapterDetail,
    },
  ],
})

export default router
