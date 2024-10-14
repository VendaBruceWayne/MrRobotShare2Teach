<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Share2Teach</a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
    <div class="navbar-nav">
      <div class="nav-item text-nowrap">
        <router-link 
          v-if="!isVisitor" 
          class="p-2 text-white text-decoration-none glow" 
          to="/profile"
        >
          {{ name }}
        </router-link>
        <span 
          v-else 
          class="p-2 text-white text-decoration-none" 
          style="cursor: not-allowed;"
        >
          {{ name }}
        </span>
        
        <router-link 
          v-if="!isVisitor" 
          class="p-2 text-white text-decoration-none glow" 
          to="/logout" 
          @click="logout"
        >
          Logout
        </router-link>

        <router-link 
          v-if="isVisitor" 
          class="p-2 text-white text-decoration-none" 
          to="/register"
        >
          Register
        </router-link>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';

export default {
  name: "NavBar",
  setup() {
    const name = ref('');
    const isVisitor = computed(() => name.value === 'Visitor');

    onMounted(async () => {
      try {
        const { data } = await axios.get('user', { withCredentials: true });
        name.value = `${data.first_name} ${data.last_name}`;
      } catch {
        name.value = 'Visitor';
      }
    });

    const logout = async () => {
      await axios.post('logout');
    }

    return {
      name,
      logout,
      isVisitor
    };
  }
};
</script>

<style scoped>
.glow {
  position: relative;
  display: inline-block;
  transition: transform 0.3s, color 0.3s;
}

.glow:hover {
  transform: scale(1.1); /* Zoom in slightly on hover */
  color: white; /* Change text color on hover */
}
</style>
