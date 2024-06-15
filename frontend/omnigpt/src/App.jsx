import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import Login from './pages/Login';

function App() {
    return (
      <Router>
          <Routes>
            {/* Accessible Routes */}
            <Route path='/' element={<Landing />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/pricing' element={<Pricing />}></Route>

            <Route path='/login' element={<Login />} />
          </Routes>
      </Router>
    )
}

export default App
