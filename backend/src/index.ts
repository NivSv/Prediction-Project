import axios from 'axios';
import fastify, { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import mercurius, { IResolvers, MercuriusLoaders } from 'mercurius'
import { codegenMercurius, gql } from 'mercurius-codegen'
import { connect } from 'mongoose';
import { Person } from './person/person.schema';
import { PersonService } from './person/person.service';
import cors from '@fastify/cors'

const server: FastifyInstance = fastify({
    maxParamLength: 5000,
});

server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
})

const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
    return {
        authorization: req.headers.authorization,
    }
}

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T

declare module 'mercurius' {
    interface MercuriusContext
        extends PromiseType<ReturnType<typeof buildContext>> { }
}

const schema = gql`
    type person {
        name: String!
        nationality: [nationality]
        gender: gender
    }
    type nationality {
        country: String!
        probability: Float!
    }
    type gender {
        name: String!
        probability: Float!
        count: Int!
    }
    type Query {
        persons: [person!]!
    }
    type Mutation {
      add(name: String!): person!
    }
  `

const resolvers: IResolvers = {
    Query: {
        async persons() {
            return (await Person.find()).map(person => { return { name: person.name } });
        },
    },
    Mutation: {
        async add(root, { name }, ctx, info) {
            // root ~ {}
            root
            // name ~ string
            name
            // ctx.authorization ~ string | undefined
            ctx.authorization
            // info ~ GraphQLResolveInfo
            info

            // return { name }
            return { name: (await PersonService.GetOrCreate(name)).name };
        },
    },
}

const loaders: MercuriusLoaders = {
    person: {
        async nationality(queries, _ctx) {
            return await Promise.all(queries.map(async ({ obj }) => {
                const entity = await Person.findOne({ name: obj.name })
                return entity?.nationalityPrediction
            }))
        },
        async gender(queries, _ctx) {
            return await Promise.all(queries.map(async ({ obj }) => {
                const entity = await Person.findOne({ name: obj.name })
                return entity?.genderPrediction
            }))
        },
    },
}

server.register(mercurius, {
    schema,
    resolvers,
    loaders,
    context: buildContext,
})

// codegenMercurius(server, {
//     targetPath: './src/graphql/generated.ts',
//     operationsGlob: './src/graphql/operations/*.gql',
//     codegenConfig: {
//         loadersCustomParentTypes: {
//             Human: 'never',
//         },
//     },
// }).catch(console.error)

server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    connect('mongodb://root:example@localhost:27017/', { dbName: 'PredictionDB', })
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err.message);
        });
    console.log(`Server listening at ${address}`)
})