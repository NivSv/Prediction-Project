import { ConstructionOutlined } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person, personService } from "../services/personService";
import { RootState } from "../store";

const firstData = await personService.getPersons();

const initialState = {
    persons: firstData,
}

export const personsSlice = createSlice({
    name: 'persons',
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<Person>) => {
            state.persons.push(action.payload);
        }
    }
});

export const { addPerson } = personsSlice.actions;

 export const getPersonsState = (state: RootState) => state.personReducer.persons;

export default personsSlice.reducer;