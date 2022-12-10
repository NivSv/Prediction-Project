import { ConstructionOutlined } from "@mui/icons-material";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person, personService } from "../services/personService";
import { RootState } from "../store";

const initialState = {
    value: new Array<Person>(),
}

export const personsSlice = createSlice({
    name: 'persons',
    initialState,
    reducers: {
        addPerson: (state, action: PayloadAction<Person>) => {
            state.value = [...state.value, action.payload];
        },
        fill: (state, action: PayloadAction<Array<Person>>) => {
            state.value = [...action.payload];
        },
    }
});

export const { addPerson , fill } = personsSlice.actions;

export const selectCount = (state: RootState) => state.persons.value;

export default personsSlice.reducer;