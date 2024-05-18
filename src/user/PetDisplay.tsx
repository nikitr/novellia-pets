import { useState, useContext, useEffect } from 'react';
import AddVaccineRecordForm from './AddVaccineRecordForm';
import AddAllergyRecordForm from './AddAllergyRecordForm';
import { PetContext } from '../App';
import { Allergy, Vaccine } from '../types';

function PetDisplay() {
  const [showAddRecord, setShowAddRecord] = useState(false);
  const [vaccines, setVaccines] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const showAddRecordForm = () => {
    setShowAddRecord(true);
  };
  // @ts-ignore
  const { currPet } = useContext(PetContext);
  console.log("createdpet date", currPet.dob);
  
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const vaccResponse = await fetch(`http://localhost:4000/get-vaccines?petId=${currPet.id}`);
        const vaccJson = await vaccResponse.json();
        console.log(vaccJson);
        setVaccines(vaccJson);
        const allergyResponse = await fetch(`http://localhost:4000/get-allergies?petId=${currPet.id}`);
        const allergyJson = await allergyResponse.json();
        setAllergies(allergyJson);
      } catch (e) {
        console.log(e);
      }
    };
    fetchRecords();
  }, [setVaccines, setAllergies, currPet.id]);

  return (
  <div className="petDisplay">
    <h2>Name: {currPet.name}</h2>
    <p>Type: {currPet.type}</p>
    <p>Owner: {currPet.owner}</p>
    <p>DOB: {currPet.dob}</p>
    <table>
      <caption>
        Vaccine Records
      </caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Date</th>
        </tr>
      </thead>
      <tbody>
        {vaccines?.map((record: Vaccine) => (
          <tr>
            <th scope="row">{record?.name}</th>
            <td>{record?.date.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <table>
      <caption>
        Allergy Records
      </caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Reactions</th>
          <th scope="col">Severity</th>
        </tr>
      </thead>
      <tbody>
        {allergies?.map((record: Allergy) => (
          <tr>
            <th scope="row">{record.name}</th>
            <td>{record.reactions}</td>
            <td>{record.severity}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <button onClick={showAddRecordForm}>Add record(s) for pet</button>
    {showAddRecord ? (<div><AddVaccineRecordForm /><AddAllergyRecordForm /></div>) : <></>}
  </div>
  );
}

export default PetDisplay;
