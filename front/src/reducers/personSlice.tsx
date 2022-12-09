import { createSlice } from "@reduxjs/toolkit";
import { Person, personService } from "../services/personService";

const firstData = await personService.getPersons();

// Define a type for the slice state
interface PersonState {
    persons: Person[]|null;
}

const initialState: PersonState = {
    persons: firstData?.data.persons??null
}

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
    }
});

export default personSlice.reducer;