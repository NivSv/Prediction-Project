import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../hooks';
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Person, personService } from "../../services/personService";
import { addPerson, getPersonsState } from "../../reducers/personSlice";
import PersonList from "./components/personList";

export default function Home(props: any) {
  const [filterdPersons, setFilterdPersons] = React.useState<Array<Person>>([]);
  const [addButton, setAddButton] = React.useState<boolean>(false);
  const [textValue, setTextValue] = React.useState<string>("");
  const persons = useAppSelector(getPersonsState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setFilterdPersons(persons ?? []);
  }, []);

  const filterByValue = (vaule: string) => {
    if (!vaule) {
      setTextValue("");
      setAddButton(false);
      setFilterdPersons(persons ?? []);
    }
    else {
      setTextValue(vaule);
      const filterd = persons?.filter(person => person.name.toLowerCase().includes(vaule.toLowerCase()))
      setFilterdPersons(
        filterd ?? []
      )
      if (filterd?.length === 0)
        setAddButton(true);
      else
        setAddButton(false);
    }
    console.log(filterdPersons);

  }

  const handleSearch = (event: React.FormEvent<HTMLDivElement>) => {
    filterByValue((event.target as HTMLInputElement).value);
  }

  const handleBlue = (event: React.FormEvent<HTMLDivElement>) => {
    filterByValue((event.target as HTMLInputElement).value);
  }

  const handleOnChange = (event: React.SyntheticEvent<Element, Event>, value: (string | null)) => {
    if (value) {
      console.log(value);
      filterByValue(value);
    }
  }

  const handlePersonAddClick = async () => {
    const person = await personService.addPerson(textValue);
    if(!person)
      return;
    if (person) {
      dispatch({ type: addPerson, payload: person });
    }
    console.log(persons);
    setTextValue("");
    filterByValue('');
  }

  return (
    <div>
      <div className="flex justify-center mtb-1 gap-1">
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          value={textValue}
          options={persons?.map((person) => person.name) ?? []}
          onInput={handleSearch}
          onChange={handleOnChange}
          onBlur={handleBlue}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
        {addButton && <Button variant="contained" onClick={handlePersonAddClick}>Add Person</Button>}
      </div>
      <PersonList persons={filterdPersons} />
    </div >
  );
}