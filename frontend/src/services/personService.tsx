import { gql } from '@apollo/client';
import { BASE_URL, client } from './apolloService';

const ENDPOINT = "/graphql"

export type Person = {
    name: string;
    nationality: string;
    gender: string;
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
                        name
                        nationality
                        gender
                        probability
                    }
                }
            `,
        })

        return res.data.person.map(person => {
            return {
                name: person.name,
                nationality: person.nationality,
                gender: person.gender,
                probability: person.probability
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
                        name
                        nationality
                        gender
                        probability
                    }
                }
            `,
        });
        if (!res.data) {
            return null;
        }
        return {
            name: res.data.addPerson.name,
            nationality: res.data.addPerson.nationality,
            gender: res.data.addPerson.gender,
            probability: res.data.addPerson.probability
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