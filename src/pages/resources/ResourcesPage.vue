<template>
    <div class="pt-3 pb-2 mb-3 border-bottom">
        <router-link to="/resources/create" class="custom-button add-button">
            Add Resource
        </router-link>
    </div>

    <!-- Search Input Field -->
    <div class="search-container">
        <input
            type="text"
            v-model="searchQuery"
            class="search-input"
            placeholder="Search resources by title or description..."
        />
    </div>

    <div class="table-container">
        <div class="table-responsive">
            <table class="table table-striped table-sm">
                <thead>
                    <tr>
                        <th class="id-column">#ID</th> 
                        <th class="file-column">File</th>
                        <th class="title-column">Title</th>
                        <th class="description-column">Description</th>
                        <th class="status-column">Moderation Status</th>
                        <th class="action-column">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Filter resources based on search query -->
                    <tr v-for="resource in filteredResources" :key="resource.id">
                        <td class="id-column">{{ resource.id }}</td>
                        <td><img :src= "resource.pdf" width="50"/></td>
                        <td class="title-column">{{ resource.title }}</td>
                        <td class="description-column">{{ resource.description }}</td>
                        <td class="description-column">{{ resource.moderationStatus}}</td>
                        <td class="action-column">
                            <router-link :to="`/resources/${resource.id}/edit`" class="custom-button edit-button">Edit</router-link>
                            <button @click="confirmDeleteResource(resource.id)" class="custom-button delete-button">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination-container">
                <button class="custom-button pagination-button" @click="goToPreviousPage" :disabled="page === 1">Previous</button>
                <button class="custom-button pagination-button" @click="goToNextPage" :disabled="page >= last_page">Next</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
import axios from 'axios';

interface ResourceInterface {
    id: number;
    title: string;
    pdf: string;
    description: string;
    moderationStatus: string;
}

export default {
    name: 'ResourcesPage',
    setup() {
        const resources = ref<ResourceInterface[]>([]);
        const page = ref(1);
        const last_page = ref(1);
        const searchQuery = ref('');

        const loadResources = async () => {
            try {
                const { data } = await axios.get(`/resources?page=${page.value}&query=${searchQuery.value}`);
                resources.value = data.data;
                last_page.value = data.meta.last_page;
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        const fetchResources = async () => {
            await loadResources();
        };

        // Filter resources based on search query
        const filteredResources = computed(() => {
            return resources.value.filter(resource => 
                resource.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                resource.description.toLowerCase().includes(searchQuery.value.toLowerCase())
            );
        });

        // Watch for changes in page and searchQuery, and reload resources
        watch([page, searchQuery], loadResources);

        const confirmDeleteResource = (id: number) => {
            if (confirm('Are you sure you want to delete this resource?')) {
                deleteResource(id);
            }
        };

        const deleteResource = async (id: number) => {
            try {
                await axios.delete(`/resources/${id}`);
                resources.value = resources.value.filter(resource => resource.id !== id);
                await loadResources();
            } catch (error) {
                console.error('Error deleting resource:', error);
            }
        };

        const goToPreviousPage = () => {
            if (page.value > 1) {
                page.value--; // Decrease page number and reload resources
            }
        };

        const goToNextPage = () => {
            if (page.value < last_page.value) {
                page.value++; // Increase page number and reload resources
            }
        };

        // Load resources on component mount
        onMounted(loadResources);

        return {
            resources,
            page,
            last_page,
            searchQuery,
            filteredResources,
            confirmDeleteResource,
            goToPreviousPage,
            goToNextPage,
            fetchResources // Ensure fetchResources is returned
        };
    },
};
</script>

<style scoped>
.table-container {
    margin: 20px;
}

.table-responsive {
    margin-bottom: 20px;
}

table {
    width: 100%; /* Ensures the table takes full width */
}

.id-column {
    width: 50px; /* Reduced width for ID column */
}

.title-column {
    width: 100px; /* Adjusted width for Title column to bring it closer to ID */
}

.description-column {
    width: 400px; /* Increased width for Description column */
}

.action-column {
    width: 150px; /* Adjust this value as needed for your layout */
}

.pagination-container {
    display: flex;
    justify-content: center;
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
.delete-button,
.pagination-button {
    background-color: #6f42c1; /* Purple color */
    color: white;
}

.add-button:hover,
.edit-button:hover,
.delete-button:hover,
.pagination-button:hover {
    background-color: #5a32a1; /* Darker purple on hover */
    box-shadow: 0 0 10px rgba(111, 66, 193, 0.7), 0 0 20px rgba(111, 66, 193, 0.5); /* Glowing effect */
}

.pagination-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

/* Add margin to buttons in action column */
td .custom-button {
    margin-right: 5px; /* Adjust margin as needed */
}

/* Search input styles */
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
