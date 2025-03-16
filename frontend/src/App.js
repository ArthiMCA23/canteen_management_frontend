import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/userDashboard';
import AdminDashboard from './components/AdminDashboard';
import AddItem from './components/AddItems';
import ItemDetail from './components/ItemDetail';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/userdashboard' element={<UserDashboard/>}/>
      <Route path='/admindashboard' element={<AdminDashboard/>}/>
      <Route path='/additem' element={<AddItem/>}/>
      <Route path='/additem/:id' element={<AddItem/>} />
      <Route path='/getitemdetail/:id' element={<ItemDetail/>}/>

    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
