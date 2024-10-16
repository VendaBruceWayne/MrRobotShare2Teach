<template>
    <div class="container mt-5">
        <h2 class="text-center">Create Resource</h2>
        <form @submit.prevent="submit">
            <div class="mb-3">
                <label>Title</label>
                <input v-model="form.title" class="form-control" name="title" />
                <small class="text-danger" v-if="!form.title">* Required</small>
            </div>
            <div class="mb-3">
                <label>Description</label>
                <textarea v-model="form.description" class="form-control" name="description"></textarea>
                <small class="text-danger" v-if="!form.description">* Required</small>
            </div>
            <div class="mb-3">
                <label>Document</label>
                <div class="input-group">
                    <DocumentUpload @uploaded="handleFileUpload" />
                </div>
                <input v-model="form.document" class="form-control" name="document" disabled />
                <small class="text-danger" v-if="!form.document">* Required</small>
            </div>
            <div class="mb-3">
                <label>Modules</label>
                <select v-model="form.modules" class="form-control" multiple>
                    <option v-for="module in modules" :key="module.id" :value="module.id">
                        {{ module.name }}
                    </option>
                </select>
                <small class="text-danger" v-if="form.modules.length === 0">* Required</small>
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
import { reactive, ref, computed, onMounted } from 'vue';
import DocumentUpload from '@/components/DocumentUpload.vue';

export default {
    name: 'ResourcesCreate',
    components: { DocumentUpload },
    setup() {
        const form = reactive({
            title: '',
            description: '',
            document: '',
            modules: [] as number[], // To hold selected module IDs
        });

        const successMessage = ref<string | null>(null);
        const router = useRouter();
        const modules = ref<{ id: number; name: string }[]>([]); // Store modules here

        // Fetch modules when component mounts
        const fetchModules = async () => {
            try {
                const response = await axios.get('/modules'); // Endpoint to fetch modules
                modules.value = response.data; // Assuming response.data is an array of modules
            } catch (error) {
                console.error('Error fetching modules:', error);
            }
        };

        const isFormValid = computed(() => {
            return form.title && form.description && form.document && form.modules.length > 0;
        });

        const handleFileUpload = (filePath: string) => {
            form.document = filePath; // Set the document field to the uploaded file's path
        };

        const submit = async () => {
            // Check for all required fields before submitting
            if (!isFormValid.value) {
                alert('Please fill in all required fields.');
                return;
            }

            try {
                await axios.post('/resources', form);
                successMessage.value = 'Resource has been successfully created!';
                resetForm();
            } catch (error) {
                console.error('Error creating resource:', error);
            }
        };

        const resetForm = () => {
            form.title = '';
            form.description = '';
            form.document = '';
            form.modules = []; // Reset modules selection
        };

        const goBack = async () => {
            await router.push('/resources');
        };

        // Fetch modules when component mounts
        onMounted(fetchModules);

        return {
            form,
            submit,
            goBack,
            successMessage,
            isFormValid,
            handleFileUpload,
            modules,
        };
    },
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
