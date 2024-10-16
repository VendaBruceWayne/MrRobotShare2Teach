<template>
  <main class="form-signin">
    <h3 class="h3 mb-3 fw-normal">Please Register</h3>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label></label>
        <input type="text" class="form-control" v-model="first_name" placeholder="First Name" required />
      </div>

      <div class="form-group">
        <label></label>
        <input type="text" class="form-control" v-model="last_name" placeholder="Last Name" required />
      </div>

      <div class="form-group">
        <label></label>
        <input type="email" class="form-control" v-model="email" placeholder="Email" required />
      </div>

      <div class="form-group">
        <label></label>
        <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="password" placeholder="Password" required />
      </div>

      <div class="form-group">
        <label></label>
        <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="password_confirm" placeholder="Confirm Password" required />
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" v-model="showPassword" /> Show Password
          <label></label>
        </label>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Sign Up</button>
    </form>
  </main>
</template>

<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  name: "RegisterPage",
  setup() {
    const first_name = ref('');
    const last_name = ref('');
    const email = ref('');
    const password = ref('');
    const password_confirm = ref('');
    const showPassword = ref(false);  // State for showing/hiding password
    const router = useRouter();

    const handleSubmit = async () => {
      try {
        await axios.post('register', {
          first_name: first_name.value,
          last_name: last_name.value,
          email: email.value,
          password: password.value,
          password_confirm: password_confirm.value,
        });
        await router.push('/login');
      } catch (error) {
        console.error('Registration failed', error);
        alert('Registration failed. Please try again.');
      }
    };

    return {
      first_name,
      last_name,
      email,
      password,
      password_confirm,
      showPassword,
      handleSubmit
    };
  }
};
</script>
<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.btn-primary {
  background-color: #6a0dad; /* Purple */
  border-color: #6a0dad;
  color: white; /* White text */
}

/* Button hover effect */
.btn-primary:hover {
  background-color: #8b00ff; /* Lighter purple */
  border-color: #8b00ff;
}

/* Add purple glow to text boxes */
.form-control {
  border: 1px solid #ced4da;
  padding: 0.75rem 1.25rem;
  box-shadow: none; /* No glow by default */
  transition: box-shadow 0.3s ease; /* Smooth transition */
}

/* Glow effect when focused */
.form-control:focus {
  outline: none;
  border-color: #6a0dad; /* Purple border */
  box-shadow: 0 0 10px rgba(106, 13, 173, 0.8); /* Purple glow */
}

/* Optional: Add purple glow on hover */
.form-control:hover {
  box-shadow: 0 0 5px rgba(106, 13, 173, 0.5); /* Slight glow on hover */
}

</style>
