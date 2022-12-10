import { gql } from "mercurius-codegen";

export const schemaGraphql = gql`
    type Person {
        id:ID,
        name: String
        nationality:[Nationality]
        gender: Gender
    }

    type Gender {
        type:String,
        count: Int,
        probability: Float
    }

    type Nationality {
        country:String,
        probability: Float
    }

    type Query {
        person: [Person]
        personByName(name:String): Person
    }

    type Mutation {
        addPerson(name:String!): Person!
    }
`;

// const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
//     return {
//         authorization: req.headers.authorization,
//     }
// }

// declare module 'mercurius' {
//     interface MercuriusContext
//         extends PromiseType<ReturnType<typeof buildContext>> { }
// }

// const loaders: MercuriusLoaders = {
//     person: {
//         async nationality(queries, _ctx) {
//             return await Promise.all(queries.map(async ({ obj }) => {
//                 const entity = await Person.findOne({ name: obj.name })
//                 return entity?.nationalityPrediction
//             }))
//         },
//         async gender(queries, _ctx) {
//             return await Promise.all(queries.map(async ({ obj }) => {
//                 const entity = await Person.findOne({ name: obj.name })
//                 return entity?.genderPrediction
//             }))
//         },
//     },
// }