import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashBoard from '@/pages/DashBoard.vue'
import AppUsers from '@/pages/users/AppUsers.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import WrapperPage from '@/pages/WrapperPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import UserCreate from '@/pages/users/UserCreate.vue'


const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: RegisterPage}, 
  { path: '/login', component: LoginPage}, 
  { path: '', 
    component: WrapperPage, 
    children: [
      { path: '/', component: DashBoard, meta: { requiresAuth: false }  },  // Root path corrected to "/"
      { path: '/users', component: AppUsers }, 
      { path: 'users/create', component: UserCreate}
    ]
  },
  
 
]

const router = createRouter({
  history: createWebHistory(), // Use default base URL
  routes
})

export default router
