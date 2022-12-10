import { IResolvers } from "mercurius";
import { Person } from "../models/person.entity";
import { ApiService } from "../services/api.service";

export const resolvers: IResolvers = {
    Query: {
        person() {
            //Getting all the persons from the database
            return Person.find();
        },
        personByName(_, { name }) {
            //Getting a person by name from the database
            return Person.findOne({name});
        }
    },
    Mutation: {
        async addPerson(root, { name }, ctx, info) {
            //Checking if the person already exists            
            const entity = await Person.findOne({name});
            if(entity)
                return entity;
            //Getting vaules from the api
            const getGender = await ApiService.getGender(name);
            const getNationality = await ApiService.getNationality(name);
            //Calculating the probability of both nationality and gender
            const probability = getGender.probability * getNationality.probability;
            //creating a new person
            const person = new Person({
                name:name,
                gender: getGender.gender,
                nationality: getNationality.country,
                probability: probability
            })
            await person.save();
            return person;
        }
    }
}