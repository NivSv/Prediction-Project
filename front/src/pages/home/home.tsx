import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";
import { useAppSelector } from '../../hooks';
import React, { useEffect } from "react";
import { Accordion, Button } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Person } from "../../services/personService";

export default function Home(props: any) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [filterdPersons, setFilterdPersons] = React.useState<Array<Person>>([]);
  const [addButton, setAddButton] = React.useState<boolean>(false);
  const persons = useAppSelector(state => state.persons.persons)

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    setFilterdPersons(persons ?? []);
  }, []);

  const filterByValue = (vaule: string) => {
    if (!vaule) {
      setAddButton(false);
      setFilterdPersons(persons ?? []);
    }
    else {
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
    console.log("here");
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

  return (
    <div>
      <div className="flex justify-center mtb-1 gap-1">
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={persons?.map((person) => person.name) ?? []}
          onInput={handleSearch}
          onChange={handleOnChange}
          onBlur={handleBlue}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Search" />}
        />
        {addButton && <Button variant="contained">Add Person</Button>}
      </div>
      <div className="accordion">
        {
          filterdPersons?.map((person, index) => (
            <Accordion key={index} expanded={expanded === person.name} onChange={handleChange(person.name)}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                  {person.name}
                </Typography>
                <Typography>
                  <div className="flex center gap-1">
                    <p>Prediction:</p>
                    <p>{person.gender.name}</p>
                    <img width={30} height={20} src={`https://countryflagsapi.com/png/${person.nationality[0].country}`} />
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Predicted to be {person.gender.name} by {Math.round(person.gender.probability * 100)}%, there are {person.gender.count} people with the same name.<br />
                  {person.nationality.map((national, index) => (<p key={index}>Predicted to be from {national.country} by {Math.round(national.probability * 100)}%</p>))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
    </div >
  );
}