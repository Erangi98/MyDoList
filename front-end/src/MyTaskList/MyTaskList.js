import React, { useEffect } from 'react';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { MainScreen}   from '../Components/MainScreen';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Loading from '../Components/Loading';
import ErrorMessage from '../Components/ErrorMessage';
import { deleteMyTaskAction, listMyTasks} from '../Actions/myTasksAction';
import './MyTaskList.css';

const MyTaskList = (history) => {
 
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const myTaskList = useSelector((state) => state.myTaskList);
    const { loading, tasks, error } = myTaskList;

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    const myTaskCreate = useSelector((state) => state.myTaskCreate);
    const { success: successCreate }= myTaskCreate;

    const myTaskUpdate = useSelector((state) => state.myTaskUpdate);
    const { success: successUpdate }= myTaskUpdate;

    const myTaskDelete = useSelector((state) => state.myTaskDelete);
    const { 
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete }= myTaskDelete;

        const deleteHandler = (id) => {
            if (window.confirm("Are you want to delete?")) {
                dispatch(deleteMyTaskAction(id));
            }
        }

    const today =new Date().toISOString().substring(0, 10);

    const list = myTaskList.tasks;
    if(myTaskList.tasks && myTaskList.tasks.length !== 0){
        list.sort((a,b) => (a.taskDate > b.taskDate ? 1 : -1));
    }


    useEffect(() => {
        dispatch(listMyTasks());

        if(!userInfo) {
            navigate("/");
      }
    }, [
        dispatch,
        history,
        userInfo,
        successCreate,
        successUpdate,
        successDelete,
    ]);
    

  return (
    <MainScreen title={`Welcome ${userInfo.username}...`}>    
    <h4 className='subtitle'>The highlighted tasks , are the tasks you have to do today</h4>
    <h4 className='subtitle'>Your to-do list is organized according to the date</h4>
        <Link to="/createtask">
            <Button className='button'>
                Create New Task
            </Button>
        </Link>

        
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {errorDelete && (
            <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loading && <Loading />}
        {loadingDelete && <Loading />}
        {tasks?.map((task) => (
        <Accordion key={task._id}>
        <Accordion.Item eventKey="0">
        <Card style={{margine:10}}>
                <Card.Header style={{display:"flex"}}
                className={today === task.taskDate ? "todayTasks" : ""}>
                 <span
                 style={{
                     color:"purple",
                     textDecoration: "none",
                     flex: 1,
                     cursor: "pointer",
                     alignSelf: "center",
                     fontSize: 18,
                        }}>
                        <Accordion.Header as={Card.Text}  eventKey="0">
                        {task.title}
                        </Accordion.Header>
                        </span>   
                
                    <div>
                        <Button href={`/task/${task._id}`} variant="success" className="mx-2">Update Task</Button>
                        <Button variant="danger" 
                        className="mx-2"
                        onClick={() => deleteHandler(task._id)}>
                        Delete Task
                        </Button>
                    </div>
                </Card.Header>

                <Accordion.Body>
                    <Card.Body>
                     <Card.Title>
                        <h4>
                            <Badge >Date - {task.taskDate}</Badge>
                        </h4>
                     </Card.Title>
                     <Card.Text>{task.description}</Card.Text>
                </Card.Body>
                </Accordion.Body>
            </Card>
            </Accordion.Item>
        </Accordion>
        ))}
        
          
       
    </MainScreen>
  )
}

export default MyTaskList;