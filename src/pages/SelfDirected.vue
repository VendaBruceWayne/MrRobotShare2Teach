<template>
    <div class="self-directed-container">
     <nav class="navbar">
       <ul>
         <li><a href="/">Home</a></li>
         <li><a href="/faq">FAQ</a></li>
         <li><a href="/about">About Us</a></li>
         <li><a href="/oer">OER</a></li>
       </ul>
     </nav>
     <h1>Self-directed Learning</h1>
     <p>Welcome to the Self-Directed Learning page! This section is designed to empower you with the tools and resources
        needed to take charge of your own learning journey. Self-directed learning is all about setting your own goals,
        choosing the right materials, and learning at your own pace. Whether you’re a student, professional, or lifelong learner,
        this approach allows you to tailor your educational experience to suit your personal and professional growth.
       Explore the curated resources, tips, and activities provided to help you develop effective learning strategies
       and achieve your objectives. To further enhance your learning experience, buy the book by clicking on the book,
        and dive deeper into the world of self-directed education!
     </p>
     <div class="bookstore-images">
       <div v-for="store in bookstores" :key="store.id" class="store-card">
         <img :src="store.image" :alt="store.name" @click="redirectToStore(store.url)" class="store-image" />
         <p>{{ store.name }}</p>
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
   data() {
     return {
       bookstores: [
         // First row
         {
           id: 1,
           name: 'The Pragmatic Programmer, Andrew Hunt',
           url: 'https://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X',
           image: require('@/assets/andrewHunt.jpg'), // Replace with actual image path
         },
         {
           id: 2,
           name: 'Dont Make me Think, Steve Krug',
           url: 'https://sensible.com/dont-make-me-think/',
           image: require('@/assets/steveKrug.jpg'), // Replace with actual image path
         },
         {
           id: 3,
           name: 'Coders At Work, Peter Seibel',
           url: 'https://codersatwork.com/',
           image: require('@/assets/codersAtWork.jpg'), // Replace with actual image path
         },
         {
           id: 4,
           name: 'the Mythical Man-Month, Frederick P. Brooks, Jr',
           url: 'https://www.amazon.com/Mythical-Man-Month-Software-Engineering-Anniversary/dp/0201835959',
           image: require('@/assets/mythical.jpg'), // Replace with actual image path
         },
         // Second row
         {
           id: 5,
           name: 'Code Complete, Steve McConnell',
           url: 'https://www.amazon.com/Code-Complete-Practical-Handbook-Construction/dp/0735619670',
           image: require('@/assets/complete.jpg'), // Replace with actual image path
         },
         {
           id: 6,
           name: 'Cracking the coding Interview, Gayle Laakmann McDowell',
           url: 'https://www.crackingthecodinginterview.com/',
           image: require('@/assets/cracking.jpg'), // Replace with actual image path
         },
         {
           id: 7,
           name: 'Soft Skills: The Software Developers Life Manual, John Z. Sonmez',
           url: 'https://www.amazon.com/Soft-Skills-software-developers-manual/dp/1617292397',
           image: require('@/assets/softSkills.jpg'), // Replace with actual image path
         },
         {
           id: 8,
           name: 'Zen and the Art of Motorcycle Maintenance, Robert M. Pirsig',
           url: 'https://www.amazon.com/Zen-Art-Motorcycle-Maintenance-Inquiry/dp/0060589469',
           image: require('@/assets/zen.jpg'), // Replace with actual image path
         },
         // Third row
         {
           id: 9,
           name: 'Clean Code, Robert C. Martin',
           url: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882',
           image: require('@/assets/cleanCode.jpg'), // Replace with actual image path
         },
         {
           id: 10,
           name: 'Continuous Delivery, Jez Humble, David Farley',
           url: 'https://www.amazon.com/Continuous-Delivery-Deployment-Automation-Addison-Wesley/dp/0321601912',
           image: require('@/assets/continuousDelivery.jpg'), // Replace with actual image path
         },
         {
           id: 11,
           name: 'Working Effectively with Legacy Code, Michael  C. Feathers',
           url: 'https://www.amazon.com/Working-Effectively-Legacy-Michael-Feathers/dp/0131177052',
           image: require('@/assets/legacyCode.jpg'), // Replace with actual image path
         },
         {
           id: 12,
           name: 'Code: The Hidden Language of Computer Hardware and Software, Charles Petzold',
           url: 'https://www.amazon.com/Code-Language-Computer-Hardware-Software/dp/0735611319',
           image: require('@/assets/charlesPet.jpg'), // Replace with actual image path
         },
         // Fourth row
         {
           id: 13,
           name: 'Programming Pearls, Jon Bentley',
           url: 'https://www.amazon.com/Programming-Pearls-2nd-Jon-Bentley/dp/0201657880',
           image: require('@/assets/pearls.jpg'), // Replace with actual image path
         },
         {
           id: 14,
           name: 'Introduction to Algorithms, Thomas H. Cormen, Charles E. Leiserson',
           url: 'https://mitpress.mit.edu/9780262530910/introduction-to-algorithms/',
           image: require('@/assets/introtoalgo.jpg'), // Replace with actual image path
         },
         {
           id: 15,
           name: 'Structure and Interpretation of Computer Programs, Harold Abelson ',
           url: 'https://www.amazon.com/Structure-Interpretation-Computer-Programs-Engineering/dp/0262510871',
           image: require('@/assets/structureInterpretation.jpg'), // Replace with actual image path
         },
         {
           id: 16,
           name: 'Inside the Machine: An Illustrated Introduction to Microprocessors and Computer Architecture, Jon Stokes',
           url: 'https://www.amazon.com/Inside-Machine-Introduction-Microprocessors-Architecture-dp-1593276680/dp/1593276680/ref=as_li_ss_tl?_encoding=UTF8&me=&qid=1548845963&linkCode=sl1&tag=sdm05-20&linkId=55f39ffa2b00c0e78acecda74c239527&language=en_US',
           image: require('@/assets/insideTheMachine.jpg'), // Replace with actual image path
         },
         // Fifth row
         {
           id: 17,
           name: 'The Complete Software Developers Career Guide, John Sonmez',
           url: 'https://www.amazon.com/Complete-Software-Developers-Career-Guide/dp/0999081411/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=',
           image: require('@/assets/softwaredevguide.jpg'), // Replace with actual image path
         },
         {
           id: 18,
           name: ' The Managers Path: A Guide for Tech Leaders Navigating Growth and Change, Camille Fournier',
           url: 'https://www.amazon.com/Managers-Path-Leaders-Navigating-Growth/dp/1491973897/ref=zg_bs_3839_50?_encoding=UTF8&psc=1&refRID=FRHTT2EFFVJ3DXQ589CF',
           image: require('@/assets/managerpath.jpg'), // Replace with actual image path
         },
         {
           id: 19,
           name: 'Grokking Algorithms: An Illustrated Guide for Programmers and Curious People, Aditya Y. Bhargava',
           url: 'https://www.manning.com/books/grokking-algorithms',
           image: require('@/assets/grokking.jpg'), // Replace with actual image path
         },
       ],
     };
   },
   methods: {
     redirectToStore(url: string) {
       window.open(url, '_blank');
     },
   },
 };
 </script>
 
 <style scoped>
 .self-directed-container {
   text-align: center;
   margin: 20px;
   color: #333;
   background-color: #f9f9f9; 
   padding: 20px;
   border-radius: 8px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
 }
 
 .navbar {
   background-color: #6a0dad;
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
 
 p {
   font-size: 1.2rem; /* Larger than default size */
   line-height: 1.6;  /* Spacing between lines */
   margin: 20px 0;    /* Space above and below paragraphs */
   color: #333;       /* Text color */
   text-align: left;  /* Align text to the left */
 }
 
 .bookstore-images {
   display: flex;
   justify-content: space-around;
   flex-wrap: wrap;
   gap: 20px;
 }
 
 .store-card {
   width: 200px;
   text-align: center;
   cursor: pointer;
   transition: transform 0.2s;
   border: 1px solid purple; /* Purple border for store cards */
   border-radius: 8px;
   padding: 10px;
   background-color: #fff; /* White background for cards */
 }
 
 .store-card:hover {
   transform: scale(1.05);
   box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Shadow effect on hover */
 }
 
 .store-image {
   width: 100%;
   height: auto;
   border-radius: 8px;
   margin-bottom: 10px;
 }
 
 .store-card p {
   color: #6a0dad;
   font-weight: bold;
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
 