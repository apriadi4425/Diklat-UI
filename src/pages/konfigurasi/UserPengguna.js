import React, { useState, useEffect } from 'react';
import {Content, Col, Row, Alert, Box, Inputs} from 'adminlte-2-react';
import axios from 'axios'
import swal from 'sweetalert';

const UserPenggunaKomponent = () => {
    const Token = JSON.parse(localStorage.getItem('token'));
    const [Loading, setloading] = useState(true)
    const [Data, setData] = useState({})
    const [LoadingSimpan, setLoadingSimpan] = useState(false);
    const [DoUbahPassword, setDoUbahPassword] = useState(false);
    const [Form, setForm] = useState({
        password : '', c_password  : ''
    })
    const {Text} = Inputs;
    const GetData = async () => {
        setloading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/user-detail`,{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        });
        setloading(false)
    }

    const OnChangeInput = (e) => {
        setData({
            ...Data, [e.target.name] : e.target.value
        })
    }

    const UpdatePegawai = async () => {
        setLoadingSimpan(true)
        await axios({
            method: 'put',
            url: `${process.env.REACT_APP_BASE_URL}/api/user`,
            data: Data,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
          }).then(res => {
            swal("Data berhasil diubah", {
                icon: "success",
              });
          }).catch(function (error) {
            if(error.response){
                console.log(error.response)
            }
          });
          setLoadingSimpan(false)
    }

    const UbahPassword = async () => {
        setLoadingSimpan(true)
        await axios({
            method: 'put',
            url: `${process.env.REACT_APP_BASE_URL}/api/user-password`,
            data: {
                id : Data.id,
                password : Form.password
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            swal("Password berhasil diubah", {
                icon: "success",
            });
            setDoUbahPassword(false)
        }).catch(function (error) {
            if(error.response){
                console.log(error.response)
            }
        });
        setLoadingSimpan(false)
    }


    useEffect(() => {
        GetData();
    }, [])
    return(
        <div className='full-height'>
            <div className='untuk_menutupi text-center'>
          <p className='text_judul'>SI-STUDILA</p>
        </div>
            <Content title="Data Diklat">
                <Alert closable type="success" title="Konfigurasi Pengguna" icon="fa-info">Halaman ini untuk mengubah konfigurasi pengguna</Alert>
                <Row>
                    <Col md={12}>
                        <Box title="Data Pengguna"
                        customOptions={
                           <button onClick={() => setDoUbahPassword(!DoUbahPassword)} className='btn btn-warning btn-sm'>{DoUbahPassword ? 'Batal' : 'Ubah Password'}</button>
                        }>
                            {
                                Loading ? 
                                <h1>Loading...</h1> :
                                
                                DoUbahPassword ?
                                <>
                                    <Text inputType="password" name="password" value={Form.password} onChange={(e) => setForm({...Form, password : e.target.value })}  placeholder="Masukan password" label="Password Baru" labelPosition="above"/>
                                    <Text inputType="password" name="c_password" value={Form.c_password} onChange={(e) => setForm({...Form, c_password : e.target.value })} placeholder="Masukan nama" label="Konfirmasi Password" labelPosition="above"/>
                                    <button disabled={LoadingSimpan} onClick={UbahPassword} className="btn btn-success btn-block">{LoadingSimpan ? "Loading..." : "Ubah Password"}</button>
                                </> :
                                <>
                                    <Text name="name" value={Data.name} onChange={OnChangeInput} placeholder="Masukan nama" label="Nama Pengguna" labelPosition="left" className='margin_kebawah' /><p style={{color : 'white'}}> i</p>
                                    <Text name="nip" value={Data.nip} onChange={OnChangeInput} placeholder="Masukan NIP" label="NIP Pengguna" labelPosition="left" className='margin_kebawah' /><p style={{color : 'white'}}> i</p>
                                    <Text name="jabatan" value={Data.jabatan} onChange={OnChangeInput} placeholder="Masukan Jabatan" label="Jabatan Pengguna" labelPosition="left" className='margin_kebawah' /><p style={{color : 'white'}}> i</p>
                                    <Text name="pangkat" value={Data.pangkat} onChange={OnChangeInput} placeholder="Masukan Pangkat" label="Pangkat Pengguna" labelPosition="left" className='margin_kebawah' /><p style={{color : 'white'}}> i</p>
                                    <Text name="golongan" value={Data.golongan} onChange={OnChangeInput} placeholder="Masukan Golongan" label="Golongan Pengguna" labelPosition="left" className='margin_kebawah' /><p style={{color : 'white'}}> i</p>
                                    <Text name="email" value={Data.email} onChange={OnChangeInput} placeholder="Masukan email" label="Email Pengguna" labelPosition="left" className='margin_kebawah' /><p style={{color : 'white'}}> i</p>
                                    <button disabled={LoadingSimpan} onClick={UpdatePegawai} className="btn btn-success btn-block">{LoadingSimpan ? "Loading..." : "Simpan Data"}</button>
                                </>
                            }
                        </Box>
                    </Col>
                </Row>
            </Content>
        </div>
    )
}
const MyProfile = React.memo(UserPenggunaKomponent);
export default MyProfile;