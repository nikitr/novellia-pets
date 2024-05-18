import { createContext, useState } from 'react';
import './App.css';
import CreatePetForm from './user/CreatePetForm';
import PetDisplay from './user/PetDisplay';
import PetGrid from './admin/PetGrid';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

// @ts-ignore
export const PetContext = createContext();

function App() {
  const [ currPet, setCurrPet ] = useState({});
  const value = {currPet, setCurrPet};

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<PetContext.Provider value={value}>
          <div className="appContainer">
            <CreatePetForm />
            <PetDisplay />
          </div>
        </PetContext.Provider>}
        />
        <Route
          path="/admin"
          element={<PetContext.Provider value={value}>
          <div className="appContainer">
            <PetGrid />
          </div>
        </PetContext.Provider>}
        />
      </Routes>
    </Router>
  );
}

export default App;
