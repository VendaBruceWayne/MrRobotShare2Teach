import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import DashBoard from '@/pages/DashBoard.vue'
import AppUsers from '@/pages/users/AppUsers.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import WrapperPage from '@/pages/WrapperPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import UserCreate from '@/pages/users/UserCreate.vue'
import UserEdit from '@/pages/users/UserEdit.vue'
import UserRoles from '@/pages/roles/UserRoles.vue'
import ResourcesPage from '@/pages/resources/ResourcesPage.vue'
import ResourcesCreate from '@/pages/resources/ResourcesCreate.vue'
import ResourceEdit from '@/pages/resources/ResourceEdit.vue'
import RoleCreate from '@/pages/roles/RoleCreate.vue'
import RoleEdit from '@/pages/roles/RoleEdit.vue'
import UserProfile from '@/pages/UserProfile.vue'
import FaqPage from '@/pages/FaqPage.vue'
import AboutUs from '@/pages/AboutUs.vue'
import OER from '@/pages/OER.vue'
import SelfDirected from '@/pages/SelfDirected.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: RegisterPage}, 
  { path: '/login', component: LoginPage}, 
  {
    path: '/faq',
    component: FaqPage,
  },
  { path: '/about', component: AboutUs},
  { path: '/self', component: SelfDirected },
  { path: '/oer', component: OER },
  { path: '', 
    component: WrapperPage, 
    children: [
      { path: '/', component: DashBoard, meta: { requiresAuth: false }  },  // Root path corrected to "/"
      { path: '/profile', component: UserProfile }, 
      { path: '/users', component: AppUsers }, 
      { path: '/users/create', component: UserCreate},
      { path: '/users/:id/edit', component: UserEdit },
      { path: '/roles', component: UserRoles },
      { path: '/roles/create', component: RoleCreate },
      { path: '/roles/:id/edit', component: RoleEdit },
      { path: '/resources', component: ResourcesPage}, 
      { path: '/resources/create', component: ResourcesCreate}, 
      { path: '/resources/:id/edit', component: ResourceEdit}, 

    ]
  },
  
 
]

const router = createRouter({
  history: createWebHistory(), // Use default base URL
  routes
})

export default router
