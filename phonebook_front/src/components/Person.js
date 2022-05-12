const Person = ({ name, number, deletePerson }) => {
  return (
    <li>
      {name}: {number}
      <br></br>
      <button onClick={deletePerson}> Delete </button>
    </li>
  );
};
export default Person;
