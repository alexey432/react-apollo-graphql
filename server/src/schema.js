import { gql } from "apollo-server-express";
// import { ApolloServer } from "apollo-server-express";
import { people, cars } from "./peopleCarsScheme";


const typeDefs = gql`
    type Car {
        id: String!
        year: String!
        make: String!
        model: String!
        price: String!
        personId: String!
    }
    
    type Person {
        id: String!
        firstName: String!
        lastName: String!
        cars: [Car]
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
        people: () => {
            const newPeople = people.map(person => {
                person.cars = cars.filter(car => car.personId === person.id);
                return person;
            });
            return newPeople;
        },
        cars: () => cars,
        person: (parent, args, context, info) => {
            const person = people.find(person => person.id === args.id);

            return {
                ...person,
                cars: cars.filter(car => car.personId === person.id)
            };
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