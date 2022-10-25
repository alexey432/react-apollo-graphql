import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import UpdateCarForm from '../form/UpdateCar'
// import RemoveContact from '../buttons/RemoveContact'
// import UpdateContact from '../forms/UpdateContact'
import { GET_PERSON } from '../../queries';
import { useQuery } from "@apollo/client";

const getStyles = () => ({
    card: {
        // width: '500px'
    }
})


const CarCard = ({ car }) => {

    const { id, year, make, model, price } = car

    const styles = getStyles()

    const [editCarMode, setEditCarMode] = useState(false)
    const handleEditCar = () => setEditCarMode(!editCarMode)

    return (
        <>
            {!editCarMode ? (
                <Card
                    key={id}
                    title={`${year} ${make} ${model} -> $ ${price}`}
                    type="inner"
                    style={{ marginBottom: '10px' }}
                    actions={[
                        <EditOutlined key={'edit'} onClick={handleEditCar} />,
                        <RemovePerson id={id} />
                    ]}
                >
                </Card>
            ) : (
                <UpdateCarForm
                    car={car}
                    handleClick={handleEditCar}
                />
            )}
        </>
    )
}

export default CarCard