
import './App.css';
import SignUp from './Component/SignUp';
import Login from './Component/Login'
import HomePage from './Component/HomePage';
import BreweryDetails from './Component/BreweryDetails'
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
