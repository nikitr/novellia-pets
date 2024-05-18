import { useState, useEffect } from 'react';
import './admin.css';
import type {Pet} from '../types';

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
    <div className="petGrid">
      {pets.map((pet) => (
        <div className="petItem">
          <h2>Name: {pet.name}</h2>
            <p>Type: {pet.type}</p>
            <p>Owner: {pet.owner}</p>
            <p>DOB: {pet.dob.toString()} </p>
            <table>
              <caption>
                Vaccine Records
              </caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {pet.vaccines?.map((record) => (
                  <tr>
                    <th scope="row">{record.name}</th>
                    <td>{record.date.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table>
              <caption>
                Allergy Records
              </caption>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Reactions</th>
                  <th scope="col">Severity</th>
                </tr>
              </thead>
              <tbody>
                {pet.allergies?.map((record) => (
                  <tr>
                    <th scope="row">{record.name}</th>
                    <td>{record.reactions}</td>
                    <td>{record.severity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>
      ))}
      
    </div>
  );
}

export default PetGrid;