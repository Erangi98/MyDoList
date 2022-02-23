import React from 'react'
import MainScreen from '../../Components/MainScreen'
import ReactMarkdown from "react-markdown";
import { Button, Card, Form } from 'react-bootstrap';
import { useState } from 'react';
import Loading from '../../Components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createMyTaskAction } from '../../Actions/myTasksAction';
import ErrorMessage from '../../Components/ErrorMessage';
import './CreateMyTask.css';

const CreateMyTask = ({ history }) => {

    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [taskDate, settaskDate] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const myTaskCreate = useSelector((state) => state.myTaskCreate);
    const { loading, error, task } = myTaskCreate;

    console.log(task);

    const resetHandler = () => {
      settitle("");
      setdescription("");
      settaskDate("");
    };

    const submitHandler = (e) => {
      e.preventDefault();

      if(!title || !description || !taskDate) return;
      dispatch(createMyTaskAction(title, description, taskDate));

      resetHandler();
      navigate("/mytasklist");
    };

  return (
    <MainScreen title= "Create a new Task">
        <Card>
            <Card.Header>
                <b>Create your task</b>
            </Card.Header>
            <Card.Body>
            <Form onSubmit={submitHandler}>
            {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
    <Form.Group className="mb-3" controlId="formBasicTitle">
    <Form.Label>Task Title</Form.Label>
    <Form.Control 
    type="text" 
    required
    placeholder="Enter your task title"
    value={title}
    onChange={(e) => settitle(e.target.value)} 
    />
  </Form.Group>


  <Form.Group className="mb-3" controlId="formBasicDescription">
    <Form.Label>Task Description</Form.Label>
    <Form.Control 
    as="textarea" 
    required
    placeholder="Enter your task description.."
    rows = {4}
    value={description}
    onChange={(e) => setdescription(e.target.value)} 
    />
  </Form.Group>

  {description && (
      <Card>
          <Card.Header>Your Task Preview</Card.Header>
            <Card.Body>
                <ReactMarkdown>{description}</ReactMarkdown>
            </Card.Body>
      </Card>
  )}
  
  <Form.Group className="mb-3" controlId="formBasicDate">
    <Form.Label>Enter the date</Form.Label>
    <Form.Control 
    type="date" 
    required
    placeholder="Enter the task date"
    value={taskDate}
    onChange={(e) => settaskDate(e.target.value)} 
    />
  </Form.Group>
  
  {loading && <Loading size={50} />}
  <div className='btns'>
  <Button type="submit" variant="primary" >
    Create My Task
  </Button>
  <Button onClick={resetHandler} varient="danger" className="mx-2">
    Reset the Fields
  </Button>
  </div>
</Form>
            </Card.Body>
            <Card.Footer className='text-muted'>
                Creating on - {new Date().toLocaleDateString()}
            </Card.Footer>
        </Card>
    </MainScreen>
  );
}

export default CreateMyTask