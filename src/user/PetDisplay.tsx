import { useState } from 'react';
import AddVaccineRecordForm from './AddVaccineRecordForm';
import AddAllergyRecordForm from './AddAllergyRecordForm';
import type { Pet } from '../types';

type Props = {
  pet: Pet;
};

function PetDisplay({ pet }: Props) {
  const [showAddRecord, setShowAddRecord] = useState(false);
  const showAddRecordForm = () => {
    setShowAddRecord(true);
  };
  return (
  <div className="petDisplay">
    <h2>Name: {pet.name}</h2>
    <p>Type: {pet.type}</p>
    <p>Owner: {pet.owner}</p>
    <p>DOB: {pet.dob.toString()}</p>
    <button onClick={showAddRecordForm}>Add record(s) for pet</button>
    {showAddRecord ? (<div><AddVaccineRecordForm /><AddAllergyRecordForm /></div>) : <></>}
  </div>
  );
}

export default PetDisplay;
