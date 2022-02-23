import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import MainScreen from "../../Components/MainScreen";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import { deleteMyTaskAction, updateMyTaskAction } from "../../Actions/myTasksAction";
import './SingleMyTask.css';

function SingleMyTask({match, history }) {

    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [taskDate, settaskDate] = useState("");
    const [date, setdate] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

    const myTaskUpdate = useSelector((state) => state.myTaskUpdate);
    const { loading, error } = myTaskUpdate;

    const myTaskDelete = useSelector((state) => state.myTaskDelete);
    const { loading: loadingDelete, error: errorDelete }= myTaskDelete;

    const deleteHandler = (id) => {
      if(window.confirm("Are you want to delete?")){
        dispatch(deleteMyTaskAction(id));
      }

      navigate("/mytasklist");
    };

    useEffect(() => {
      const fetching = async () => {
      const { data } = await axios.get(`/api/mytasklist/${params.id}`);

      settitle(data.title);
      setdescription(data.description);
      settaskDate(data.taskDate);
      setdate(data.updatedAt);
      };
      fetching();
    }, [params.id, date]);

    const resetHandler = () => {
        settitle("");
        settaskDate("");
        setdescription("");
    };

    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateMyTaskAction(params.id, title, description, taskDate));
        if(!title || !description || ! taskDate) return;

        resetHandler();
        navigate("/mytasklist");
    };


    
  return (
    <MainScreen title= "Update your Task">
    <Card>
        <Card.Header>
            <b>Update your task</b>
        </Card.Header>
        <Card.Body>
        <Form onSubmit={updateHandler}>
        {loadingDelete && <Loading />}
        {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
        {errorDelete && (
          <ErrorMessage varient="danger">{errorDelete}</ErrorMessage>
        )}
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
Update My Task
</Button>
<Button 
onClick={() => deleteHandler(params.id)} 
varient="danger" 
className="mx-2">
Delete the task
</Button>
</div>
</Form>
        </Card.Body>
    </Card>
</MainScreen>
  )
}

export default SingleMyTask

