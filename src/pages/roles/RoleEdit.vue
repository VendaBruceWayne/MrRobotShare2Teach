<template>
    <div class="container mt-5">
        <h2 class="text-center">Edit Role</h2>
        <form @submit.prevent="submit">
            <!-- Name Field -->
            <div class="mb-3 mt-3 row">
                <label class="col-sm-2 col-form-label">Name</label>
                <div class="col-sm-10">
                    <input v-model="formData.name" class="form-control" name="name" required />
                </div>
            </div>

            <!-- Permissions Checkboxes -->
            <div class="mb-3">
                <label class="col-sm-2 col-form-label">Permissions</label>
                <div class="row">
                    <div class="col-md-4" v-for="permission in allPermissions" :key="permission.id">
                        <div class="form-check">
                            <input 
                                class="form-check-input" 
                                type="checkbox" 
                                :value="permission.id" 
                                :checked="isSelected(permission.id)"
                                @change="select(permission.id, $event)"
                            />
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
import { useRouter, useRoute } from 'vue-router';

// Define the Permission interface
interface Permission {
    id: number;
    name: string;
}

export default {
    name: "RoleEdit",
    setup() {
        const { push } = useRouter();
        const { params } = useRoute();

        // Reactive form data
        const formData = reactive({
            name: '',
            permissions: [] as number[]
        });

        const selectedPermissions = ref<number[]>([]); // Store selected permission IDs
        const isFormValid = ref(false); // Form validation flag
        const errorMessage = ref<string | null>(null); // Error message
        const allPermissions = ref<Permission[]>([]); // Store all permissions

        // Fetch permissions and role data when the component is mounted
        onMounted(async () => {
            try {
                const permissionsResponse = await axios.get<Permission[]>('permissions');
                allPermissions.value = permissionsResponse.data;

                const response = await axios.get(`roles/${params.id}`);
                formData.name = response.data.name;

                // Set the selected permissions
                selectedPermissions.value = response.data.permissions.map((perm: { id: number }) => perm.id);
            } catch (error) {
                console.error("Error fetching permissions or role data:", error);
                errorMessage.value = "Failed to load data. Please try again later.";
            }
        });

        // Function to handle checkbox selection
        const select = (id: number, event: Event) => {
            const target = event.target as HTMLInputElement;
            if (target.checked) {
                // Add permission if checked
                if (!selectedPermissions.value.includes(id)) {
                    selectedPermissions.value.push(id);
                }
            } else {
                // Remove permission if unchecked
                selectedPermissions.value = selectedPermissions.value.filter(p => p !== id);
            }
        };

        // Check if permission is selected
        const isSelected = (id: number) => {
            return selectedPermissions.value.includes(id);
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
                await axios.put(`roles/${params.id}`, { name: formData.name, permissions: selectedPermissions.value });
                await push('/roles');
            } catch (error) {
                console.error("Error updating role:", error);
                errorMessage.value = "Failed to update role. Please try again later.";
            }
        };

        return {
            formData,
            select,
            selectedPermissions,
            isFormValid,
            submit,
            errorMessage,
            allPermissions,
            isSelected
        };
    }
};
</script>

<style scoped>
.btn-purple {
    background-color: purple;
    color: white;
}
</style>
