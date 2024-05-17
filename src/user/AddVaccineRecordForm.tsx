import {useState} from 'react';
import './user.css';

function AddVaccineRecordForm() {
  const [name, setName] = useState<String>();
  const [date, setDate] = useState<String>();
  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(name, date);
  };

  return (
  <form className="addVaccineRecordForm" onSubmit={handleAddRecord}>
    <input placeholder='Vaccine name' required onChange={e => setName(e.target.value)}/>
    <input placeholder='Vaccine date' required onChange={e => setDate(e.target.value)}/>
    <button type="submit">Add vaccine record</button> 
  </form>
  );
}

export default AddVaccineRecordForm;