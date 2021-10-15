import { ApolloServer, gql } from "apollo-server";
import { IResolverObject } from "graphql-tools";
import { StarWarsDataSource } from "./Datasources/StarWarsDataSource";
import dotenv from "dotenv";

dotenv.config(); //For env

const typeDefs = gql`
  type Person {
    name: String
    height: String
    mass: String
    gender: String
    homeworld: String
  }

  type Query {
    people(pageNumber: Int!): [Person!]!
    person(personName: String!): Person
  }
`;

const resolvers: IResolverObject = {
  Query: {
    people: (_, { pageNumber }, { dataSources }) => {
        return dataSources.starWarsAPI.getAllPeople(pageNumber);
    },
    person: (_, { personName }, { dataSources })=>{
        return dataSources.starWarsAPI.getPersonByName(personName);
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    starWarsAPI: new StarWarsDataSource()
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
