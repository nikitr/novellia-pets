import { Allergy, Pet, Vaccine } from './types';

type Props = {
  pet: Pet;
  vaccines?: Vaccine[];
  allergies?: Allergy[];
};
function PetItem(props: Props) {
  const { pet, vaccines, allergies } = props;
  return (
    <div className="petItem">
      <h2>Name: {pet.name}</h2>
      <p>Type: {pet.type}</p>
      <p>Owner: {pet.owner}</p>
      <p>DOB: {pet.dob?.toString()}</p>
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
    </div>
  );
}

export default PetItem;
