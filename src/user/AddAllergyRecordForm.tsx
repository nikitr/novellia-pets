import {useContext, useState} from 'react';
import './user.css';
import { PetContext } from '../App';

function AddAllergyRecordForm() {
  const [name, setName] = useState<String>();
  const [reactions, setReactions] = useState<String>();
  const [severity, setSeverity] = useState<String>();
  // @ts-ignore
  const { currPet: { id: petId } } = useContext(PetContext);
  const handleAddRecord = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:4000/add-allergy",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            reactions,
            severity,
            petId,
          }),
        }
      );
      const newVaccine = await response.json();
      setName("");
      setReactions("");
      setSeverity("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
  <form className="addVaccineRecordForm" onSubmit={handleAddRecord}>
    <input placeholder='Allergy name' required onChange={e => setName(e.target.value)}/>
    <input placeholder='Reactions' required onChange={e => setReactions(e.target.value)}/>
    <input placeholder='Severity' required onChange={e => setSeverity(e.target.value)}/>
    <button type="submit">Add allergy record</button> 
  </form>
  );
}

export default AddAllergyRecordForm;