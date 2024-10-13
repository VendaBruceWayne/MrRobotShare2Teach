<template>
  <div>
    <NavBar />
    <div class="container-fluid">
      <div class="row">
        <SideMenu />
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavBar from "@/components/NavBar.vue";
import SideMenu from "@/components/SideMenu.vue";
import { onMounted } from "vue";
import axios from "axios";

export default {
  name: "WrapperPage",
  components: {
    NavBar,
    SideMenu
  },
  setup() {
    onMounted(async () => {
      try {
        const { data } = await axios.get('user', { withCredentials: true });
        console.log(data);
      } catch (e) {
        console.error("Error fetching user data:", e);
      }
    });

    return {};
  }
};
</script>
