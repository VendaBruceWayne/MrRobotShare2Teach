<template>
    <div class="container mt-5">
        <h2 class="text-center">Create Role</h2>
        <form @submit.prevent="submit">
            <!-- Name Field -->
            <div class="mb-3 mt-3 row">
                <label class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <input v-model="formData.name" class="form-control" name="name" />
                </div>
            </div>

            <!-- Permissions Checkboxes -->
            <div class="mb-3">
                <label class="col-sm-2 col-form-label">Permissions</label>
                <div class="row">
                    <div class="col-md-4" v-for="permission in formData.permissions" :key="permission.id">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" :value="permission.id" @change="select(permission.id, $event)">
                            <label class="form-check-label">{{ permission.name }}</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <!-- Submit Button -->
            <button class="btn btn-purple" :disabled="!isFormValid">Save</button>
        </form>
    </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
    name: "RoleCreate",
    setup() {
        const { push } = useRouter();

        // Reactive form data
        const formData = reactive({
            name: '', 
            permissions: [] 
        });

        const selectedPermissions = ref<number[]>([]);  // Store selected permission IDs
        const isFormValid = ref(false);  // Form validation flag
        const errorMessage = ref<string | null>(null);  // Error message

        // Fetch permissions when component is mounted
        onMounted(async () => {
            try {
                const { data } = await axios.get('permissions');
                formData.permissions = data;
            } catch (error) {
                console.error("Error fetching permissions:", error);
                errorMessage.value = "Failed to load permissions. Please try again later.";
            }
        });

        // Function to handle checkbox selection
        const select = (id: number, event: Event) => {
            const target = event.target as HTMLInputElement | null;
            if (target && target.checked) {
                selectedPermissions.value.push(id);
            } else {
                selectedPermissions.value = selectedPermissions.value.filter(p => p !== id);
            }
        };

        // Watch form data for validation
        watch([() => formData.name, selectedPermissions], () => {
            isFormValid.value = formData.name.length > 0 && selectedPermissions.value.length > 0;
        });

        // Form submission handler
        const submit = async () => {
            console.log('Form submitted with:', {
                name: formData.name,
                permissions: selectedPermissions.value
            });

            try {
                await axios.post('roles', { name: formData.name, permissions: selectedPermissions.value });
                await push('/roles');
            } catch (error) {
                console.error("Error creating role:", error);
                errorMessage.value = "Failed to create role. Please try again later.";
            }
        };

        return {
            formData,
            select,
            selectedPermissions,
            isFormValid,
            submit,
            errorMessage
        };
    }
};
</script>

<style scoped>
.btn-purple {
    background-color: #6f42c1; /* Replace with your preferred purple color */
    border-color: #6f42c1; /* Replace with your preferred purple border color */
}

.btn-purple:hover {
    background-color: #5a32a1; /* Darker shade for hover effect */
    border-color: #5a32a1; /* Darker border for hover effect */
}
</style>