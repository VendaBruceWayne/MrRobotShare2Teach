import express from 'express';
import sequelize from './config/database';
import { Faq } from './models/Faq';
import faqRouter from './routes/faqRoutes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware before routes
app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000","http://localhost:8080"]
}));

app.use(express.json());

// Set up routes
app.use('/api', faqRouter);

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established');
    return sequelize.sync({ force: true });
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
