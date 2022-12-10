import { gql } from '@apollo/client';
import { BASE_URL, client } from './apolloService';

const ENDPOINT = "/graphql"

export type Person = {
    id: string;
    name: string;
    nationality: Nationality[];
    gender: Gender;
}

type Nationality = {
    country: string;
    probability: number;
}

type Gender = {
    count: number;
    type: string;
    probability: number;
}

type PersonResponse = {
    person: Person[];
}

type AddPersonResponse = {
    addPerson: Person;
}


const getPersons = async (): Promise<Person[]> => {
    try {
        const res = await client.query<PersonResponse>({
            query: gql`
                query{
                    person{
                        id
                        name
                        nationality{
                            country
                            probability
                        }
                        gender{
                            type,
                            count
                            probability
                        }
                    }
                }
            `,
        })

        return res.data.person.map(person => {
            return {
                id: person.id,
                name: person.name,
                nationality: person.nationality,
                gender: person.gender,
            }
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}

const addPerson = async (name: string): Promise<Person | null> => {
    try {
        const res = await client.mutate<AddPersonResponse>({
            mutation: gql`
                mutation{
                    addPerson(name: "${name}"){
                        id
                        name
                        nationality{
                            country
                            probability
                        }
                        gender{
                            type,
                            count
                            probability
                        }
                    }
                }
            `,
        });
        if (!res.data) {
            return null;
        }
        return {
            id: res.data.addPerson.id,
            name: res.data.addPerson.name,
            nationality: res.data.addPerson.nationality,
            gender: res.data.addPerson.gender,
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const personService = {
    getPersons,
    addPerson
}