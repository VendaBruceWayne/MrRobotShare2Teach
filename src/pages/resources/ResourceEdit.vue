<template>
    <div class="container mt-5">
        <h2 class="text-center">Update Resource Details</h2>
        <form @submit.prevent="submit">
            <div class="mb-3">
                <label>Title</label>
                <input v-model="data.title" class="form-control" name="title" />
                <small class="text-danger" v-if="!data.title">* Required</small>
            </div>
            <div class="mb-3">
                <label>Description</label>
                <textarea v-model="data.description" class="form-control" name="description"></textarea>
                <small class="text-danger" v-if="!data.description">* Required</small>
            </div>
            <div class="mb-3">
                <label>Document</label>
                <div class="input-group">
                    <input v-model="data.pdf" class="form-control" name="document" readonly />
                    <DocumentUpload @uploaded="data.pdf = $event" />
                </div>
            </div>
            <div class="mb-3">
                <label>Moderation Status</label>
                <select v-model="data.moderationStatus" class="form-control" name="moderationStatus">
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                </select>
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
import { reactive, onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import DocumentUpload from '@/components/DocumentUpload.vue';

export default {
    name: "ResourceEdit",
    components: {
        DocumentUpload
    },
    setup() {
        const router = useRouter();
        const route = useRoute();

        // Define the shape of the data object with TypeScript type annotations
        const data = reactive<{
            title: string;
            description: string;
            pdf: string;
            moderationStatus: 'pending' | 'approved' | 'rejected'; // Add moderationStatus
        }>({
            title: '',
            description: '',
            pdf: '',
            moderationStatus: 'pending' // Initialize with a default value
        });

        const successMessage = ref<string | null>(null);

        const isFormValid = computed(() => {
            return data.title && data.description && data.pdf;
        });

        onMounted(async () => {
            try {
                const response = await axios.get(`/resources/${route.params.id}`);
                data.title = response.data.title;
                data.description = response.data.description;
                data.pdf = response.data.pdf;
                data.moderationStatus = response.data.moderationStatus; // Set moderationStatus from API
            } catch (error) {
                console.error('Error fetching resource details:', error);
            }
        });

        const submit = async () => {
            try {
                await axios.put(`/resources/${route.params.id}`, data);
                successMessage.value = 'Resource has been successfully updated!';
            } catch (error) {
                console.error('Error updating resource:', error);
            }
        };

        const goBack = () => {
            router.push('/resources');
        };

        return {
            data,
            submit,
            goBack,
            successMessage,
            isFormValid
        };
    }
}
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
