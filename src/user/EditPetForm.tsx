import {useState, useContext} from 'react';
import './user.css';
import { PetContext } from '../App';

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  setEditMode: any;
}
function EditPetForm({setEditMode}: Props) {
  // @ts-ignore
  const { currPet, setCurrPet } = useContext(PetContext);
  const [name, setName] = useState<string>(currPet.name);
  const [type, setType] = useState<string>(currPet.type);
  const [owner, setOwner] = useState<string>(currPet.owner);
  const id = currPet.id;
  
  const handleSavePet = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:4000/edit-pet",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            name,
            type,
            owner,
          }),
        }
      );
      const newPet = await response.json();
      setCurrPet(newPet);
      setEditMode(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form className="createPetForm" onSubmit={handleSavePet}>
      <input  onChange={e => setName(e.target.value)} value={name} />
      <input  onChange={e => setType(e.target.value)} value={type} />
      <input  onChange={e => setOwner(e.target.value)} value={owner} />
      <button type="submit">Save</button> 
    </form>
  );
}

export default EditPetForm;