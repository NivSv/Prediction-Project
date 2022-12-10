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
                        // expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {person.name}
                            </Typography>
                            <div className="flex center gap-1">
                                <p>Predicted to be {person.gender.type} by <b>{Math.round(person.gender.probability * 100)}%</b></p>
                                <img width={30} height={20} src={`https://countryflagsapi.com/png/${person.nationality[0].country}`} />
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                                <p>Predicted to be from</p>
                                {person.nationality.map((nation, index) => (
                                        <p key={index}>{nation.country} - <b>{Math.round(nation.probability * 100)}%</b></p>
                                ))}
                                There are {person.gender.count} people with the same name.
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </div>
    )
}