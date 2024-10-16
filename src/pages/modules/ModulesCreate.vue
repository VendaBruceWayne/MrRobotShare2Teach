<template>
    <div class="container mt-5">
        <h2 class="text-center">Create Module</h2>
        <form @submit.prevent="submit">
            <div class="mb-3">
                <label>Module Name</label>
                <input v-model="form.name" class="form-control" name="name" @blur="checkModuleName" />
                <small class="text-danger" v-if="!form.name">* Required</small>
                <small class="text-danger" v-if="nameExists">* Module name already exists</small>
            </div>
            <button class="btn btn-purple" :disabled="!isFormValid || nameExists">Save</button>
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

export default {
    name: 'ModulesCreate',
    setup() {
        const form = reactive({
            name: '', // Module name input
        });

        const successMessage = ref<string | null>(null);
        const nameExists = ref<boolean>(false); // To check if the module name already exists
        const router = useRouter();

        const isFormValid = computed(() => {
            return form.name !== ''; // Form is valid only if the name is filled
        });

        // Function to check if the module name already exists
        const checkModuleName = async () => {
            if (form.name) {
                try {
                    const response = await axios.get(`/modules/check-name?name=${form.name}`);
                    nameExists.value = response.data.exists; // Backend should return { exists: true/false }
                } catch (error) {
                    console.error('Error checking module name:', error);
                }
            }
        };

        const submit = async () => {
            // Check for required fields and if the name already exists
            if (!isFormValid.value || nameExists.value) {
                alert('Please fill in all required fields or choose a different module name.');
                return;
            }

            try {
                await axios.post('/modules', form); // Assuming the endpoint to create a module
                successMessage.value = 'Module has been successfully created!';
                resetForm();
            } catch (error) {
                console.error('Error creating module:', error);
            }
        };

        const resetForm = () => {
            form.name = ''; // Reset the form input
        };

        const goBack = async () => {
            await router.push('/modules'); // Navigate back to the modules list
        };

        return {
            form,
            submit,
            goBack,
            successMessage,
            isFormValid,
            checkModuleName,
            nameExists,
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
