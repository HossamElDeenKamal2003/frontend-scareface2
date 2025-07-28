import { createRouter, createWebHistory } from 'vue-router'
import HomeComponent from '../views/homePage.vue'
import chartPage from '../views/chartPage.vue'
import splashPage1 from '../views/firstSplashPage.vue'
import splashPage2 from '../views/secondSplash.vue'
import coursesPage from '../views/coursesPage.vue'
const routes = [
  {
    path: "/courses",
    name: "CoursesPage",
    component: coursesPage,
  },
  {
    path: '/',
    redirect: '/splash',
  },
  {
    path: '/splash',
    name: 'SplashPage',
    component: splashPage1,
  },
  {
    path: '/splash2',
    name: 'SplashPage2',
    component: splashPage2,
  },
  {
    path: '/main',
    name: 'HomeComponent',
    component: HomeComponent,
  },
  {
    path: '/chart',
    name: 'chartPage',
    component: chartPage,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
 