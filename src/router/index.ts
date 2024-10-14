import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const ResourcesPage = () => import('@/pages/resources/ResourcesPage.vue');
import ResourceCreate from '@/pages/resources/ResourceCreate.vue';
import RegisterPage from '@/pages/users/RegisterPage.vue';
import LoginPage from '@/pages/users/LoginPage.vue';
import DashBoard from '@/pages/users/DashBoard.vue';
import AppUsers from '@/pages/users/AppUsers.vue';
import UserCreate from '@/pages/users/UserCreate.vue';
import WrapperPage from '@/pages/users/WrapperPage.vue';
import ResourceEdit from '@/pages/resources/ResourceEdit.vue';


const routes: Array<RouteRecordRaw> = [
  { path: '/register', component: RegisterPage}, 
  { path: '/login', component: LoginPage},

  { 
    path: '',
     component: WrapperPage,
    children: [
      { path: '/', component: DashBoard  },  // Root path corrected to "/"
      { path: '/users', component: AppUsers }, 
      { path: '/resources', component: ResourcesPage },
      { path: '/resources/create', component: ResourceCreate },
      { path: '/resources/:id/update', component: ResourceEdit },
      { path: '/users/create', component: UserCreate}
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router


/*

<style scoped>
form {
  margin-bottom: 2rem;
}

form label {
  display: block;
  margin-top: 1rem;
}

form input,
form textarea {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
*/


//    <router-link to="/resources">Resources</router-link>
