import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Person, personService } from "../../services/personService";
import PersonList from "./components/personList";
import { RootState } from "../../store";
import { useDispatch, useSelector } from 'react-redux'
import { addPerson, selectCount } from "../../reducers/personSlice";

export default function Home(props: any) {
  const [filterdPersons, setFilterdPersons] = React.useState<Array<Person>>([]);
  const [addButton, setAddButton] = React.useState<boolean>(false);
  const [textValue, setTextValue] = React.useState<string>("");
  const [persons, setPersons] = React.useState<Array<Person>>([]);
  const statePersons = useSelector(selectCount);
  const dispatch = useDispatch();

  
  useEffect(() => {
    setPersons(statePersons);
    console.log(statePersons);
    
  }, [statePersons]);
  
  useEffect(() => {
    setFilterdPersons(persons);
  }, [persons]);

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
      if(!filterdPersons.find(person => person.name.toLowerCase() === vaule.toLowerCase()))
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
      dispatch(addPerson(person));
    }
    console.log(persons);
    setTextValue("");
    filterByValue('');
  }

  return (
    <div>
      <div className="flex justify-center mtb-1 gap-1">
        {/* <Button onClick={() => dispatch(addPerson())}>Add Person</Button> */}
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          value={textValue}
          // options={persons?.map((person) => person.name) ?? []}
          options={[]}
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