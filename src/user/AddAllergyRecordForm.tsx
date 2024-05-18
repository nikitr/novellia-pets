import {useContext, useEffect, useState} from 'react';
import './user.css';
import { PetContext } from '../App';

type Props = {
  setAllergies: any;
};

function AddAllergyRecordForm({ setAllergies }: Props) {
  const [name, setName] = useState<string>("");
  const [reactions, setReactions] = useState<string>("");
  const [severity, setSeverity] = useState<string>("");
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
      const newAllergy = await response.json();
      setName("");
      setReactions("");
      setSeverity("");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const allergyResponse = await fetch(`http://localhost:4000/get-allergies?petId=${petId}`);
        const allergyJson = await allergyResponse.json();
        setAllergies(allergyJson);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRecords();
  }, [setAllergies, petId, name]); // name included in dependencies to retrigger use effect after submit!

  return (
  <form className="addVaccineRecordForm" onSubmit={handleAddRecord}>
    <input placeholder='Allergy name' required onChange={e => setName(e.target.value)} value={name}/>
    <input placeholder='Reactions' required onChange={e => setReactions(e.target.value)} value={reactions}/>
    <input placeholder='Severity' required onChange={e => setSeverity(e.target.value)} value={severity}/>
    <button type="submit">Add allergy record</button> 
  </form>
  );
}

export default AddAllergyRecordForm;