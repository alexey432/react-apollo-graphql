import { gql } from "@apollo/client";

export const GET_PEOPLE = gql`
    query GetPeople {
        people {            
            id
            firstName
            lastName,
            cars {
                id
                year
                make
                model
                price
                personId
            }
        }
    }
`;

export const GET_PERSON = gql`
    query GetPerson($personId: String!) {
        person(id: $personId) {            
            id
            firstName
            lastName,
            cars {
                id
                year
                make
                model
                price
                personId
            }
        }
    }
`;

export const ADD_PERSON = gql`
    mutation AddPerson($id: String!, $firstName: String!, $lastName: String!) {
        addPerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

export const REMOVE_PERSON = gql`
    mutation RemovePerson($id: String!) {
        removePerson(id: $id) {
            id
            firstName
            lastName
        }   
    }
`;

export const UPDATE_PERSON = gql`
    mutation UpdatePerson($id: String!, $firstName: String!, $lastName: String!) {
        updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
            id
            firstName
            lastName
        }
    }
`;

