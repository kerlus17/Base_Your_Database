import express from 'express';
import * as mongoose from 'mongoose';
import mongoose from 'mongoose';
import { User } from '../models/users';

mongoose.connect()
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

const app = express();
const port = 3000;

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Create User 
app.post("/users", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Get user by name
app.get("/userbyID/:name", async (req, res) => {
  const user = await User.findOne({ name: req.params.name});
  res.json(user);
});




app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});



app.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
     
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: "Error updating user", error });
  }
});



app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting user", error });
  }
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});