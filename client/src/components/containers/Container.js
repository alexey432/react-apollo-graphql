import React from 'react';
import { Divider, Tabs } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import Title from '../layout/Title';
import CustomLink from '../navigation/CustomLink';
import AddPersonForm from '../form/AddPerson';
import PeopleWithCarsContainer from './PeopleWithCarsContainer';
import CarsContainer from './CarsContainer';
import UpdatePerson from '../form/UpdatePerson';
import AddCarForm from '../form/AddCar';


const Container = () => {
    return (
        <div className="App">
            <Title title={'PEOPLE AND THEIR CARS'} />
            <Divider />
            <Divider>
                <Title title={'Add Person'} />
            </Divider>
            <AddPersonForm />
            <Divider>
                <Title title={'Add Car'} />
            </Divider>
            <AddCarForm />
            <PeopleWithCarsContainer />
        </div>
    );
}

export default Container;
