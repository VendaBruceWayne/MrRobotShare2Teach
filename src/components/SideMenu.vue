<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <!-- Existing links -->
        <div class="mb-3">
                <label> </label>
            </div>
        <li class="nav-item">
          <router-link to="/ " active-class="active" class="nav-link">
            Dashboard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/users" active-class="active" class="nav-link">
            Users
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/roles" active-class="active" class="nav-link">
            Roles
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/resources" active-class="active" class="nav-link">
            Resources
          </router-link>
        </li>
        <!-- Newly added links -->
        <li class="nav-item">
          <router-link to="/about" active-class="active" class="nav-link">
            Help and Info
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
/* Default link style */
.nav-link {
  color: white; /* Default text color */
  padding: 10px 20px;
  transition: color 0.3s ease, box-shadow 0.3s ease;
  border-radius: 5px; /* Rounded corners for links */
  font-weight: 500;
  margin-bottom: 10px; /* Spacing between items */
}

/* Active link style */
.nav-link.active {
  color: purple; /* Color for active link */
  background-color: #282c34; /* Active link background for contrast */
  box-shadow: 0px 0px 15px rgba(128, 0, 128, 0.7); /* Add a purple glow */
}

/* Hover effect for inactive links */
.nav-link:hover {
  color: lightgray;
  box-shadow: 0px 0px 15px rgba(255, 255, 255, 0.3); /* Subtle white glow on hover */
  transform: scale(1.02); /* Slight scale effect */
}

/* Optional: Make the active link visually distinct */
.nav-link.active:hover {
  color: white;
  transform: scale(1.05);
}

/* Make the design more neat and readable */
.nav-item {
  margin-bottom: 10px;
}

.nav {
  padding-left: 0;
}

.sidebar {
  background-color: #20232a; /* Dark sidebar background */
  padding-top: 1rem;
}
</style>
