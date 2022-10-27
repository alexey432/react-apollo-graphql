import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../form/UpdatePerson'
import CarCard from './CarCard'

import { Link } from "react-router-dom";
// import RemoveContact from '../buttons/RemoveContact'
// import UpdateContact from '../forms/UpdateContact'

const getStyles = () => ({
    card: {
        width: '1250px',
        backgroundColor: '#f5f5f5',
        border: '1px solid #000',
    },
    bwBg: {
        backgroundColor: '#000',
        color: '#fff',
    },
    backBtn: {
        display: 'inline-block',
        backgroundColor: '#000',
        color: '#fff',
        padding: '10px 15px',
        borderRadius: '5px',
        marginTop: '10px',

    }
})


const PersonWithCars = ({ person, actionsPanel = true }) => {
    const { id, firstName, lastName, cars } = person
    const styles = getStyles()

    const [editPersonMode, setEditPersonMode] = useState(false)
    // const [editCarMode, setEditCarMode] = useState(false)

    const handleEditPerson = () => setEditPersonMode(!editPersonMode)
    // const handleEditCar = () => setEditCarMode(!editCarMode)

    const actions = actionsPanel ? [
        <EditOutlined key={'edit'} onClick={handleEditPerson} />,
        <RemovePerson id={id} />] : null;

    return (
        <>
            {!editPersonMode ? (
                <Card
                    style={styles.card}
                    actions={actions}
                    title={`${firstName} ${lastName}`}
                    headStyle={styles.bwBg}
                >

                    {/* Map here with cars */}
                    {cars.map(car => (
                        <CarCard key={car.id} car={car} actionsPanel={actionsPanel} />
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

                    {actionsPanel ? <Link to={`/people/${person.id}`}>Learn more</Link> : <Link to={`/`} style={styles.backBtn}>Back</Link>}
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