import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import sequelize  from './config/database';  // Assuming this file exports your Sequelize connection
import  faqRoutes  from './routes/faqRoutes';

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/faqs', faqRoutes);

// Database Connection
sequelize.sync()
  .then(() => console.log('Database synced!'))
  .catch(err => console.log('Error syncing database: ', err));

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
