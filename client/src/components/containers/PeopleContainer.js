import React from 'react';
import AddPersonForm from '../form/AddPerson';
import People from '../lists/People';

const PeopleContainer = () => {
    return (
        <div>
            <AddPersonForm />
            <People />
        </div>
    );
}

export default PeopleContainer;
