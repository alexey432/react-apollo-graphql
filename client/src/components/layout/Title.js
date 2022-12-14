import React from 'react';

const getStyles = () => ({
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333',
        marginBotton: '2rem'
    }

})


const Title = ({ title }) => {
    const styles = getStyles();


    return (
        <h1 style={styles.title}>{title}</h1>
    );
}

export default Title;
