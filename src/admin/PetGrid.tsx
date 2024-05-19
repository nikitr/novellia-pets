import { useState, useEffect } from 'react';
import './admin.css';
import type {Pet} from '../types';
import PetItem from '../PetItem';

function PetGrid() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch("http://localhost:4000/pets");
        const pets: Pet[] = await response.json();
        setPets(pets);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPets();
  }, []);
  

  return (
    <>
      <h2>Pets Dashboard</h2>
      <div className="petGrid">
        {pets.map((pet) => (
          <PetItem pet={pet} vaccines={pet.vaccines} allergies={pet.allergies} />
        ))}
      </div>
    </>
    
  );
}

export default PetGrid;