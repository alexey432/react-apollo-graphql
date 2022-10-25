import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import RemovePerson from '../buttons/RemovePerson'
import UpdatePerson from '../form/UpdatePerson'
// import RemoveContact from '../buttons/RemoveContact'
// import UpdateContact from '../forms/UpdateContact'

const getStyles = () => ({
    card: {
        width: '500px'
    }
})


const Person = ({ person }) => {
    const { id, firstName, lastName, cars } = person
    const styles = getStyles()

    const [editMode, setEditMode] = useState(false)

    const handleButtonClick = () => setEditMode(!editMode)

    return (
        <>
            {!editMode ? (
                <Card
                    style={styles.card}
                    actions={[
                        <EditOutlined key={'edit'} onClick={handleButtonClick} />,
                        <RemovePerson id={id} />
                    ]}
                    title={`${firstName} ${lastName}`}
                >

                    {cars.map(car => (
                        <Card.Grid key={car.id}>{car.make} {car.model}</Card.Grid>
                    ))}

                </Card>
            ) : (
                <UpdatePerson
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                    handleClick={handleButtonClick}
                />
            )}
        </>
    )
}

export default Person