import React from 'react';
import './App.css';
import CreatePetForm from './user/CreatePetForm';
import PetDisplay from './user/PetDisplay';
import PetGrid from './admin/PetGrid';

function App() {
  const pet = {
    name: "chai",
    type: "dog",
    owner: "nikita",
    dob: new Date(),
  };
  return (
    <div className="appContainer">
      <CreatePetForm />
      <PetDisplay pet={pet}/>
      <PetGrid />
    </div>
  );
}

export default App;
