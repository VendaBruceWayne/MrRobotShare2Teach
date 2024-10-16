<template>
    <div class="oer-card">
      <img :src="image" :alt="title" />
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
      <a :href="link" target="_blank">Visit</a>
    </div>
</template>
  
  <script>
  export default {
    props: {
      image: String,
      title: String,
      description: String,
      link: String
    }
  };
  </script>
  
  <style scoped>
  /* Card Specific Styling */
  .oer-card {
    background-color: #ffffff;
    border: 2px solid #6a0dad; /* Purple border */
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    transition: transform 0.2s;
  }
  
  .oer-card:hover {
    transform: scale(1.05);
  }
  
  .oer-card img {
    width: 100%;
    border-radius: 6px;
  }
  
  .oer-card h3 {
    color: #6a0dad; /* Purple text */
    margin: 15px 0 10px;
  }
  
  .oer-card p {
    color: #333;
    font-size: 14px;
  }
  
  .oer-card a {
    display: inline-block;
    margin-top: 10px;
    padding: 10px 15px;
    background-color: #6a0dad; /* Purple background */
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .oer-card a:hover {
    background-color: #5a0c9c; /* Darker purple on hover */
  }
  </style>
  