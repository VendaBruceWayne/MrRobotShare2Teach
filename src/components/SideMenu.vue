<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link to="/" active-class="active" class="nav-link">
            Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/users" active-class="active" class="nav-link">
            Users
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "SideMenu",
};
</script>

<style scoped>
.nav-link {
  color: black; /* Default color for inactive links */
}

.nav-link.active {
  color: purple; /* Color for active link */
}

/* Optional: Change the color on hover */
.nav-link:hover {
  color: darkgray; /* Change to a desired hover color */
}
</style>
