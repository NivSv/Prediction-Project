import { model, Schema } from "mongoose";

const genderSchema = new Schema({
    type: { type: String, required: true },
    probability: { type: Number, required: true },
    count: { type: Number, required: true },
});

const nationalitySchema = new Schema({
    country: { type: String, required: true },
    probability: { type: Number, required: true },
});

const personSchema = new Schema({
    name: { type: String, required: true },
    nationality: { type: [nationalitySchema], required: true },
    gender: { type: genderSchema, required: true },
});

//Create the model
export const Person = model('Person', personSchema);
