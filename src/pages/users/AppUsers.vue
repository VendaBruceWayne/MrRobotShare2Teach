<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/users/create" class="custom-button add-button">
      Add User
    </router-link>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search users..."
      class="form-control mb-3"
    />
  </div>
  <div class="table-container">
    <div class="table-responsive">
      <table ref="userTable" class="table table-striped table-sm">
        <thead>
          <tr>
            <th scope="col">#User ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.first_name }} {{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.role || 'No Role' }}</td>
            <td>
              <router-link :to="`/users/${user.id}/edit`" class="custom-button edit-button">Edit</router-link>    
              <button @click="confirmDeleteUser(user.id)" class="custom-button delete-button">Delete</button>
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
import { useRouter } from 'vue-router';

interface UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
}

export default {
  name: "AppUsers",
  setup() {
    const users = ref<UserInterface[]>([]);
    const page = ref(1);
    const last_page = ref(1);
    const searchQuery = ref(""); // Search query state
    const router = useRouter();
    
    // Ref for userTable
    const userTable = ref<HTMLElement | null>(null); // Explicitly typed

    const loadUsers = async () => {
      try {
        const { data } = await axios.get(`/users?page=${page.value}`);
        users.value = data.data;
        last_page.value = data.meta.last_page;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const confirmDeleteUser = (id: number) => {
      if (confirm("Are you sure you want to delete this user?")) {
        deleteUser(id);
      }
    };

    const deleteUser = async (id: number) => {
      try {
        await axios.delete(`/users/${id}`);
        users.value = users.value.filter(user => user.id !== id);
        await loadUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    };

    const goToPreviousPage = () => {
      if (page.value > 1) {
        page.value--;
      }
    };

    const goToNextPage = () => {
      if (page.value < last_page.value) {
        page.value++;
      }
    };

    const filteredUsers = computed(() => {
      return users.value.filter(user =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        (user.role && user.role.toLowerCase().includes(searchQuery.value.toLowerCase()))
      );
    });

    // Function to search within table rows
    const searchByTag = () => {
  const query = searchQuery.value.toLowerCase();
  
  if (userTable.value) {
    const rows = userTable.value.querySelectorAll('tbody tr'); // Get table rows
    
    rows.forEach((row) => {
      // Ensure that row is an HTMLElement
      const htmlRow = row as HTMLElement;
      const textContent = htmlRow.textContent?.toLowerCase() || "";
      
      if (textContent.includes(query)) {
        htmlRow.style.display = ""; // Show row if it matches
      } else {
        htmlRow.style.display = "none"; // Hide row if it doesn't match
      }
    });
  }
};


    onMounted(loadUsers);
    watch(page, loadUsers);

    return {
      users,
      page,
      last_page,
      searchQuery,
      filteredUsers,
      confirmDeleteUser,
      goToPreviousPage,
      goToNextPage,
      userTable, // Return the table ref
      searchByTag, // Return the search function
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
</style>
