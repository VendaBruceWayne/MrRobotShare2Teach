<template>
    <div class="pt-3 pb-2 mb-3 border-bottom">
      <router-link to="/roles/create" class="custom-button add-button">
        Add Role
      </router-link>
    </div>
    <div class="table-container">
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="role in roles" :key="role.id">
              <td>{{ role.id }}</td>
              <td>{{ role.name }}</td>
              <td>
                <router-link :to="`/roles/${role.id}/edit`" class="custom-button edit-button">Edit</router-link>
                <button @click="confirmDeleteRole(role.id)" class="custom-button delete-button">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { User } from "@/models/user";
  import { Role } from '@/models/role'; // Use the imported Role interface
  
  export default {
    name: "UserRoles",
    setup() {
      const roles = ref<Role[]>([]); // Use the imported Role interface
  
      const loadRoles = async () => {
        try {
          const { data } = await axios.get('/roles'); // Ensure this endpoint is correct
          roles.value = data; // Adjust based on your API response structure
        } catch (error) {
          console.error("Error fetching roles:", error);
        }
      };
  
      const confirmDeleteRole = (id: number) => {
        if (confirm("Are you sure you want to delete this role?")) {
          deleteRole(id);
        }
      };
  
      const deleteRole = async (id: number) => {
        try {
          await axios.delete(`/roles/${id}`); // Ensure this endpoint is correct
          roles.value = roles.value.filter((r: Role) => r.id !== id); // Remove the deleted role from the array
        } catch (error) {
          console.error("Error deleting role:", error);
        }
      };
  
      onMounted(loadRoles);
  
      return {
        roles,
        confirmDeleteRole,
      };
    },
  };
  </script>
  
  <style scoped>
  /* Your existing styles */
  .table-container {
    margin: 20px;
  }
  
  .table-responsive {
    margin-bottom: 20px;
  }
  
  .custom-button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
    margin: 0 10px;
  }
  
  .add-button {
    background-color: #6f42c1; /* Purple color */
    color: white;
  }
  
  .edit-button,
  .delete-button {
    background-color: #6f42c1; /* Purple color */
    color: white;
  }
  
  .add-button:hover,
  .edit-button:hover,
  .delete-button:hover {
    background-color: #5a32a1; /* Darker purple on hover */
    box-shadow: 0 0 10px rgba(111, 66, 193, 0.7), 0 0 20px rgba(111, 66, 193, 0.5); /* Glowing effect */
  }
  </style>
  