import { gql } from "mercurius-codegen";

export const schemaGraphql = gql`
    type Person {
        id:ID,
        name: String
        nationality:String
        gender: String
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

// const resolvers: IResolvers = {
//     Query: {
//         async persons() {
//             return (await Person.find()).map(person => { return { name: person.name } });
//         },
//     },
//     Mutation: {
//         async add(root, { name }, ctx, info) {
//             // root ~ {}
//             root
//             // name ~ string
//             name
//             // ctx.authorization ~ string | undefined
//             ctx.authorization
//             // info ~ GraphQLResolveInfo
//             info

//             // return { name }
//             return { name: (await PersonService.GetOrCreate(name)).name };
//         },
//     },
// }


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

// codegenMercurius(server, {
//     targetPath: './src/graphql/generated.ts',
//     operationsGlob: './src/graphql/operations/*.gql',
//     codegenConfig: {
//         loadersCustomParentTypes: {
//             Human: 'never',
//         },
//     },
// }).catch(console.error)