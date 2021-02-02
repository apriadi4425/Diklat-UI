import React, { Component } from 'react';
import { Content, Row } from 'adminlte-2-react';
import { Redirect } from 'react-router-dom';


const Index = () => {
    return(
        <Redirect to={'/app/beranda'}/>
    )
}

export default Index;
