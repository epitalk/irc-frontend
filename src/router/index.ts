import { createRouter, createWebHistory } from 'vue-router'
import HomePage from "@/pages/HomePage.vue"
import DesignSystemPage from "@/pages/DesignSystemPage.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/design-system',
      name: 'designSystem',
      component: DesignSystemPage
    }
  ]
})

export default router
