import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import AMQdemo from "./pages/AMQdemo";
import Boards from "./pages/Boards";
import NotFound from './pages/NotFound';
import LogIn from './pages/LogIn';

const TablloRoutes = () => {
  return (
  <Routes>
    <Route exact path="/amqdemo" element={<AMQdemo/>}/>
    <Route path="/" element={<LogIn/>}/>
    <Route path="/boards" element={<Boards/>}/>
    <Route path="*" element={<NotFound/>}/>
    
    
 </Routes>);
}

export default TablloRoutes;