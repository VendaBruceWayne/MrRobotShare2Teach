import express, { Application } from "express";
import sequelize from "./config/database";
import faqRoutes from "./routes/faqRoutes";

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", faqRoutes);

sequelize.sync({ force: false }) // Use { force: false } to avoid dropping tables in production
  .then(() => console.log('Database synced!'))
  .catch((err: Error) => console.error('Unable to sync database:', err));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});