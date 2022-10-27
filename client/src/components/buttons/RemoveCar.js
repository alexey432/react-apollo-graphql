import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { GET_PEOPLE, REMOVE_CAR } from '../../queries';


const RemoveCar = ({ id }) => {

    const [removeCar] = useMutation(REMOVE_CAR, {
        update: (cache, { data: { removeCar } }) => {
            const data = cache.readQuery({ query: GET_PEOPLE });

            const newPeople = data.people.map(person => {
                return {
                    ...person,
                    cars: person.cars.filter(car => car.id !== removeCar.id)
                }
            })

            cache.writeQuery({
                query: GET_PEOPLE,
                data: {
                    people: [...newPeople]
                }
            });
        }
    })

    const handleRemove = () => {
        let result = window.confirm('Are you sure you want to delete this car?');
        if (result) {
            removeCar({
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

export default RemoveCar;
