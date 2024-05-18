import {useState, useContext} from 'react';
import DatePicker from "react-datepicker";
import './user.css';
import { PetContext } from '../App';

import "react-datepicker/dist/react-datepicker.css";

function CreatePetForm() {
  const [name, setName] = useState<String>();
  const [type, setType] = useState<String>();
  const [owner, setOwner] = useState<String>();
  const [dob, setDob] = useState<Date>(new Date());
  // @ts-ignore
  const { setCurrPet } = useContext(PetContext);

  const handleAddPet = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:4000/create-pet",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            type,
            owner,
            dob,
          }),
        }
      );
      const newPet = await response.json();
      setCurrPet(newPet);
      setName("");
      setType("");
      setOwner("");
      setDob(new Date());
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="createPetForm" onSubmit={handleAddPet}>
        <input placeholder='Name' required onChange={e => setName(e.target.value)}/>
        <input placeholder='Type' required onChange={e => setType(e.target.value)}/>
        <input placeholder='Owner Name' required onChange={e => setOwner(e.target.value)}/>
        <DatePicker wrapperClassName="datePicker" selected={dob} onChange={(date: Date) => setDob(date)} />
        <button type="submit">Add Pet</button> 
    </form>
  );
}

export default CreatePetForm;