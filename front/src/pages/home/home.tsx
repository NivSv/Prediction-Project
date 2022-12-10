import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Person, personService } from "../../services/personService";
import PersonList from "./components/personList";
import { RootState } from "../../store";
import { useDispatch, useSelector } from 'react-redux'
import { addPerson, selectCount } from "../../reducers/personSlice";
import Filter from "./components/Filter";

export default function Home(props: any) {
  const [filterdPersons, setFilterdPersons] = React.useState<Array<Person>>([]);
  const [addButtonActive, setAddButtonActive] = React.useState<boolean>(false);
  const [textValue, setTextValue] = React.useState<string>("");
  const [persons, setPersons] = React.useState<Array<Person>>([]);
  const statePersons = useSelector(selectCount);
  const dispatch = useDispatch();


  useEffect(() => {
    setPersons(statePersons);
  }, [statePersons]);

  useEffect(() => {
    setFilterdPersons(persons);
  }, [persons]);

  const handlePersonAddClick = async () => {
    const person = await personService.addPerson(textValue);
    if (!person)
      return;
    if (person) {
      dispatch(addPerson(person));
    }
    console.log(persons);
    setTextValue("");
  }

  return (
    <div>
      <div className="flex justify-center mtb-1 gap-1">
        <Filter textValue={textValue} setTextValue={setTextValue} persons={persons} filterdPersons={filterdPersons} setFilterdPersons={setFilterdPersons} setAddButtonActive={setAddButtonActive} />
        {addButtonActive && <Button variant="contained" onClick={handlePersonAddClick}>Add Person</Button>}
      </div>
      <PersonList persons={filterdPersons} />
    </div >
  );
}