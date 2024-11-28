import App from './App';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import {render} from '@testing-library/react'


test("Rendering App element", () => {
    render(
        <BrowserRouter>
        <App/>     
        </BrowserRouter>                
    )
});

