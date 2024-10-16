<template>
    <div class="pt-3 pb-2 mb-3 border-bottom">
      <input
        type="text"
        v-model="searchTag"
        placeholder="Search by tag..."
        class="form-control mb-3"
      />
      <button @click="searchByTag" class="custom-button search-button">Search</button>
    </div>
    <div class="table-container">
      <div v-if="resources.length === 0">No resources found for the specified tag.</div>
      <div class="table-responsive" v-else>
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#Resource ID</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resource in resources" :key="resource.id">
              <td>{{ resource.id }}</td>
              <td>{{ resource.title }}</td>
              <td>{{ resource.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue';
  import axios from 'axios';
  
  interface ResourceInterface {
    id: number;
    title: string;
    description: string;
  }
  
  export default {
    name: "ResourceSearch",
    setup() {
      const resources = ref<ResourceInterface[]>([]);
      const searchTag = ref("");
  
      const searchByTag = async () => {
        if (searchTag.value.trim() === "") return;
  
        try {
          const { data } = await axios.get(`/api/tags/${searchTag.value}/resources`);
          resources.value = data;
        } catch (error) {
          console.error("Error fetching resources by tag:", error);
          resources.value = [];
        }
      };
  
      return {
        searchTag,
        resources,
        searchByTag,
      };
    },
  };
  </script>
  
  <style scoped>
  .custom-button {
    padding: 5px 10px;
    background-color: #6f42c1;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .custom-button:hover {
    background-color: #5a32a1;
  }
  
  .table-container {
    margin: 20px;
  }
  </style>
  