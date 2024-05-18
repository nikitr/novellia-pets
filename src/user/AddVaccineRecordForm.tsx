import {useState, useContext, useEffect} from 'react';
import './user.css';
import { PetContext } from '../App';
import DatePicker from "react-datepicker";

type Props = {
  setVaccines: any;
};

function AddVaccineRecordForm({ setVaccines }: Props) {
  const [name, setName] = useState<string>("");
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

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const allergyResponse = await fetch(`http://localhost:4000/get-vaccines?petId=${petId}`);
        const allergyJson = await allergyResponse.json();
        setVaccines(allergyJson);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRecords();
  }, [setVaccines, petId, name]); // name included in dependencies to retrigger use effect after submit!

  return (
  <form className="addVaccineRecordForm" onSubmit={handleAddRecord}>
    <input placeholder='Vaccine name' required onChange={e => setName(e.target.value)} value={name} />
    <DatePicker wrapperClassName="datePicker" placeholderText={'Please select a date'} selected={date} onChange={(date: Date) => setDate(date)} />
    <button type="submit">Add vaccine record</button> 
  </form>
  );
}

export default AddVaccineRecordForm;