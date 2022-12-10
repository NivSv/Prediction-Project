import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Person, personService } from "../../services/personService";
import PersonList from "./components/personList";
import { useDispatch, useSelector } from 'react-redux'
import { addPerson, selectCount } from "../../reducers/personSlice";
import Filter from "./components/Filter";
import Spinner from "../../components/spinner";

export default function Home() {
  const [filterdPersons, setFilterdPersons] = React.useState<Array<Person>>([]);
  const [addButtonActive, setAddButtonActive] = React.useState<boolean>(false);
  const [textValue, setTextValue] = React.useState<string>("");
  const [persons, setPersons] = React.useState<Array<Person>>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const statePersons = useSelector(selectCount);
  const dispatch = useDispatch();

  //Get persons from state
  useEffect(() => {
    setPersons(statePersons);
  }, [statePersons]);

  //Set filterd persons to persons
  useEffect(() => {
    setFilterdPersons(persons);
  }, [persons]);

  //Handle button add click
  const handlePersonAddClick = async () => {
    setIsLoading(true)
    const person = await personService.addPerson(textValue)
    if (!person){
      setIsLoading(false)
      setError("Not a valid name");
      return;
    }
    setError("");
    dispatch(addPerson(person));
    setIsLoading(false)
    setTextValue("");
    setAddButtonActive(false);
  }

  return (
    <div>
      <div className="flex justify-center mtb-1 gap-1">
        <Filter textValue={textValue} setTextValue={setTextValue} persons={persons} filterdPersons={filterdPersons} setFilterdPersons={setFilterdPersons} setAddButtonActive={setAddButtonActive} />
        {addButtonActive && <Button variant="contained" onClick={handlePersonAddClick}>Add Person</Button>}
      </div>
      {error && <div className="flex justify-center mtb-1 gap-1 error"> {error} </div>}
      <PersonList persons={filterdPersons} />
      {isLoading && <div className="flex justify-center mtb-1 gap-1">
        <Spinner />
      </div>}
    </div >
  );
}