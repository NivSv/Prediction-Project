import { IResolvers } from "mercurius";
import { Person } from "../models/person.entity";
import { ApiService } from "../services/api.service";

export const resolvers: IResolvers = {
    Query: {
        async person() {
            //Getting all the persons from the database
            return await Person.find();
        },
        async personByName(_, { name }) {
            //Getting a person by name from the database
            return await Person.findOne({ name });
        }
    },
    Mutation: {
        async addPerson(root, { name }, ctx, info) {
            //Checking if the person already exists            
            const entity = await Person.findOne({ name });
            if (entity)
                return entity;
            //Getting vaules from the api
            const getGender = await ApiService.getGender(name);
            const getNationality = await ApiService.getNationality(name);
            //creating a new person
            const person = new Person({
                name: name,
                gender: {
                    type: getGender.gender,
                    probability: getGender.probability,
                    count: getGender.count
                },
                nationality: getNationality,
            })
            console.log(person);
            
            await person.save();
            return person;
        }
    }
}
