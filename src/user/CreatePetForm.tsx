import {useState, useContext} from 'react';
import DatePicker from "react-datepicker";
import './user.css';
import { PetContext } from '../App';
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

function CreatePetForm() {
  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [owner, setOwner] = useState<string>("");
  const [dob, setDob] = useState<Date>();
  // @ts-ignore
  const { setCurrPet } = useContext(PetContext);
  const navigate = useNavigate();

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
      setDob(undefined);
      navigate("/my-pet");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Novellia Pets</h2>
      <form className="createPetForm" onSubmit={handleAddPet}>
        <input placeholder='Name' required onChange={e => setName(e.target.value)} value={name} />
        <input placeholder='Type' required onChange={e => setType(e.target.value)} value={type} />
        <input placeholder='Owner Name' required onChange={e => setOwner(e.target.value)} value={owner} />
        <DatePicker wrapperClassName="datePicker" placeholderText={'Date of birth'} selected={dob} onChange={(date: Date) => setDob(date)} />
        <button type="submit">Add Pet</button>
      </form>
    </div>
  );
}

export default CreatePetForm;