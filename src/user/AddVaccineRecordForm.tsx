import {useState, useContext} from 'react';
import './user.css';
import { PetContext } from '../App';
import DatePicker from "react-datepicker";

function AddVaccineRecordForm() {
  const [name, setName] = useState<String>();
  const [date, setDate] = useState<Date>();
  // @ts-ignore
  const { currPet: { id: petId } } = useContext(PetContext);
  const handleAddRecord = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:4000/add-vaccine",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            date,
            petId,
          }),
        }
      );
      const newVaccine = await response.json();
      setName("");
      setDate(undefined);
    } catch (e) {
      console.log(e);
    }
  };

  return (
  <form className="addVaccineRecordForm" onSubmit={handleAddRecord}>
    <input placeholder='Vaccine name' required onChange={e => setName(e.target.value)}/>
    <DatePicker wrapperClassName="datePicker" selected={date} onChange={(date: Date) => setDate(date)} />
    <button type="submit">Add vaccine record</button> 
  </form>
  );
}

export default AddVaccineRecordForm;