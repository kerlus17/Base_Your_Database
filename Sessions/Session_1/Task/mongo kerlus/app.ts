import express, { Application } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes';

const app: Application = express();
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://localhost:27017/userDB_TS';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error("Database connection error:", err));