<template>
    <div class="pt-3 pb-2 mb-3 border-bottom">
        <router-link to="/resources/create" class="custom-button add-button">
            Add Resource
        </router-link>
    </div>

    <div class="table-container">
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th class="id-column">#ID</th>
                        <th class="title-column">File</th>
                        <th class="title-column">Title</th>
                        <th class="description-column">Description</th>
                        <th class="action-column">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="file in files" :key="file.id">
                        <td>{{ file.id }}</td>
                        <td><img :src="file.image" width="50" alt="File Image"></td>
                        <td>{{ file.title }}</td>
                        <td>{{ file.description }}</td>
                        <td>{{ file.size }}</td>
                    </tr>
                </tbody>
            </table>
            <!-- <div class="pagination-container">
                <button class="custom-button pagination-button" @click="goToPreviousPage" :disabled="page === 1">Previous</button>
                <button class="custom-button pagination-button" @click="goToNextPage" :disabled="page >= last_page">Next</button>
            </div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

// Define an interface for the file object
interface File {
    id: number;
    image: string;
    title: string;
    description: string;
    size: string; // Change this type based on the actual type of size (e.g., number or string)
}

export default {
    name: "FilesPage",
    setup() {
        const files = ref<File[]>([]); // Type the files array

        onMounted(async () => {
            const { data } = await axios.get('resources'); 
            files.value = data.data;
        });

        return {
            files,
        }
    }
}
</script>
