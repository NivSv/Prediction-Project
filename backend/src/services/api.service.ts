import axios from 'axios';
import { GENDERIZE_API, NATIONALIZE_API } from '../constants/apis.constant';

type nationalityResponse = {
    country: string
    probability: number
}

type genderResponse = {
    gender: string
    probability: number
}

const getNationality = async (name:string):Promise<nationalityResponse>  => {
    const nationality = await axios.get(`${NATIONALIZE_API}/?name=${name}`);
    return {
        country:nationality.data.country[0].country_id,
        probability:nationality.data.country[0].probability
    }
}

const getGender = async (name:string):Promise<genderResponse>  => {
    const gender = await axios.get(`${GENDERIZE_API}/?name=${name}`);
    return {
        gender:gender.data.gender,
        probability:gender.data.probability
    }
}

export const ApiService = { getNationality,getGender }