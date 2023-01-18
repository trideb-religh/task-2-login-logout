import './App.css';
import Login from './Components/Login';
import Registration from './Components/Registration';
import { Routes, Route } from 'react-router-dom'; 
import AdminPage from './Components/AdminPage';
import UserPage from './Components/UserPage';
import Error from './Components/Error';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
        <Route path='/user/:username' element={<UserPage/>}/>
        <Route path='/error' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
