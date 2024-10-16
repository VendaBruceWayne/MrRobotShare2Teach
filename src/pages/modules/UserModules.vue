<template>
    <div class="pt-3 pb-2 mb-3 border-bottom">
      <router-link to="/modules/create" class="custom-button add-button">
        Add Module
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
            <tr v-for="module in modules" :key="module.id">
              <td>{{ module.id }}</td>
              <td>{{ module.name }}</td>
              <td>
                <button @click="confirmDeleteModule(module.id)" class="custom-button delete-button">Delete</button>
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
  
  interface Module {
    id: number;
    name: string;
  }
  
  export default {
    name: "UserModules",
    setup() {
      const modules = ref<Module[]>([]); // Removed the unnecessary semicolon
  
      const loadModules = async () => {
        try {
          const { data } = await axios.get('/modules'); // Ensure this endpoint is correct
          modules.value = data; // Adjust based on your API response structure
        } catch (error) {
          console.error("Error fetching modules:", error);
        }
      };
  
      const confirmDeleteModule = (id: number) => {
        if (confirm("Are you sure you want to delete this module?")) {
          deleteModule(id);
        }
      };
  
      const deleteModule = async (id: number) => {
        try {
          await axios.delete(`/modules/${id}`); // Ensure this endpoint is correct
          modules.value = modules.value.filter((m: Module) => m.id !== id); // Remove the deleted module from the array
        } catch (error) {
          console.error("Error deleting module:", error);
        }
      };
  
      onMounted(loadModules);
  
      return {
        modules,
        confirmDeleteModule,
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
  