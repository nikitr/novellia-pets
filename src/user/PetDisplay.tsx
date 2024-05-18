import { useState, useContext, useEffect } from 'react';
import AddVaccineRecordForm from './AddVaccineRecordForm';
import AddAllergyRecordForm from './AddAllergyRecordForm';
import { PetContext } from '../App';
import PetItem from '../PetItem';

function PetDisplay() {
  const [vaccines, setVaccines] = useState([]);
  const [allergies, setAllergies] = useState([]);

  // @ts-ignore
  const { currPet } = useContext(PetContext);
  
  return (
  <div className="petDisplay">
    <PetItem pet={currPet} vaccines={vaccines} allergies={allergies}/>
    {currPet.name && <div className="addRecordForms">
      <AddVaccineRecordForm setVaccines={setVaccines}/>
      <AddAllergyRecordForm setAllergies={setAllergies} />
    </div>}
  </div>
  );
}

export default PetDisplay;
