import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import CoverPage from './Screeners/CoverScreen/CoverPage';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MyTaskList from './MyTaskList/MyTaskList';
import SignInPage from './Screeners/SignInScreen/SignInPage';
import SignUpPage from './Screeners/SignUpScreen/SignUpPage';
import CreateMyTask from './Screeners/CreateMyTask/CreateMyTask';
import SingleMyTask from './Screeners/SignleMyTask/SingleMyTask';
import ProfilePage from './Screeners/ProfilePage/ProfilePage';
import ForgotPassword from './Screeners/ForgotPassword/ForgotPassword';
const App = () => (
<BrowserRouter>
  <Header/>
  <main>
  <Routes>
  <Route path="/signIn" element={<SignInPage />}></Route>
  <Route path="/signUp" element={<SignUpPage />}></Route>
  <Route path="/mytasklist" element={<MyTaskList />}></Route>
  <Route path="/task/:id" element={<SingleMyTask />}></Route>
  <Route path="/createtask" element={<CreateMyTask />}></Route>
  <Route path="/profile" element={<ProfilePage />}></Route>
  <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
  <Route exact path="/" element={<CoverPage />}></Route>
 </Routes>
 </main>
 <Footer/>
 </BrowserRouter>  
);


export default App;
