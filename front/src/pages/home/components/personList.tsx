import { Person } from "../../../services/personService"
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from "react";

export default function PersonList(params: { persons: Person[]; }) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className="accordion">
            {
                params.persons.map((person, index) => (
                    <Accordion key={index} expanded={expanded === person.name} onChange={handleChange(person.name)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {person.name}
                            </Typography>
                            <div className="flex center gap-1">
                                <p>Prediction:</p>
                                <p>{person.gender}</p>
                                <p>{Math.round(person.probability * 100)}%</p>
                                <img width={30} height={20} src={`https://countryflagsapi.com/png/${person.nationality}`} />
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                {/* Predicted to be {person.gender.name} by {Math.round(person.gender.probability * 100)}%, there are {person.gender.count} people with the same name.<br />
                  {person.nationality.map((national, index) => (<p key={index}>Predicted to be from {national.country} by {Math.round(national.probability * 100)}%</p>))} */}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
    )
}