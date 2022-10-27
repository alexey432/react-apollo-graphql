import React from 'react';
import { Divider } from 'antd';
import Title from '../layout/Title';
import AddPersonForm from '../form/AddPerson';
import AddCarForm from '../form/AddCar';
import PeopleWithCars from '../lists/PeopleWithCars';


const ContainerHome = () => {
    return (
        <div className="App">
            <Title title={'PEOPLE AND THEIR CARS'} />

            <Divider />

            <Divider>
                <Title title={'Add Person'} />
            </Divider>

            {/* Add Person Form */}
            <AddPersonForm />

            <Divider>
                <Title title={'Add Car'} />
            </Divider>

            {/* Add Car Form */}
            <AddCarForm />

            {/* List */}
            <PeopleWithCars />
        </div>
    );
}

export default ContainerHome;
