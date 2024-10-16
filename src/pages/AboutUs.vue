<template>
    <div class="about-us">
        <nav class="navbar">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/self">Self-Directed Learning</a></li>
                <li><a href="/oer">OER</a></li>
            </ul>
        </nav>
        <div class="container">
            <section class="section">
                <h1 class="title">About Us</h1>
                <h2 class="subtitle is-4">Welcome to Share2Teach</h2>
                <p>
                    Share2Teach is an innovative platform designed to transform the way
                    educators and learners access and share educational resources. Developed by a team 
                    of four passionate Information Technology students currently in their third year, 
                    Share2Teach is a product of creativity, collaboration, and a shared vision for 
                    enhancing education.
                </p>
                <h2 class="subtitle is-4">Our Story</h2>
                <p>
                    Share2Teach was born out of a project assigned to our development team during our 
                    third year of study. As aspiring developers, we were tasked with creating a platform
                    that could make a real impact in the educational field. We envisioned a space where 
                    educators and learners could freely share, access, and collaborate on a variety of resources, 
                    making quality education accessible to all.
                </p>
                <h2 class="subtitle is-4">Our Team</h2>
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
                <h2 class="subtitle is-4">Meet the Developers</h2>
                <div class="columns is-multiline">
                    <div class="column is-full" v-for="designer in designers" :key="designer.id">
                        <div class="card designer-hover">
                            <div class="card-content designer-layout">
                                <img :src="designer.image" :alt="designer.name" class="designer-image" />
                                <div class="designer-info">
                                    <h3 class="designer-name">{{ designer.name }}</h3>
                                    <h3 class="designer-role">{{ designer.role }}</h3>
                                    <p class="designer-bio">
                                      {{ designer.showFullBio ? designer.bio : designer.bio.slice(0, 100) + '...' }}
                                    </p>
                                    <button @click="designer.showFullBio = !designer.showFullBio" class="read-more-btn">
                                      {{ designer.showFullBio ? 'Show Less' : 'Read More' }}
                                    </button>
                                </div>
                            </div>
                        </div>
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
        </div>

        <footer class="footer">
            <p>© 2024 Share2Teach. All Rights Reserved.</p>
            <p>Licensed under <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">Creative Commons BY-NC-SA 4.0</a></p>
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
            name: 'Tambani Ramahala',
            role: 'Group Leader and Full Stack Developer',
            bio: 'Ndaa',
            image: require('@/assets/tambani.jpg'),
            showFullBio: false
          },
          {
            id: 2,
            name: 'Denver Saurombe',
            role: 'Full Stack Developer | DevOps',
            bio: 'Passionate about technology and currently studying IT. I enjoy learning new tech trends and applying innovative solutions to real-world problems. As one of the developers on the Share2Teach app, I worked mainly on the back end developing APIs, handling file storage, and containerization of the project. I have gained valuable experiences and learned a lot during the development of this app and hope to continue to contribute to the advancement of technology.', 
            image: require('@/assets/denver.jpg'),
            showFullBio: false
          },
          {
            id: 3,
            name: 'Mutshidzi Nethengwe',
            role: 'Database Administrator | Full Stack Developer',
            bio: 'Ever since I was young, even from a technologically disadvantaged background, I have always thrived to be part of any technological advancement and development. This became possible through the opportunity which was handed to me by the North West University, under the Faculty of Natural and Agricultural Sciences in the school of Computer Science and Information Systems. It gave me a chance to be part of an IT Development project called Share2Teach that sparked the start of my future career of being either a Software Developer, Full Stack Developer or a Database Administrator. The passion I have for Information Technology is just so vast and fascinating, words will never do me enough justice and that is why I have a lot of career options in the IT sector. The most valuable skills I have in languages like c#, c++, python, TypeScript and HTML helped me to get this far as an IT student',
            image: require('@/assets/mike.jpg'),
            showFullBio: false
          },
          {
            id: 4,
            name: 'Nzumbululo Mphara',
            role: 'Full Stack Developer | Designer',
            bio: 'Im a dedicated 3rd-year Information Technology student at North West University, specializing in full stack development and web design. My passion for technology has driven me to master multiple programming languages, including C#, Java, C++, Python, and TypeScript. I have experience building responsive and visually appealing web applications using frameworks such as Vue.js and Flask, as well as leveraging cloud services like AWS.As a developer on the Share2Teach project, I focus on creating functional and aesthetically pleasing designs that enhance user interaction and accessibility. I work closely with my team to build a robust platform that empowers educators and students with open educational resources, ensuring that our system is intuitive and efficient for all users. Beyond development, I am committed to learning about emerging technologies and enhancing my skills to create impactful solutions. My goal is to bridge the gap between education and technology, making learning more accessible and engaging for everyone.',
            image: require('@/assets/nzu.jpg'),
            showFullBio: false
          }
        ]
      };
    },
    methods: {
      redirectToGoogleForm() {
        try {
          window.location.href = 'https://forms.gle/fFfRDCG6NvF5MZMH9';
        } catch (error) {
          console.error('Error redirecting to feedback form:', error);
          alert('An error occurred while redirecting. Please try again later.');
        }
      },
    },
  };
</script>

<style scoped>
.navbar {
  background-color: #6f42c1;
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

.about-us {
  text-align: center;
  margin: 20px;
  color: #fff;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(9, 44, 4, 0.1);
}

h1, h2 {
  color: #6a0dad;
  margin: 40px 0;
}

h2 {
  font-size: 2rem;
}

p {
  font-size: 1.2rem;
  line-height: 1.6;
  margin: 20px 0;
  color: #eee;
  text-align: left;
}

.designers {
  margin-top: 40px;
}

.columns.is-multiline .column.is-full {
  margin-bottom: 20px;
}

.designer-layout {
  display: flex;
  align-items: center;
  background-color: #444;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.designer-layout:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 20px rgba(128, 0, 128, 0.7); /* Purple glow effect */
}

.designer-image {
  max-width: 150px;
  border-radius: 50%;
  margin-right: 20px;
}

.designer-info {
  text-align: left;
}

.designer-name, .designer-role {
  color: white;
}

.designer-bio {
  color: white;
}

.read-more-btn {
  color: white;
  background-color: purple;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.evaluation-container {
  margin-top: 50px;
}

.evaluation-footer {
  background-color: #444;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

.evaluation-footer button {
  background-color: purple;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.evaluation-footer button:hover {
  background-color: #6f42c1;
}

footer {
  margin-top: 50px;
  color: white;
}

footer a {
  color: #6f42c1;
}
</style>
