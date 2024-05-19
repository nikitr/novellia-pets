import { useState, useContext } from 'react';
import AddVaccineRecordForm from './AddVaccineRecordForm';
import AddAllergyRecordForm from './AddAllergyRecordForm';
import { PetContext } from '../App';
import PetItem from '../PetItem';
import EditPetForm from './EditPetForm';

function PetDisplay() {
  const [vaccines, setVaccines] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // @ts-ignore
  const { currPet } = useContext(PetContext);
  const onEditClick = () => {
    setEditMode(true);
  };
  
  return (
    <div className="petDisplay">
        {editMode ? (
          <>
            <h2>Edit Your Pet</h2>
            <EditPetForm setEditMode={setEditMode}/>
            </>)
        : (
          <>
            <h2>Your Pet</h2>
            <button onClick={onEditClick}>Edit</button>
            <PetItem pet={currPet} vaccines={vaccines} allergies={allergies}/>
            <div className="addRecordForms">
              <AddVaccineRecordForm setVaccines={setVaccines}/>
              <AddAllergyRecordForm setAllergies={setAllergies} />
            </div>
          </>
        )}
    </div>
  );
}

export default PetDisplay;
