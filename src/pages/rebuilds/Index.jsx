import React, { Component } from 'react';
import { Content, Row } from 'adminlte-2-react';
import { Redirect } from 'react-router-dom';
import 'moment/locale/id';


const Index = () => {
    return(
        <Redirect to={'/app/beranda'}/>
    )
}

export default Index;
