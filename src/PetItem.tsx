import { Allergy, Pet, Vaccine } from './types';

type Props = {
  pet: Pet;
  vaccines?: Vaccine[];
  allergies?: Allergy[];
};
function PetItem(props: Props) {
  const { pet, vaccines, allergies } = props;
  const petDate = pet.dob && new Date(pet.dob);
  return (
    <div className="petItem">
      <h3>Name: {pet.name}</h3>
      <h3>Type: {pet.type}</h3>
      <h3>Owner: {pet.owner}</h3>
      <h3>DOB: {petDate && `${petDate.getMonth()}-${petDate.getDay()}-${petDate.getFullYear()}`}</h3>
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
          {vaccines?.map((record: Vaccine) => {
            const recordDate = new Date(record?.date)
            return (
              <tr>
                <th scope="row">{record?.name}</th>
                <td>{`${recordDate.getMonth()}-${recordDate.getDay()}-${recordDate.getFullYear()}`}</td>
              </tr>
            );
          })}
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
    </div>
  );
}

export default PetItem;
