<template>
    <div class="home">
      <h1>Moderated Resources</h1>
  
      <!-- Loading and Error States -->
      <div v-if="loading">Loading...</div>
      <div v-if="error">{{ error }}</div>
  
      <!-- Search Input Field -->
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          class="search-input"
          placeholder="Search moderated resources by title or description..."
        />
      </div>
  
      <!-- Table for Moderated Resources -->
      <div class="table-container" v-if="filteredModeratedResources.length">
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th class="id-column">#ID</th>
                <th class="file-column">File</th>
                <th class="title-column">Title</th>
                <th class="description-column">Description</th>
                <th class="action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="resource in filteredModeratedResources" :key="resource.id">
                <td class="id-column">{{ resource.id }}</td>
                <td><img :src="resource.pdf" width="50" /></td>
                <td class="title-column">{{ resource.title }}</td>
                <td class="description-column">{{ resource.description }}</td>
                <td class="action-column">
                  <router-link :to="`/home/${resource.id}/rating`" class="custom-button edit-button">rate</router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <div v-else>No moderated resources available.</div>
    </div>
</template>
  
  <script lang="ts">
  import { ref, onMounted, computed } from 'vue';
  import axios from 'axios';
  
  interface ResourceInterface {
    id: number;
    title: string;
    pdf: string;
    description: string;
    moderationStatus: string;
  }
  
  export default {
    name: 'HomePage',
    setup() {
      const resources = ref<ResourceInterface[]>([]);
      const searchQuery = ref('');
      const loading = ref(true);
      const error = ref<string | null>(null);
  
      const fetchModeratedResources = async () => {
        try {
          const { data } = await axios.get('/resources?moderationStatus=approved'); // Fetch only moderated resources
          resources.value = data.data; // Store the moderated resources
        } catch (err) {
          error.value = 'Failed to fetch moderated resources.';
        } finally {
          loading.value = false;
        }
      };
  
  
      
  
      const filteredModeratedResources = computed(() => {
        return resources.value.filter(resource =>
          (resource.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
           resource.description.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
           resource.moderationStatus === 'approved' // Ensure only "approved" resources are shown
        );
      });
  
      // Fetch resources on component mount
      onMounted(fetchModeratedResources);
  
      return {
        resources,
        searchQuery,
        loading,
        error,
        filteredModeratedResources,
        
      };
    },
  };
  </script>
  
  <style scoped>
  .home {
    padding: 20px;
  }
  
  h1 {
    color: #333;
  }
  
  /* Table Styles */
  .table-container {
    margin: 20px 0;
  }
  
  .table-responsive {
    margin-bottom: 20px;
  }
  
  .id-column {
    width: 50px;
  }
  
  .title-column {
    width: 100px;
  }
  
  .description-column {
    width: 400px;
  }
  
  .action-column {
    width: 150px;
  }
  
  .custom-button {
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s, box-shadow 0.3s;
  }
  
  .edit-button, .delete-button {
    background-color: #6f42c1;
    color: white;
  }
  
  .edit-button:hover, .delete-button:hover {
    background-color: #5a32a1;
    box-shadow: 0 0 10px rgba(111, 66, 193, 0.7), 0 0 20px rgba(111, 66, 193, 0.5);
  }
  
  td .custom-button {
    margin-right: 5px;
  }
  
  .search-container {
    margin-bottom: 15px;
  }
  
  .search-input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }
  </style>
  