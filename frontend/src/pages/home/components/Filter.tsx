import { Person } from "../../../services/personService";
import { TextField } from "@mui/material";
import { Autocomplete } from "@mui/material";

type FilterProps = {
    textValue: string,
    setTextValue: React.Dispatch<React.SetStateAction<string>>,
    persons: Person[],
    filterdPersons: Person[],
    setFilterdPersons: React.Dispatch<React.SetStateAction<Person[]>>,
    setAddButtonActive: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Filter(params: FilterProps) {
    const filterByValue = (vaule: string) => {
        if (!vaule) {
            params.setTextValue("");
            params.setAddButtonActive(false);
            params.setFilterdPersons(params.persons ?? []);
        }
        else {
            params.setTextValue(vaule);
            const filterd = params.persons?.filter(person => person.name.toLowerCase().includes(vaule.toLowerCase()))
            params.setFilterdPersons(
                filterd ?? []
            )
            if (!params.filterdPersons.find(person => person.name.toLowerCase() === vaule.toLowerCase()))
                params.setAddButtonActive(true);
            else
                params.setAddButtonActive(false);
        }
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
    return (
        <Autocomplete
            id="free-solo-demo"
            freeSolo
            value={params.textValue}
            options={params.persons.map((person) => person.name)}
            onInput={handleSearch}
            onChange={handleOnChange}
            onBlur={handleBlue}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Search or add" />}
        />
    )
}