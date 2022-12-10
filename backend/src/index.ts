import fastify, { FastifyInstance } from 'fastify'
import mercurius from 'mercurius'
import { connect } from 'mongoose';
import cors from '@fastify/cors'
import { resolvers } from './graphql/resolvers';
import { schemaGraphql } from './graphql/typeDef';
import codegenMercurius from 'mercurius-codegen';

const server: FastifyInstance = fastify({
    logger: true
});

server.register(cors, {
    origin: '*',
});

server.register(mercurius, {
    schema : schemaGraphql,
    resolvers: resolvers
})

codegenMercurius(server, {
    targetPath: './src/graphql/generated.ts',
  }).catch(console.error)

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