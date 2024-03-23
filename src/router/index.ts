import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/welcome/index.vue'
import WorkBench from '../views/workbench/index.vue'
import CartoonDetail from '../views/cartoon/cartoonDetail/index.vue'
import ChapterDetail from '../views/cartoon/chapterDetail/index.vue'
import Manage from '../views/manage/index.vue'
import ManageCartoonDetail from "../views/manage/cartoonDetail/index.vue";
import ManageChapterDetail from "../views/manage/chapterDetail/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/manage',
      name: 'manage',
      component: Manage,
    },
    {
      path: '/manageCartoonDetail',
      name: 'manageCartoonDetail',
      component: ManageCartoonDetail,
    },
    {
      path: '/manageChapterDetail',
      name: 'manageChapterDetail',
      component: ManageChapterDetail,
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
