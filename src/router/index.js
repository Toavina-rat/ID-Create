import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkView from '../views/WorkView.vue'
import ActivitiesView from '../views/ActivitiesView.vue'
import ContactView from '../views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/work',
      name: 'work',
      component: WorkView
    },
    {
      path: '/activities',
      name: 'activities',
      component: ActivitiesView
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView
    }
  ]
})

export default router