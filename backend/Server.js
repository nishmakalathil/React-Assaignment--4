const express = require('express');
const cors = require('cors');

const app = express();


app.use(cors({
  origin: "http://localhost:5175", 
  credentials: true
}));

app.use(express.json());

let tasks = [
  { id: 1, task: "Go to office" },
  { id: 2, task: "Go to Mall" },
  { id: 3, task: "Go to Market" }
];


app.get("/test", (req, res) => {
  res.json({ message: "API is working!" });
});


app.get("/", (req, res) => {
  res.json(tasks);
});


app.post("/", (req, res) => {
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,  
    task: req.body.task    
  };

  tasks.push(newTask);
  res.status(201).json({ message: "Task added successfully", task: newTask });
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
    res.json({ message: "Task updated successfully" });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});


app.delete("/task/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const index = tasks.findIndex(task => task.id === id);

  if (index !== -1) {
    tasks.splice(index, 1);
    res.json({ message: "Task deleted successfully" });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
