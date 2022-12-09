import { model, Schema } from "mongoose";

const nationalitySchema = new Schema<INationality>({
    country: { type: String, required: true },
    probability: { type: Number, required: true },
});

const personSchema = new Schema<IPerson>({
    name: { type: String, required: true },
    nationalityPrediction: [nationalitySchema],
    genderPrediction: {
        name: { type: String, required: true },
        probability: { type: Number, required: true },
        count: { type: Number, required: true },
    }
});

// 3. Create a Model.
export const Person = model<IPerson>('Person', personSchema);
