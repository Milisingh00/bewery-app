
import './App.css';
import SignUp from './public/SignUp';
import Login from './public/Login'
import HomePage from './public/HomePage';
import BreweryDetails from './public/BreweryDetails'
import { BrowserRouter,Routes,Route  } from "react-router-dom";


function App() {
  return (
    <div>
     <BrowserRouter>
     <Routes>
     <Route index element= {<Login/>} />
    
     <Route path = "/signup" element={<SignUp/>}/>
     <Route path = "/homepage" element={<HomePage/>}/>
     <Route path="/brewery/:id" element={<BreweryDetails/>} />
     </Routes>
     </BrowserRouter>

   
    </div>
  );
}

export default App;
