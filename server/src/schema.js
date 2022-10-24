import { gql } from "apollo-server-express";
// import { ApolloServer } from "apollo-server-express";
import { people, cars } from "./peopleCarsScheme";


const typeDefs = gql`
    type Person {
        id: ID!
        firstName: String!
        lastName: String!
        cars: [Car]
    }

    type Car {
        id: ID!
        year: String!
        make: String!
        model: String!
        price: String!
        person: Person
    }

    type Query {
        person(id: String!): Person
        people: [Person]
        car(id: String!): Car
        cars: [Car]
    }

    type Mutation {
        addPerson(id: String!, firstName: String!, lastName: String!): Person
        updatePerson(id: String!, firstName: String!, lastName: String!): Person
        removePerson(id: String!): Person
    }
`;

const resolvers = {
    Query: {
        people: () => people,
        cars: () => cars,
        person: (parent, args, context, info) => {
            return people.find(person => person.id === args.id);
        }
    },
    Mutation: {
        addPerson: (root, args) => {
            const newPerson = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
            };
            people.push(newPerson);
            return newPerson;
        },
        updatePerson: (root, args) => {
            const person = people.find(person => person.id === args.id);
            person.firstName = args.firstName;
            person.lastName = args.lastName;
            return person;
        },
        removePerson: (root, args) => {
            const person = people.find(person => person.id === args.id);
            people.splice(people.indexOf(person), 1);
            return person;
        }
    },
    // Person: {
    //     cars: (parent) => {
    //         return cars.filter(car => car.personId === parent.id);
    //     }
    // },
    // Car: {
    //     person: (parent) => {
    //         return people.find(person => person.id === parent.personId);
    //     }
    // }
};

export { typeDefs, resolvers };