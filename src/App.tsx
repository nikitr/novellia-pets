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
import { Pet } from './types';

// @ts-ignore
export const PetContext = createContext();

function App() {
  const [ currPet, setCurrPet ] = useState<Pet>();
  const value = {currPet, setCurrPet};

  return (
    <Router>
      <Routes>
        <Route
            path="/"
            element={
              <PetContext.Provider value={value}>
                <div className="appContainer">
                  <CreatePetForm />
                </div>
              </PetContext.Provider>
            }
        />
        <Route
          path="/my-pet"
          element={
            <PetContext.Provider value={value}>
              {currPet?.name && <PetDisplay />}
            </PetContext.Provider>
          }
        />
        <Route
          path="/admin"
          element={
            <PetContext.Provider value={value}>
              <PetGrid />
            </PetContext.Provider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
