import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { REMOVE_PERSON, GET_PEOPLE } from '../../queries';


const RemovePerson = ({ id }) => {

    const [removePerson] = useMutation(REMOVE_PERSON, {
        update: (cache, { data: { removePerson } }) => {
            const data = cache.readQuery({ query: GET_PEOPLE });

            cache.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: data.people.filter(person => person.id !== removePerson.id)
                }
            });
        }
    })

    const handleRemove = () => {
        let result = window.confirm('Are you sure you want to delete this person?');
        if (result) {
            removePerson({
                variables: {
                    id
                },
            })
        }

    }


    return (
        <DeleteOutlined key={'delete'} onClick={handleRemove} style={{ color: 'red' }} />
    );
}

export default RemovePerson;
