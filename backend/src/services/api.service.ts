import axios from 'axios';
import { GENDERIZE_API, NATIONALIZE_API } from '../constants/apis.constant';

// response types
type nationalityResponse = {
    country: string
    probability: number
}

type genderResponse = {
    count: number,
    gender: string
    probability: number
}

const getNationality = async (name: string): Promise<nationalityResponse[]> => {
    const nationality = await axios.get(`${NATIONALIZE_API}/?name=${name}`);
    return nationality.data.country.map((country: any) => {
        return {
            country: country.country_id,
            probability: country.probability
        }
    });
}

const getGender = async (name: string): Promise<genderResponse> => {
    const gender = await axios.get(`${GENDERIZE_API}/?name=${name}`);
    return {
        gender: gender.data.gender,
        probability: gender.data.probability,
        count: gender.data.count
    }
}

export const ApiService = { getNationality, getGender }