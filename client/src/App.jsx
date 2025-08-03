import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Suggestion from "./pages/Suggestion";
import { Home, Login, Signup, Profile, Shop, Paint } from "./pages/pages";
import PaintCard from "./pages/PaintCard";
import Analysis from "./components/Analysis/Analysis";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/shop" element={<Shop />} />
          <Route exact path="/shop/:id" element={<Paint />} />
          <Route exact path="/suggest" element={<Suggestion />} />
          {/* <Route exact path='/suggest' element={<Analysis/>} /> */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
