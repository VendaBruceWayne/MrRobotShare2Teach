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
  
          <div class="columns is-multiline">
            <div class="column is-one-third" v-for="faq in faqs" :key="faq.id">
              <div class="card">
                <div class="card-content">
                  <h3 class="faq-question">{{ faq.question }}</h3>
                  <p class="answer">{{ faq.answer }}</p>
                </div>
              </div>
            </div>
          </div>
  
          <div v-if="faqs.length === 0">
            <p>No FAQs available at the moment. Please check back later.</p>
          </div>
        </section>
  
        <!-- Conditionally display form based on user role -->
        <section class="add-faq-section" v-if="isAdminOrModerator">
          <h2 class="subtitle is-4">Add a New FAQ</h2>
          <form @submit.prevent="addFAQ">
            <div class="field">
              <label class="label">Question</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  v-model="newFaq.question"
                  placeholder="Enter your question"
                  required
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Answer</label>
              <div class="control">
                <textarea
                  class="textarea"
                  v-model="newFaq.answer"
                  placeholder="Enter the answer"
                  required
                ></textarea>
              </div>
            </div>
            <div class="control">
              <button class="button is-primary" type="submit">Add FAQ</button>
            </div>
          </form>
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
    name: 'FaqPage',
    data() {
      return {
        faqs: [],
        newFaq: {
          question: '',
          answer: ''
        },
        user: {
          role: '' // This should be dynamically fetched from your backend. Default is 'user'.
        },
        errors: []
      };
    },
    created() {
      this.fetchFaqs();
      this.fetchUser(); // Call this to get user role from backend
    },
    computed: {
      isAdminOrModerator() {
        return this.user.role.name === 'Admin' || this.user.role === 'Moderator';
      }
    },
    methods: {
      async fetchFaqs() {
        try {
          const response = await axios.get('faqs');
          if (response.data && Array.isArray(response.data)) {
            this.faqs = response.data;
          } else {
            console.warn('Unexpected response format:', response);
          }
        } catch (error) {
          console.error('Error fetching FAQs:', error);
          this.errors.push(error.message || 'Failed to fetch FAQs.');
        }
      },
      async fetchUser() {
        // Fetch the logged-in user's role (e.g., from an API or Vuex store)
        try {
          const response = await axios.get('user');
          this.user = response.data; // Update user object with actual data
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      },
      async addFAQ() {
        try {
          const response = await axios.post('faqs', this.newFaq);
          this.faqs.push(response.data); // Add the new FAQ to the local state
          this.newFaq = { question: '', answer: '' }; // Reset the form fields
        } catch (error) {
          console.error('Error adding FAQ:', error);
          this.errors.push(error.message || 'Failed to add FAQ.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Bulma-based styles */
  .navbar {
    background-color: #6f42c1;
    padding: 1rem;
    margin-bottom: 2rem;
  }
  
  .navbar ul {
    display: flex;
    justify-content: center;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .navbar li {
    margin: 0 1.5rem;
  }
  
  .navbar a {
    color: #fff;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s;
  }
  
  .navbar a:hover {
    background-color: #550099;
    border-radius: 5px;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .section {
    padding: 3rem 1.5rem;
  }
  
  .title {
    color: #6f42c1;
    font-size: 2.5rem;
    text-align: center;
  }
  
  .subtitle {
    color: #550099;
    text-align: center;
    margin-bottom: 2rem;
  }
  
  .columns {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .column {
    flex: 0 0 30%;
    margin: 1rem;
  }
  
  .card {
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .faq-question {
    font-weight: bold;
    color: #6f42c1;
    margin-bottom: 0.5rem;
  }
  
  .answer {
    margin-top: 0.5rem;
    color: #550099;
  }
  
  /* Styles for the FAQ form */
  .add-faq-section {
    background-color: #f9f9f9;
    padding: 2rem 1.5rem;
    border-top: 3px solid #550099;
    margin-top: 2rem;
  }
  
  .add-faq-section h2 {
    text-align: center;
    color: #6f42c1;
    margin-bottom: 1.5rem;
  }
  
  .field {
    margin-bottom: 1.5rem;
  }
  
  .input,
  .textarea {
    border: 2px solid #6f42c1;
    border-radius: 5px;
    font-size: 1rem;
  }
  
  .input:focus,
  .textarea:focus {
    border-color: #550099;
    box-shadow: 0 0 5px rgba(85, 0, 153, 0.3);
  }
  
  .button.is-primary {
    background-color: #6f42c1;
    border: none;
    transition: background-color 0.3s;
  }
  
  .button.is-primary:hover {
    background-color: #550099;
  }
  
  .footer {
    background-color: #6f42c1;
    color: #fff;
    text-align: center;
    padding: 2rem 1rem;
    border-top: 3px solid #550099;
  }
  
  .footer a {
    color: #fff;
    font-weight: bold;
    text-decoration: none;
  }
  
  .footer a:hover {
    text-decoration: underline;
  }
  </style>
  