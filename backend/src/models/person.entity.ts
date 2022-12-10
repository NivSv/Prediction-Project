import { model, Schema } from "mongoose";

//All data from the api
// const personMaybeSchema = new Schema({
//     name: { type: String, required: true },
//     nationality: [
//         {
//             country: { type: String, required: true },
//             probability: { type: Number, required: true }
//         }
//     ],
//     gender: {
//         type: { type: String, required: true },
//         count: { type: String, required: true },
//         probability: { type: Number, required: true }
//     }
// });

//Reduced data from the api
const personSchema = new Schema({
    name: { type: String, required: true },
    nationality: { type: String, required: true },
    gender: { type: String, required: true },
    probability: { type: Number, required: true }
});

export const Person = model('Person', personSchema);
