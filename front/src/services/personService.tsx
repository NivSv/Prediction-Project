import { axios, BASE_URL } from "./httpService";


const ENDPOINT = "/graphql"

export type Person = {
    name: string;
    nationality: Array<Nationality>;
    gender: Gender;
}

type Nationality = {
    country: string;
    probability: number;
}

type Gender = {
    name: string;
    probability: number;
    count: number;
}

type GetPersonResponse = {
    data: {
        persons: Person[];
    }
};

type AddPersonResponse = {
    data: {
        add: Person;
    }
}


const getPersons = async (): Promise<GetPersonResponse|null> => {
    try {
        const { data, status } = await axios.post<GetPersonResponse>(BASE_URL + ENDPOINT, {
            query: `
        query persons {
            persons{
                name
                nationality{
                    country,
                    probability
                }
                gender{
                    name,
                    probability
                    count
                }
            }
        }
        `
        }, {
            headers: {
                Accept: 'application/json',
            },
        },
        );
        console.log(data);
        
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const addPerson = async (name:string): Promise<AddPersonResponse|null> => {
    try {
        const { data, status } = await axios.post<AddPersonResponse>(BASE_URL + ENDPOINT, {
            query: `
            mutation{
                add(name: "${name}"){
                    name,
                    nationality{
                        country,
                        probability
                    }
                    gender{
                        name,
                        probability
                        count
                    }
                }
            }
        `
        }, {
            headers: {
                Accept: 'application/json',
            },
        },
        );
        console.log(data);
        
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const personService = {
    getPersons,
    addPerson
}