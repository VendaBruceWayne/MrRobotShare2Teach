<template>
    <div class="container mt-5">
      <h2 class="text-center">Create User</h2>
      <form @submit.prevent="submit">
        <div class="mb-3">
          <label>First Name</label>
          <input v-model="form.first_name" class="form-control" name="first_name" />
          <small class="text-danger" v-if="!form.first_name">* Required</small>
        </div>
        <div class="mb-3">
          <label>Last Name</label>
          <input v-model="form.last_name" class="form-control" name="last_name" />
          <small class="text-danger" v-if="!form.last_name">* Required</small>
        </div>
        <div class="mb-3">
          <label>Email</label>
          <input v-model="form.email" class="form-control" name="email" />
          <small class="text-danger" v-if="!form.email">* Required</small>
        </div>
        <div class="mb-3">
          <label>Role</label>
          <select v-model="form.role_id" name="role_id" class="form-control">
            <option value="" disabled>Select a role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </select>
          <small class="text-danger" v-if="!form.role_id">* Required</small>
        </div>
        <div class="mb-3">
          <label>Password</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            name="password"
          />
          <small class="text-danger" v-if="!form.password">* Required</small>
        </div>
        <div class="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            v-model="form.confirm_password"
            class="form-control"
            name="confirm_password"
          />
          <small class="text-danger" v-if="!form.confirm_password">* Required</small>
        </div>
        <button class="btn btn-purple" :disabled="!isFormValid">Save</button>
      </form>
      <button @click="goBack" class="btn btn-secondary mt-3">Back</button>
  
      <div v-if="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
    </div>
</template>
  
  <script lang="ts">
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  import { reactive, ref, onMounted, computed } from 'vue';
  
  interface Role {
    id: number;
    name: string;
  }
  
  export default {
    name: 'UserCreate',
    setup() {
      const form = reactive({
        first_name: '',
        last_name: '',
        email: '',
        role_id: '',
        password: '',
        confirm_password: ''
      });
  
      const roles = ref<Role[]>([]);
      const successMessage = ref<string | null>(null);
      const router = useRouter();
  
      const isFormValid = computed(() => {
        return (
          form.first_name &&
          form.last_name &&
          form.email &&
          form.role_id &&
          form.password &&
          form.confirm_password
        );
      });
  
      onMounted(async () => {
        try {
          const { data } = await axios.get('/roles');
          roles.value = data;
        } catch (error) {
          console.error('Error fetching roles:', error);
        }
      });
  
      const submit = async () => {
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
          successMessage.value = 'User has been successfully created!';
          resetForm();
        } catch (error) {
          console.error('Error creating user:', error);
        }
      };
  
      const resetForm = () => {
        form.first_name = '';
        form.last_name = '';
        form.email = '';
        form.role_id = '';
        form.password = '';
        form.confirm_password = '';
      };
  
      const goBack = async () => {
        await router.push('/users');
      };
  
      return {
        form,
        roles,
        submit,
        goBack,
        successMessage,
        isFormValid
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }
  
  .btn-purple {
    background-color: #6f42c1;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  
  .btn-purple:hover {
    background-color: #5a32a1;
    box-shadow: 0 0 10px rgba(111, 66, 193, 0.7), 0 0 20px rgba(111, 66, 193, 0.5);
  }
  
  .btn-purple:disabled {
    background-color: #d3d3d3;
    color: #a9a9a9;
    cursor: not-allowed;
  }
  
  .btn-purple:disabled:hover {
    background-color: #d3d3d3;
    box-shadow: none;
  }
  
  .text-danger {
    color: red;
    font-size: 0.875rem;
  }
  </style>
  