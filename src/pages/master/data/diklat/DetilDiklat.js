import React, { useState, useEffect } from 'react';
import {Content, Col, Row, Alert, Box, Button, Inputs} from 'adminlte-2-react';
import {useParams} from "react-router";
import axios from 'axios'

const DetilDiklat = () => {
    const { slug } = useParams();
    const [Data, setData] = useState({});
    const [Loading, setLoading] = useState(true);

    const GetData = async () => {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/diklat-detil?slug=${slug}`,{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            setData(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        });
        setLoading(false)
    }

    useEffect(() => {
        GetData();
    }, []);

    return(
        <div className='full-height'>
            <Content title="Detil Diklat">

            </Content>
        </div>
    )
}

export default DetilDiklat;