<template>
  <div class="oer-page">
    <nav class="navbar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/faq">FAQ</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/selfDirected">Self-Directed Learning</a></li>
      </ul>
    </nav>
    <header class="oer-header">
      <h1>Other Useful OERs</h1>
      <p>
        Welcome to our collection of Other Useful Open Educational Resources (OERs)! This page aims to provide educators,
        students, and lifelong learners with a curated selection of valuable resources that extend beyond our primary
        offerings. Open Educational Resources are freely accessible and openly licensed materials that promote 
        collaborative learning and knowledge sharing. By utilizing these diverse resources, you can enhance your
        understanding of various subjects, discover innovative teaching methods, and access high-quality educational
        content. We encourage you to explore the links provided, engage with the materials, and embrace the opportunity
        to learn and grow. Together, we can create a more inclusive and accessible educational environment for all.
      </p>
    </header>

    <div class="search-bar">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search for resources..."
      />
    </div>

    <section class="oer-grid">
      <OERCard
        v-for="(oer, index) in filteredOERs"
        :key="index"
        :image="oer.image"
        :title="oer.title"
        :description="oer.description"
        :link="oer.link"
      />
    </section>
    <footer class="footer">
    <p>© 2024 Share2Teach. All Rights Reserved.</p>
    <p>Licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">Creative Commons BY-NC-SA 4.0</a></p>
</footer>
  </div>
</template>

<script>
import OERCard from '@/components/OERCard.vue';

export default {
  components: {
    OERCard
  },
  data() {
    return {
      searchQuery: '',
      oers: [
        {
          title: 'FreeCodeCamp',
          image: require('@/assets/fcc.png'),
          description:
            'An interactive learning platform offering coding tutorials and certifications in web development, data science, and more.',
          link: 'https://www.freecodecamp.org'
        },
        {
          title: 'CS50 by Harvard',
          image: require('@/assets/cs50.jpeg'), 
          description:
            'Harvard’s famous introductory computer science course covering algorithms, data structures, and programming basics.',
          link: 'https://cs50.harvard.edu'
        },
        {
          title: 'MIT OpenCourseWare',
          image: require('@/assets/mit.png'),
          description:
            'A vast repository of courses including AI, software engineering, and data science, accessible for free.',
          link: 'https://ocw.mit.edu'
        }
        
      ]
    };
  },
  computed: {
    filteredOERs() {
      return this.oers.filter((oer) =>
        oer.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>

.navbar {
  background-color: #12b12c;
  padding: 10px 0;
  margin-bottom: 20px;
}

.navbar ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  padding: 0;
}

.navbar li {
  margin: 0 15px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 10px;
}

.navbar a:hover {
  background-color: purple;
  border-radius: 5px;
}

h1 {
  color: purple;
  font-size: 3rem; /* Adjusts the font size to make it larger */
  text-align: center;
  margin: 40px 0; /* Adds space above and below */
}
h2 {
    font-size: 2rem;
    color: #6a0dad;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 2rem;
    color: #6a0dad;
    margin-bottom: 20px;
  }

p {
  font-size: 1.2rem; /* Larger than default size */
  line-height: 1.6;  /* Spacing between lines */
  margin: 20px 0;    /* Space above and below paragraphs */
  color: #333;       /* Text color */
  text-align: left;  /* Align text to the left */
}
/* Container Styling */
.oer-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}

/* Header Styling */
.oer-header {
  text-align: center;
  color: #6a0dad;
  margin-bottom: 20px;
}

.search-bar {
  text-align: center;
  margin-bottom: 20px;
}

.search-bar input {
  padding: 10px;
  width: 80%;
  max-width: 500px;
  border: 2px solid #6a0dad;
  border-radius: 5px;
}

/* Grid Layout */
.oer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* Card Styling */
.oer-card {
  background-color: #ffffff;
  border: 2px solid #6a0dad;
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
  color: #28a745;
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
  background-color: #28a745;
  color: #ffffff;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.oer-card a:hover {
  background-color: #1e7c36;
}

.footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    background-color: #f3f3f3;
    border-top: 2px solid #6a0dad;
  }
  
  .footer a {
    color: #6a0dad;
    text-decoration: none;
    font-weight: bold;
  }
  
  .footer a:hover {
    text-decoration: underline;
  }
</style>

   