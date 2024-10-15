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
                    <input v-model="form.document" class="form-control" name="document" />
                    <DocumentUpload @uploaded="form.document = $event"/>
                </div>
                <small class="text-danger" v-if="!form.document">* Required</small>
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
import { reactive, ref, computed } from 'vue';
import DocumentUpload from '@/components/DocumentUpload.vue';

export default {
    name: 'ResourcesCreate',
    components: { DocumentUpload },
    setup() {
        const form = reactive({
            title: '',
            description: '',
            document: ''
        });

        const successMessage = ref<string | null>(null);
        const router = useRouter();

        const isFormValid = computed(() => {
            return form.title && form.description && form.document;
        });

        const submit = async () => {
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
        };

        const goBack = async () => {
            await router.push('/resources');
        };

        return {
            form,
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
