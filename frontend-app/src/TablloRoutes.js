import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home";
import AMQdemo from "./pages/AMQdemo";
import Tables from "./pages/Tables";
import NotFound from './pages/NotFound';

const TablloRoutes = () => {
  return (
  <Routes>
    <Route exact path="/amqdemo" element={<AMQdemo/>}/>
    <Route path="/" element={<Tables/>}/>
    <Route path="*" element={<NotFound/>}/>
    
    
 </Routes>);
}

export default TablloRoutes;