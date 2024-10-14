<template>
    <div class="faq">
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
  .faq {
    padding: 2em;
  }
  
  .answer {
    margin-top: 10px;
    color: purple;
  }
  
  .columns {
    flex-wrap: wrap;
  }
  </style>
  