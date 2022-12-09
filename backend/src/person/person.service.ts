import { Person } from "./person.schema";
import axios from 'axios';
import { GENDERIZE_API, NATIONALIZE_API } from "../constants/apis.constant";

const GetOrCreate = async (name: string): Promise<IPerson> => {
    const entity = await Person.findOne({ name });
    if (entity) {
        return entity;
    }
    const nationality = await axios.get(`${NATIONALIZE_API}/?name=${name}`);
    const nationalityPrediction: Array<INationality> = nationality.data.country.map((countery: any) => {
        return { country: countery.country_id, probability: countery.probability }
    });
    const gender = await axios.get(`${GENDERIZE_API}/?name=${name}`)
    const person = new Person({
        name,
        nationalityPrediction,
        genderPrediction: {
            name: gender.data.gender,
            probability: gender.data.probability,
            count: gender.data.count
        }
    });
    await person.save();
    return person;
}

export const PersonService = { GetOrCreate };