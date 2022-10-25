import React from 'react';
import { Tabs } from 'antd';
import { Outlet, Link } from 'react-router-dom';
import Title from '../layout/Title';
import CustomLink from '../navigation/CustomLink';

const Container = () => {
    return (
        <div className="App">
            <div>
                <CustomLink to={'/people'}>People</CustomLink>
                <CustomLink to={'/cars'} >Cars</CustomLink>
            </div>

            <Outlet />
        </div>
    );
}

export default Container;
