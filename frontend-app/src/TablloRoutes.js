import {Routes, Route, Navigate} from 'react-router-dom'
import AMQdemo from "./pages/AMQdemo";
import Boards from "./pages/Boards";
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Registration from './pages/Registration';

const TablloRoutes = () => {
  return (
  <Routes>
    <Route exact path="/amqdemo" element={<AMQdemo/>}/>
    <Route path="/" element={<Navigate to ="/login"/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Registration/>}/>
    <Route path="/boards" element={<Boards/>}/>
    <Route path="*" element={<NotFound/>}/>
 </Routes>);
}

export default TablloRoutes;