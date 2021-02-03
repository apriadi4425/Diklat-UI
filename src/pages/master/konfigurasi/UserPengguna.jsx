import React, {useEffect, useState} from 'react';
import {Content, Col, Row, DataTable, Alert, Box, Button, Inputs} from 'adminlte-2-react';
import axios from 'axios'


  const UserPengguna = () => {

    const Token = JSON.parse(localStorage.getItem('token'));
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true)
    const [modal1, setmodal1] = useState(false)
    const [Form, setForm] = useState({
        name : '', jabatan : '', email : '', pangkat : '', golongan : '', password : '', c_password : '', id : ''
    })
    const [ErrorPass, setErrorPass] = useState(false)
    const [LoadingButtonTambah, setLoadingButtonTambah] = useState(false)
    const {Text} = Inputs;

    const firstColumns = [
        { title: 'Nama', data: 'name' },
        { title: 'Jabatan', data: 'jabatan' },
        { title: 'Email', data: 'email' },
        { title: 'Pangkat', data: 'pangkat' },
        { title: 'Golongan', data: 'golongan' },
    ];

    const GetData = async () => {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users`,{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            setData(res.data)
        }).catch(err => {
            console.log(err)
        });
        setLoading(false)
    }

    const TambahPegawai = async () => {
       if(Form.c_password !== Form.password){
        setErrorPass(true);
       }else{
        setLoadingButtonTambah(true)
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/api/user`,
            data: Form,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
          }).then(res => {
                setmodal1(false);
                setForm({ name : '', jabatan : '', email : '', pangkat : '', golongan : '', password : '', c_password : '', id : ''});
                GetData();

          }).catch(function (error) {
            if(error.response){
                console.log(error.response)
            }
          });
          setLoadingButtonTambah(false)
       }
    }

    const UpdatePegawai = async () => {
         setLoadingButtonTambah(true)
         await axios({
             method: 'put',
             url: `${process.env.REACT_APP_BASE_URL}/api/user`,
             data: Form,
             headers: {
                 Accept: 'application/json',
                 Authorization: `Bearer ${Token}`
             }
           }).then(res => {
                 setmodal1(false);
                 setForm({ name : '', jabatan : '', email : '', pangkat : '', golongan : '', password : '', c_password : '', id : ''});
                 GetData();
 
           }).catch(function (error) {
             if(error.response){
                 console.log(error.response)
             }
           });
           setLoadingButtonTambah(false)
     }


    useEffect(() => {
        GetData();
    }, [])
    
   
      return(
        <div className='full-height'>
            <Content title="User Pengguna">
                <Alert closable type="success" title="Informasi Umum" icon="fa-info">Halaman ini untuk menambahkan user pengguna/pejabat untuk dipilih sebagai peserta</Alert>
                <Row>
                    <Col md={12}>
                    <Box title="Daftar Pengguna Sistem" customOptions={
                        <div><button className='btn btn-success btn-sm' onClick={() => {
                            setForm({ name : '', jabatan : '', email : '', pangkat : '', golongan : '', password : '', c_password : '', id : ''});
                            setmodal1(true)
                        }}>Tambah pengguna</button></div>
                    }>
                        <div className={'table-responsive'}>
                            {
                                Loading ?
                                    <h2 className='text-center mt-3 mb-3'>Loading...</h2> :
                                    <DataTable
                                        columns={firstColumns.concat([{
                                            title: 'Actions',
                                            data: null,
                                            render: () => <Button text="Ubah" className="on-click-event" />,
                                        }])}
                                        options={{
                                            paging: true,
                                            lengthChange: true,
                                            searching: true,
                                            ordering: false,
                                            info: true,
                                            autoWidth: false,
                                        }}
                                        data={Data}
                                        onClickEvents={{
                                            onClickEvent: (data, rowIdx, rowData) => {
                                                setForm(data);
                                                setmodal1(true)
                                            },
                                        }}
                                        footer
                                        />
                            }
                            
                        </div>
                    </Box>
                    </Col>
                </Row>
            </Content>
            <Content title={Form.id === '' ? 'Tambah Pengguna' : 'Ubah Pengguna'} modal onHide={() => setmodal1(false)} modalFooter={
                <React.Fragment>
                    <Button text='Tutup' pullLeft onClick={() => setmodal1(false)} />
                    <Button type='primary' disabled={LoadingButtonTambah} text={!LoadingButtonTambah ? Form.id === '' ? 'Tambah Pegawai' : 'Ubah Data Pegawai' : 'Loading...'} onClick={() => {
                        if(Form.id === ''){
                            TambahPegawai();
                        }else{
                            UpdatePegawai();
                        }
                    }} />
                </React.Fragment>
            } show={modal1}>
                    <Text name="name" value={Form.name} onChange={(e) => setForm({...Form, name : e.target.value})} placeholder="Masukan nama" label="Nama Pegawai" labelPosition="above" />
                    <Text name="email" value={Form.email} onChange={(e) => setForm({...Form, email : e.target.value})}  placeholder="Masukan Email" label="Email Pegawai" labelPosition="above" />
                    <Text name="nip" value={Form.nip} onChange={(e) => setForm({...Form, nip : e.target.value})}  placeholder="Masukan NIP" label="NIP Pegawai" labelPosition="above" />
                    <Text name="jabatan" value={Form.jabatan} onChange={(e) => setForm({...Form, jabatan : e.target.value})}  placeholder="Masukan Jabatan" label="Jabatan Pegawai" labelPosition="above" />
                    <Text name="pangkat" value={Form.pangkat} onChange={(e) => setForm({...Form, pangkat : e.target.value})}  placeholder="Masukan Pangkat" label="Pangkat Pegawai" labelPosition="above" />
                    <Text name="golongan" value={Form.golongan} onChange={(e) => setForm({...Form, golongan : e.target.value})}  placeholder="Masukan Golongan" label="Golongan Pegawai" labelPosition="above" />
                    {
                        Form.id === '' ?
                        <React.Fragment>
                            <Text name="password_pengguna" value={Form.password} onChange={(e) => setForm({...Form, password : e.target.value})}  placeholder="Password" label="Password Pengguna"  labelPosition="above" inputType="password"  />
                            <Text name="konfirmasi_passowrd" value={Form.c_password} onChange={(e) => setForm({...Form, c_password : e.target.value})}  placeholder="Konfirmasi Password" label="Konfirmasi Password"  labelPosition="above" inputType="password" />
                        </React.Fragment>
                        : null
                    }
            </Content>
        </div>
      )
  }

  export default UserPengguna;