import React from 'react';
import { Spin } from 'antd';
import { useQuery } from "@apollo/client";
import { GET_PERSON } from '../queries';
import PersonWithCars from '../components/listItems/PersonWithCars';
import { useParams } from 'react-router-dom';

const getStyles = () => ({
    showPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2rem',
    }

})


const ShowPage = () => {
    const styles = getStyles();
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { personId: id }
    });

    // if Error
    if (error) return <p>{error.message}</p>;

    const person = data?.person;

    return (
        <div style={styles.showPage}>
            {loading ? (<Spin />) : (
                <PersonWithCars person={person} actionsPanel={false} />
            )}
        </div>
    );
}

export default ShowPage;
