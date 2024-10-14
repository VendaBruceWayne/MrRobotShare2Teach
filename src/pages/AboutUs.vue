<template>
    <div class="about-us">
      <header class="header">
        <h1>About Us</h1>
      </header>
      
      <section class="content">
        <p>
            Welcome to Share2Teach, an innovative platform designed to transform the way
            educators and learners access and share educational resources. Developed by a team 
            of four passionate Information Technology students currently in their third year, 
            Share2Teach is a product of creativity, collaboration, and a shared vision for 
            enhancing education. 
        </p>
        <h2>Our Story</h2>
        <p>
            Share2Teach was born out of a project assigned to our development team during our 
            third year of study. As aspiring developers, we were tasked with creating a platform
             that could make a real impact in the educational field. We envisioned a space where 
             educators and learners could freely share, access, and collaborate on a variety of resources, 
             making quality education accessible to all.
        </p>
        <h3>Our Team</h3>
        <p>
            Our team of four developers worked together on every aspect of Share2Teach, 
            combining our skills and knowledge to build a cohesive and functional platform. 
            Each of us contributed to the frontend, backend, database management, 
            and overall project coordination, ensuring that every feature and functionality
            was developed through a unified effort. This approach allowed us to learn from one another
            and refine our skills as we tackled challenges together.
        </p>
      </section>
  
      <section class="designers">
        <h2>Meet the Developers</h2>
        <div class="designer" v-for="designer in designers" :key="designer.id">
          <img :src="designer.image" :alt="designer.name" />
          <div class="designer-info">
            <h3>{{ designer.name }}</h3>
            <p>{{ designer.role }}</p>
            <p>{{ designer.bio }}</p>
          </div>
        </div>
      </section>

      <div class="evaluation-container">
    <div class="evaluation-footer">
      <h3>Evaluation Form</h3>
      <p>Help us improve and celebrate excellence by sharing your feedback</p>
      <button @click="redirectToGoogleForm">Give Feedback</button>
    </div>
  </div>

  
      <footer class="footer">
        <p>© 2024 Share2Teach. All Rights Reserved.</p>
        <a href="http://localhost:3000" target="_blank">Visit Our Main Platform</a>
      </footer>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'AboutUs',
    data() {
      return {
        designers: [
          {
            id: 1,
            name: 'Tambani Ramala',
            role: 'Group Leader and Full stack developer',
            image: require('@/assets/tambani.jpg') // Replace with actual image path or URL
          },
          {
            id: 2,
            name: 'Denver Saurombe',
            role: 'Full stack developer',
            image: require('@/assets/denver.jpg') // Replace with actual image path or URL
          },
          {
            id: 3,
            name: 'Mutshidzi Nethengwe',
            role: 'Database Administrator',
            bio: 'Full stack developer',
            image: require('@/assets/mike.jpg') // Replace with actual image path or URL
          },
          {
            id: 4,
            name: 'Nzumbululo Mphara',
            role: 'Full stack developer',
            image: require('@/assets/nzu.jpg') // Replace with actual image path or URL
          }
        ]
      };
    },
    methods: {
      redirectToGoogleForm() {
        window.location.href = 'https://forms.gle/fFfRDCG6NvF5MZMH9'; // Google Form URL
      },
    },
  };
  </script>
  
  <style scoped>
  .about-us-container {
  text-align: left;
  margin: 20px;
  }

  .about-us {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  .header {
    background-color: #6a0dad; /* Purple color */
    color: #fff;
    padding: 20px;
    text-align: center;
    border-radius: 8px;
  }
  
  .header h1 {
    margin: 0;
    font-size: 2.5rem;
  }
  
  .content p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }
  
  .designers {
    margin-top: 40px;
  }
  
  .designers h2 {
    font-size: 2rem;
    color: #6a0dad;
    margin-bottom: 20px;
  }
  
  .designer {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
  }
  
  .designer img {
    border-radius: 50%;
    margin-right: 20px;
    width: 150px;
    height: 150px;
  }
  
  .designer-info h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #6a0dad;
  }
  
  .designer-info p {
    margin: 5px 0;
    font-size: 1rem;
    color: #555;
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

.evaluation-container {
  background-color: #f0f0f0; /* Light gray background */
  padding: 20px;
  border-radius: 8px; /* Optional: rounded corners */
}

.evaluation-footer {
  text-align: left;
}

.evaluation-footer h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
}

.evaluation-footer p {
  margin-bottom: 15px;
  color: #666;
}

.evaluation-footer button {
  padding: 10px 20px;
  background-color: #6a0dad; /* Purple color for the button */
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.evaluation-footer button:hover {
  background-color: #5a0cba; /* Darker purple on hover */
}
  </style>
  