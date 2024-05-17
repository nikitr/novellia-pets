import {useState} from 'react';
import './user.css';

function AddAllergyRecordForm() {
  const [name, setName] = useState<String>();
  const [reactions, setReactions] = useState<String>();
  const [severity, setSeverity] = useState<String>();
  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, reactions);
  };

  return (
  <form className="addVaccineRecordForm" onSubmit={handleAddRecord}>
    <input placeholder='Allergy name' required onChange={e => setName(e.target.value)}/>
    <input placeholder='Reactions' required onChange={e => setReactions(e.target.value)}/>
    <input placeholder='Severity' required onChange={e => setSeverity(e.target.value)}/>
    <button type="submit">Add vaccine record</button> 
  </form>
  );
}

export default AddAllergyRecordForm;