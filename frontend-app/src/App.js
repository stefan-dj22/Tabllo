
import {Routes, Route} from 'react-router-dom'
import routes from "./routes"


function App() {
  return (
    <div>
      <Routes>
        {routes.map(({ path, component: Component }, index) => (
          <Route key={index} path={path} element={<Component />} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
