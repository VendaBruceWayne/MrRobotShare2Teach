import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Faq from '@/pages/Faq.vue';
import AboutUs from "@/pages/AboutUs.vue";
import SelfDirected from "@/pages/SelfDirected.vue";
import OER from "@/pages/OER.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/faq',
    component: Faq,
  },
  { path: '/about', component: AboutUs },
  { path: '/self', component: SelfDirected },
  { path: '/oer', component: OER },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
