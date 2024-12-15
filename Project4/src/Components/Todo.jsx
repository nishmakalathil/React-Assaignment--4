import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Button, ButtonGroup, ListGroup, Form, Row, Col, Container } from 'react-bootstrap';  

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [inputTask, setInputTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);

  const changeHandler = (e) => {
    setInputTask(e.target.value);
  };

  const getTask = () => {
    axios.get("http://localhost:3000")
      .then(res => {
        setTasks(res.data); 
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  const editHandler = (task) => {
    setEditTaskId(task.id);  
    setInputTask(task.task);  
  };

  useEffect(() => {
    getTask();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editTaskId !== null) {
      axios.put(`http://localhost:3000/task/${editTaskId}`, { task: inputTask })
        .then(res => {
          setInputTask("");  
          setEditTaskId(null);  
          getTask();  
        })
        .catch(error => {
          console.log("error", error);
        });
    } else {
      axios.post("http://localhost:3000", { task: inputTask })
        .then(res => {
          setInputTask("");  
          getTask();  
        })
        .catch(error => {
          console.log("error", error);
        });
    }
  };

  const deleteTask = (index) => {
    axios.delete(`http://localhost:3000/task/${index}`)
      .then(res => {
        getTask();  
      })
      .catch(error => {
        console.log("error", error);
      });
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="w-50">
        <h1>Todo Application</h1>
        <Form onSubmit={submitHandler}>
          <Row className="align-items-center">
            <Col xs={9}>
              <Form.Control 
                type="text" 
                placeholder="Enter task" 
                value={inputTask}  
                onChange={changeHandler} 
                className="mb-2"  
              />
            </Col>
            <Col xs={3}>
              <Button type="submit" variant="primary" className="mb-2 w-100">
                {editTaskId !== null ? "Update Task" : "Add Task"}
              </Button>
            </Col>
          </Row>
        </Form>
        <ListGroup className="mt-3">
          {tasks.map((task, index) => (
            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center bg-dark text-light">
              <strong className="fs-5">{task.task}</strong>  
              <ButtonGroup>
                <Button variant="primary" onClick={() => editHandler(task)}>Edit</Button>
                <Button variant="primary" onClick={() => deleteTask(index)}>Delete</Button>
              </ButtonGroup>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
}

export default Todo;

