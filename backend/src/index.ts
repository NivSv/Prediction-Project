import fastify, { FastifyInstance } from 'fastify'
import mercurius, { IResolvers, MercuriusLoaders } from 'mercurius'
import { connect } from 'mongoose';
import cors from '@fastify/cors'
import { resolvers } from './graphql/resolvers';
import { schemaGraphql } from './graphql/typeDef';

const server: FastifyInstance = fastify({
    logger: true // <- enable logger
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
        console.error(err) // <- log error
        process.exit(1) // <- exit process
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