const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Allow only your Vercel frontend
const allowedOrigin = 'https://react-assaignment-4.vercel.app';

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || origin === allowedOrigin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());
let tasks = [
  { id: 1, task: "Go to office" },
  { id: 2, task: "Go to Mall" },
  { id: 3, task: "Go to Market" }
];

// Example API Route
app.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});


app.get("/", (req, res) => {
  res.json(tasks);
});

app.post("/", (req, res) => {
  const newTask = {
    id: tasks.length + 1,  
    task: req.body.task    
  };

  tasks.push(newTask);

  res.send("success");
});


app.put("/task/:id", (req, res) => {
  const id = parseInt(req.params.id, 10); 
  const updatedTask = req.body.task; 

  
  let taskFound = false;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].task = updatedTask;
      taskFound = true;
      break;
    }
  }

  if (taskFound) {
    res.send("Task updated successfully");
  } else {
    res.status(404).send("Task not found");
  }
});


app.delete("/task/:index", (req, res) => {
  const index = parseInt(req.params.index, 10); 
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.send("deleted");
  } else {
    res.status(404).send("Task not found");
  }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
