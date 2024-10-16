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
    <div class="navbar-nav">
      <div class="nav-item text-nowrap d-flex align-items-center">
        <!-- Display user name or 'Visitor' -->
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

        <!-- Display logout button for authenticated users -->
        <router-link
          v-if="!isVisitor"
          class="p-2 text-white text-decoration-none glow"
          to="/login"
          @click="logout"
        >
          Logout
        </router-link>

        <!-- Display register button for visitors -->
        <router-link
          v-if="isVisitor"
          class="p-2 text-white text-decoration-none glow"
          to="/register"
        >
          Register
        </router-link>
      </div>
    </div>

    <!-- Error message display -->
    <div v-if="errorMessage" class="alert alert-danger mt-2 mx-auto" role="alert" style="max-width: 500px;">
      {{ errorMessage }}
    </div>
  </header>
</template>

<script lang="ts">
import { onMounted, ref, computed } from 'vue';
import axios from 'axios';

export default {
  name: "NavBar",
  setup() {
    const name = ref(''); // Stores user name or 'Visitor'
    const errorMessage = ref(''); // Error message state
    const isVisitor = computed(() => name.value === 'Visitor'); // Check if user is a visitor

    // Fetch user data on component mount
    onMounted(async () => {
      try {
        const { data } = await axios.get('user', { withCredentials: true });
        name.value = `${data.first_name} ${data.last_name}`; // Set the user's name
      } catch (error) {
        errorMessage.value = 'Failed to load user data. Please try again later.';
        name.value = 'Visitor'; // Fallback to 'Visitor'
        console.error('Error fetching user data:', error);
      }
    });

    // Logout function
    const logout = async () => {
      try {
        await axios.post('logout');
      } catch (error) {
        errorMessage.value = 'Logout failed. Please try again.';
        console.error('Error during logout:', error);
      }
    };

    return {
      name,
      logout,
      isVisitor,
      errorMessage,
    };
  },
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
