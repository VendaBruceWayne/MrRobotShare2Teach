import express from 'express';
import sequelize from './config/database'; // Sequelize instance
import { Faq } from './models/Faq'; // Model import
import faqRouter from './routes/faqRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', faqRouter);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    return sequelize.sync({ force: false });  // Sync all models
  })
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', (req, res) => {
  res.send('FAQ API is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
