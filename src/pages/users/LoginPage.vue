<template>
    <main class="form-signin">
      <h3 class="h3 mb-3 fw-normal">Please Login</h3>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label></label>
          <input type="email" class="form-control" v-model="form.email" placeholder="Email" required />
        </div>
  
        <div class="form-group">
          <label></label>
          <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="form.password" placeholder="Password" required />
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="showPassword" /> Show Password
            <label></label>
          </label>
        </div>
        <button type="submit" class="btn btn-primary btn-block">Login</button>
      </form>
    </main>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router'; // Fix: Import useRouter correctly
  
  export default {
    name: 'LoginPage',
    setup() {
      const form = reactive({
        email: '',
        password: ''
      });
      const showPassword = ref(false);
      const router = useRouter(); // Use useRouter properly
  
      const handleSubmit = async () => {
        try {
          // Await axios call to ensure it's completed before redirection
          await axios.post('login', {
            email: form.email,
            password: form.password
          }, { withCredentials: true });
  
          // Redirect to homepage after successful login
          await router.push('/');
        } catch (error) {
          console.error('Login failed', error);
          alert('Login failed. Please check your credentials and try again.');
        }
      };
  
      return {
        form,
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