import fastify, { FastifyInstance } from 'fastify'
import mercurius, { IResolvers, MercuriusLoaders } from 'mercurius'
import { connect } from 'mongoose';
import cors from '@fastify/cors'
import { resolvers } from './graphql/resolvers';
import { schemaGraphql } from './graphql/typeDef';

const server: FastifyInstance = fastify({
    logger: true
});

server.register(cors, {
    origin: '*', // <- allow request from all domains
});

server.register(mercurius, {
    schema : schemaGraphql,
    resolvers: resolvers
})

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