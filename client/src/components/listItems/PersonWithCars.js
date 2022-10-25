import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../form/UpdatePerson'
import CarCard from './CarCard'
// import RemoveContact from '../buttons/RemoveContact'
// import UpdateContact from '../forms/UpdateContact'

const getStyles = () => ({
    card: {
        width: '1250px'
    }
})


const PersonWithCars = ({ person }) => {
    const { id, firstName, lastName, cars } = person
    const styles = getStyles()

    const [editPersonMode, setEditPersonMode] = useState(false)
    // const [editCarMode, setEditCarMode] = useState(false)

    const handleEditPerson = () => setEditPersonMode(!editPersonMode)
    // const handleEditCar = () => setEditCarMode(!editCarMode)

    return (
        <>
            {!editPersonMode ? (
                <Card
                    style={styles.card}
                    actions={[
                        <EditOutlined key={'edit'} onClick={handleEditPerson} />,
                        <RemovePerson id={id} />
                    ]}
                    title={`${firstName} ${lastName}`}
                    extra={<a href="#">More</a>}
                >

                    {/* Map here with cars */}
                    {cars.map(car => (
                        <CarCard key={car.id} car={car} />
                        // <Card
                        //     key={car.id}
                        //     title={`${car.make} ${car.model}`}
                        //     type="inner"
                        //     style={{ marginBottom: '10px' }}
                        //     actions={[
                        //         <EditOutlined key={'edit'} onClick={handleEditCar} />,
                        //         <RemovePerson id={car.id} />
                        //     ]}
                        // >
                        // </Card>

                    ))}

                </Card>
            ) : (
                <UpdatePerson
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    handleClick={handleEditPerson}
                />
            )}
        </>
    )
}

export default PersonWithCars