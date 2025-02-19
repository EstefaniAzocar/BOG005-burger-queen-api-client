// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './view/home.jsx'
import Login from './view/login.jsx';
import {Admin} from './view/admin.jsx'; 
import { BurgerProvider } from './context/indexContext.jsx';
import { RoutesRoles } from './routes/routesRoles.js';
import {CartProvider} from './context/cartContext.jsx'

// import { Waiter } from './view/waiter.jsx';
// import { Chef } from './view/chef.jsx';

function App() {

  return (
    <BurgerProvider>
      <CartProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='Login' element={<Login />}/>
        <Route path='/*' element={<RoutesRoles/>}/>
        {/* <Route path='/admin' element={<Admin />}/>
        <Route path='/admin' element={<Admin />}/> */}
        {/* <Route path='/waiter' element={<Waiter />}/>
        <Route path='/chef' element={<Chef />}/> */}
      </Routes>
    </BrowserRouter>
    </CartProvider>
    </BurgerProvider>
  );
}

export default App;
