import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person, personService } from "../services/personService";

const firstData = await personService.getPersons();

// Define a type for the slice state
interface PersonState {
    persons: Person[] | null;
}

const initialState: PersonState = {
    persons: firstData?.data.persons ?? null
}

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<Person>) => {
            console.log(action.payload);
            // const newState:PersonState = {persons:[...state.persons??[], action.payload]};
            return {
                ...state,
                persons: [...state.persons ?? [], action.payload],
            }

        }
    }
});

export const { addPerson } = personSlice.actions;

export const getPersonsState = (state: PersonState) => state.persons;

export default personSlice.reducer;