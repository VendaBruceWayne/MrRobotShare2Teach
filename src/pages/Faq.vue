<template>
    <div class="faq">
      <nav class="navbar">
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About Us</a></li>
        <li><a href="/self">Self-Directed Learning</a></li>
        <li><a href="/oer">OER</a></li>
      </ul>
    </nav>
      <div class="container">
        <section class="section">
          <h1 class="title">FAQ</h1>
          <h2 class="subtitle is-4">Frequently Asked Questions about Share2Teach</h2>
  
          <div class="columns" v-if="faqs.length">
            <div class="column is-one-third" v-for="faq in faqs" :key="faq.id">
              <div class="card">
                <div class="card-content">
                  <h3 class="title">{{ faq.question }}</h3>
                  <p class="answer">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <p>No FAQs available at the moment. Please check back later.</p>
          </div>
        </section>
      </div>
      <footer class="footer">
       <p>© 2024 Share2Teach. All Rights Reserved.</p>
       <p>Licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">Creative Commons BY-NC-SA 4.0</a></p>
       </footer>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'FAQ',
    data() {
      return {
        faqs: [],
        errors: []
      };
    },
    created() {
      axios.get('http://localhost:3000/api/faqs')
        .then(response => {
          if (response.data && response.data.length) {
            this.faqs = response.data; // Ensure that the API returns the data in the expected format
          }
        })
        .catch(e => {
          console.error('Error fetching FAQs:', e);
          this.errors.push(e);
        });
    }
  }
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
  text-align: left;
  margin: 40px 0; /* Adds space above and below */
}

h2 {
  color: purple;
  font-size: 2rem; /* Adjusts the font size to make it larger */
  text-align: left;
  margin: 40px 0; /* Adds space above and below */
}

p {
  font-size: 1.2rem; /* Larger than default size */
  line-height: 1.6;  /* Spacing between lines */
  margin: 20px 0;    /* Space above and below paragraphs */
  color: #333;       /* Text color */
  text-align: left;  /* Align text to the left */
}

  .faq {
    text-align: center;
    margin: 20px;
    color: #333;
    background-color: #f9f9f9; 
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(9, 44, 4, 0.1);
  }
  
  .answer {
    margin-top: 10px;
    color: purple;
  }
  
  .columns {
    flex-wrap: wrap;
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
  