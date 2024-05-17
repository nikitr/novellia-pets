import {useState} from 'react';
import './user.css';

function CreatePetForm() {
  const [name, setName] = useState<String>();
  const [type, setType] = useState<String>();
  const [ownerName, setOwnerName] = useState<String>();
  const [dob, setDob] = useState<String>(); //how to input date
  const handleAddPet = (e: React.FormEvent) => {
    // talk to db
    e.preventDefault();
    console.log(name, type);
  };

  return (
    <form className="createPetForm" onSubmit={handleAddPet}>
        <input placeholder='Name' required onChange={e => setName(e.target.value)}/>
        <input placeholder='Type' required onChange={e => setType(e.target.value)}/>
        <input placeholder='Owner Name' required onChange={e => setOwnerName(e.target.value)}/>
        <input placeholder='Date of birth' required onChange={e => setDob(e.target.value)}/>
        <button type="submit">Add Pet</button> 
    </form>
  );
}

export default CreatePetForm;