<template>
    <h3>Account Information</h3>
    <form @submit.prevent="infoSubmit">
      <div class="mb-3">
        <label>First Name</label>
        <input v-model="infoData.first_name" class="form-control" name="first_name" />
      </div>
      <div class="mb-3">
        <label>Last Name</label>
        <input v-model="infoData.last_name" class="form-control" name="last_name" />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="infoData.email" class="form-control" name="email" />
      </div>
      <button class="btn" style="background-color: purple; color: white;">Save</button>
    </form>

    <h3 class="mt-4">Change Password</h3>
    <form @submit.prevent="passwordSubmit">
      <div class="mb-3">
        <label>Password</label>
        <input v-model="passwordData.password" type="password" class="form-control" name="password" />
      </div>
      <div class="mb-3">
        <label>Password Confirm</label>
        <input v-model="passwordData.password_confirm" type="password" class="form-control" name="password_confirm" />
      </div>
      <button class="btn" style="background-color: purple; color: white;">Save</button>
    </form>
</template>

<script lang="ts">
import { reactive, onMounted } from 'vue'; 
import axios from 'axios';

export default {
    name: "UserProfile", 
    setup() {
        const infoData = reactive({
            first_name: '', 
            last_name: '', 
            email: ''
        }); 

        const passwordData = reactive({
            password: '', 
            password_confirm: ''  // Fixed typo: 'password_confrim' -> 'password_confirm'
        }); 

        onMounted(async () => {
            try {
                const { data } = await axios.get('user'); 
                infoData.first_name = data.first_name;
                infoData.last_name = data.last_name;
                infoData.email = data.email;
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        });

        const infoSubmit = async () => {
            try {
                await axios.put('users/info', infoData);
                alert('Account information updated successfully!');
            } catch (error) {
                console.error('Error updating account information:', error);
                alert('Failed to update account information. Please try again.');
            }
        }

        const passwordSubmit = async () => {
            try {
                await axios.put('users/password', passwordData);
                alert('Password changed successfully!');
            } catch (error) {
                console.error('Error changing password:', error);
                alert('Failed to change password. Please try again.');
            }
        }

        return {
            infoData,
            passwordData, 
            infoSubmit,
            passwordSubmit
        };
    },
}
</script>
