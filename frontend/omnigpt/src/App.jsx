import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import Success from './pages/Success'
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import FAQ from './pages/Faq';
import TermsAndConditions from './pages/TermsAndConditions';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';
import ChatScreen from './pages/ChatScreen/ChatScreen';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import JoinOurTeam from './pages/JoinOurTeam';
import Marketing from './pages/Marketing';
import ReactGA from 'react-ga4';


ReactGA.initialize('G-VNKNHSMFJ9');

function App() {
    return (
      <Router>
          <Routes>
            {/* Accessible Routes */}
            <Route path='/' element={<Landing />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path='/pricing' element={<Pricing />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/success' element={<Success />}></Route>
            <Route path="/send-forgot-password-email" element={<ForgotPassword />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/terms" element={<TermsAndConditions />} />
            <Route path="/joinourteam" element={<JoinOurTeam />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contactus' element={<ContactUs />} />
 
            <Route element={<PrivateRoute />}>
              <Route path="/chat" element={<ChatScreen />} />
            </Route>

          </Routes>
      </Router>
    )
}
 
export default App
 
