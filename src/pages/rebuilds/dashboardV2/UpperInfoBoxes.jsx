import React, {useState, useEffect, useCallback} from 'react';
import { Col, Infobox } from 'adminlte-2-react';
import axios from 'axios';



const UpperInfoBoxes = () => {
  const Token = JSON.parse(localStorage.getItem('token'));
  

  const [Data, setData] = useState({
    jumlah_diklat : '...',
    sedang_diklat : '...',
    jumlah_sertifikat : '...',
    jumlah_pegawai : '...',
  })

  const GetData = useCallback(async () => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/dasboard`,{
      headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${Token}`
      }
    }).then(res => {
        setData(res.data)
    }).catch(err => {
        console.log(err)
    });
  }, [])


  const data = [{
    icon: 'ion-ios-gear-outline',
    color: 'aqua',
    number: [Data.jumlah_diklat, <small key="temp"> Data</small>],
    text: 'Jumlah Diklat',
  },
  {
    icon: 'fab-google-plus-g',
    color: 'red',
    number: [Data.sedang_diklat, <small key="temp"> Orang</small>],
    text: 'Sedang Diklat',
  },
  {
    icon: 'ion-ios-cart-outline',
    color: 'green',
    number: [Data.jumlah_sertifikat, <small key="temp"> Lembar</small>],
    text: 'Jumlah Sertifikat',
  },
  {
    icon: 'ion-ios-people-outline',
    color: 'yellow',
    number: [Data.jumlah_pegawai, <small key="temp"> Orang</small>],
    text: 'Jumlah Pegawai',
  }];


  useEffect(() => {
    GetData();
  }, [])

  return(
    data.map((props, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Col key={`upperInfoBox${index}`} xs={12} sm={6} md={3}>
        <Infobox {...props} />
      </Col>
    ))
  )
};

export default UpperInfoBoxes;
