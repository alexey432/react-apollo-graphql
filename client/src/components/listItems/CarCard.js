import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemoveCar from '../buttons/RemoveCar'
import UpdateCarForm from '../form/UpdateCar'
// import RemoveContact from '../buttons/RemoveContact'
// import UpdateContact from '../forms/UpdateContact'


const getStyles = () => ({
    card: {
        // width: '500px'
        marginBottom: '10px'
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
                    style={styles.card}
                    key={id}
                    title={`${year} ${make} ${model} -> $ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                    type="inner"
                    actions={[
                        <EditOutlined key={'edit'} onClick={handleEditCar} />,
                        <RemoveCar id={id} />
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