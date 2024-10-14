<template>
    <div class="container mt-5">
      <h2 class="text-center">Create User</h2> <!-- Add label for the page -->
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label>First Name</label>
          <input v-model="form.first_name" class="form-control" name="first_name" />
        </div>
        <div class="mb-3">
          <label>Last Name</label>
          <input v-model="form.last_name" class="form-control" name="last_name" />
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input v-model="form.email" class="form-control" name="email" />
        </div>
        <div class="mb-3">
          <label>Role</label>
          <select v-model="form.role_id" name="role_id" class="form-control">
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            name="password"
          />
        </div>
        <div class="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            v-model="form.confirm_password"
            class="form-control"
            name="confirm_password"
          />
        </div>
        <button class="btn btn-purple">Save</button> <!-- Updated button class -->
      </form>
      <button @click="goBack" class="btn btn-secondary mt-3">Back</button> <!-- Back button -->
    </div>
</template>
  
  <script lang="ts">
  import axios from 'axios';
  import { reactive, ref, onMounted } from 'vue';
  
  // Define the Role interface
  interface Role {
    id: number;
    name: string;
  }
  
  export default {
    name: 'UserCreate',
    setup() {
      // Reactive form state
      const form = reactive({
        first_name: '',
        last_name: '',
        email: '',
        role_id: '',
        password: '',
        confirm_password: ''
      });
  
      // Reactive roles array with Role interface typing
      const roles = ref<Role[]>([]);
  
      // Fetch roles when the component is mounted
      onMounted(async () => {
        try {
          const { data } = await axios.get('/roles'); // Ensure the endpoint is correct
          roles.value = data;
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      });
  
      // Submit function with password validation
      const submit = async () => {
        // Check if passwords match
        if (form.password !== form.confirm_password) {
          alert('Passwords do not match!');
          return;
        }
  
        try {
          const response = await axios.post('/users', {
            first_name: form.first_name,
            last_name: form.last_name,
            email: form.email,
            role_id: form.role_id,
            password: form.password
          });
          console.log('User created successfully', response.data);
  
          // Optionally, reset the form after submission
          form.first_name = '';
          form.last_name = '';
          form.email = '';
          form.role_id = '';
          form.password = '';
          form.confirm_password = '';
        } catch (error) {
          console.error('Error creating user:', error);
        }
      };
  
      // Function to go back to the users page
      const goBack = () => {
        window.location.href = 'http://localhost:8081/users';
      };
  
      // Return reactive properties to the template
      return {
        form,
        roles,
        submit,
        goBack
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px; /* Adjust the maximum width of the form */
  }
  
  .btn-purple {
    background-color: #6f42c1; /* Purple background */
    color: white; /* White text color */
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s, transform 0.3s; /* Added transition */
  }
  
  .btn-purple:hover {
    background-color: #5a32a1; /* Darker purple on hover */
    box-shadow: 0 0 10px rgba(111, 66, 193, 0.7), 0 0 20px rgba(111, 66, 193, 0.5); /* Purple glow effect */
  }
  </style>
  