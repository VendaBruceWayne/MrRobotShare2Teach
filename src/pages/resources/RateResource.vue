<template>
    <div class="container mt-5">
        <h2 class="text-center">Rate Resource</h2>
        <div v-if="resource">
            <h4>{{ resource.title }}</h4>
            <p>{{ resource.description }}</p>
            <div v-if="resource.pdf" class="mb-3">
                <h5>Document Preview:</h5>
                <div v-if="isPdf(resource.pdf)">
                    <iframe :src="resource.pdf" width="100%" height="400px" frameborder="0"></iframe>
                </div>
                <div v-else>
                    <p>Unsupported file type for preview.</p>
                </div>
            </div>
            
            <div class="mb-3">
                <label>Rating</label>
                <select v-model="rating" class="form-control">
                    <option value="" disabled>Select Rating</option>
                    <option v-for="star in stars" :key="star" :value="star">{{ star }}</option>
                </select>
            </div>
            <button class="btn btn-purple" :disabled="!rating" @click="submitRating">Submit Rating</button>
            <div v-if="successMessage" class="alert alert-success mt-3">
                {{ successMessage }}
            </div>
            <div v-if="errorMessage" class="alert alert-danger mt-3">
                {{ errorMessage }}
            </div>
        </div>
        <button @click="goBack" class="btn btn-secondary mt-3">Back</button>
    </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

interface Resource {
    id: number; // Add this to match the resource object structure
    title: string;
    description: string;
    pdf: string;
    moderationStatus: 'pending' | 'approved' | 'rejected';
}

export default {
    name: "RateResource",
    setup() {
        const router = useRouter();
        const route = useRoute();

        const resource = ref<Resource | null>(null);
        const rating = ref<number | null>(null);
        const successMessage = ref<string | null>(null);
        const errorMessage = ref<string | null>(null); // Add error message
        const stars = [1, 2, 3, 4, 5]; // Define star ratings

        onMounted(async () => {
            try {
                const response = await axios.get(`/resources/${route.params.id}`);
                resource.value = response.data; // Fetch resource details
            } catch (error) {
                console.error('Error fetching resource details:', error);
                errorMessage.value = 'Failed to load resource details.';
            }
        });

        const submitRating = async () => {
    try {
        await axios.post(`/api/rate`, {
            resourceId: route.params.id, // Pass resourceId here
            score: rating.value,
            comment: '', // You can modify this to collect comments if necessary
        });
        successMessage.value = 'Thank you for your rating!';
        rating.value = null; // Reset rating after submission
    } catch (error) {
        console.error('Error submitting rating:', error);
    }
};

        const goBack = () => {
            router.push('/resources');
        };

        const isPdf = (filePath: string) => {
            return /\.pdf$/i.test(filePath);
        };

        return {
            resource,
            rating,
            successMessage,
            errorMessage, // Include error message in return
            stars,
            submitRating,
            goBack,
            isPdf,
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

.alert {
    margin-top: 1rem;
}
</style>
