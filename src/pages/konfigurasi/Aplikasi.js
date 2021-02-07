import React, {useState, useEffect} from 'react';
import {Content, Col, Row, Alert, Box, Inputs} from 'adminlte-2-react';
import axios from 'axios'
import swal from 'sweetalert';

const AplikasiKomponent = () => {
    const Token = JSON.parse(localStorage.getItem('token'));

    const {Text} = Inputs;
    const [Loading, setLoading] = useState(true)
    const [LoadingSimpan, setLoadingSimpan] = useState(false);
    const [Form, setForm] = useState({
        id : '',
        nama_aplikasi : '',
        singkatan_aplikasi : '',
        nama_instansi : '', 
        singkatan_instansi : '',
        kota : '',
        nama_ketua : '',
        nip_ketua : '',
        email : '',
        alamat : '',
        telpon : '',
        website : '',
        fax : '',
        kode_pos : '',
    })

    const GetData = async () => {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/konfig`,{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            setForm(res.data)
        }).catch(err => {
            console.log(err)
        });
        setLoading(false)
    }

    const OnChangeInput = (e) => {
        setForm({
            ...Form, [e.target.name] : e.target.value
        })
    }

    const ubahData = async () => {
        setLoadingSimpan(true)
        await axios({
            method: 'put',
            url: `${process.env.REACT_APP_BASE_URL}/api/konfig`,
            data: Form,
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

    useEffect(() => {
        GetData();
    }, [])

    return(
        <div className='full-height'>
           
            <Content title="Data Diklat">
                <Alert closable type="success" title="Konfigurasi Aplikasi" icon="fa-info">Halaman ini untuk mengubah konfigurasi sistem aplikasi</Alert>
                <Row>
                    <Col md={12}>
                        <Box title="Data Konfigurasi">
                            {
                                Loading ? 
                                <h1>Loading...</h1> :
                                <>
                                    <Text name="nama_aplikasi" value={Form.nama_aplikasi} onChange={OnChangeInput} placeholder="Masukan nama aplikasi" label="Nama Aplikasi" labelPosition="left" className='margin_kebawah' />
                                    <Text name="singkatan_aplikasi" value={Form.singkatan_aplikasi} onChange={OnChangeInput}  placeholder="Masukan singkatan aplikasi" label="Singkatan Aplikasi" labelPosition="left" /><br/>
                                    <Text name="nama_instansi" value={Form.nama_instansi} onChange={OnChangeInput}  placeholder="Masukan instansi" label="Nama Instansi" labelPosition="left" /><br/>
                                    <Text name="singkatan_instansi" value={Form.singkatan_instansi} onChange={OnChangeInput}  placeholder="Masukan singkatan instansi" label="Singkatan Instansi" labelPosition="left" /><br/>
                                    <Text name="kota" value={Form.kota} onChange={OnChangeInput}  placeholder="Masukan kota instansi" label="Kota Instansi" labelPosition="left" /><br/>
                                    <Text name="alamat" value={Form.alamat} onChange={OnChangeInput}  placeholder="Masukan alamat instansi" label="Alamat Instansi" labelPosition="left" /><br/>
                                    <Text name="kode_pos" value={Form.kode_pos} onChange={OnChangeInput}  placeholder="Masukan kode pos instansi" label="Kode Pos Instansi" labelPosition="left" /><br/>
                                    <Text name="telpon" value={Form.telpon} onChange={OnChangeInput}  placeholder="Masukan telpon instansi" label="Telpon Instansi" labelPosition="left" /><br/>
                                    <Text name="fax" value={Form.fax} onChange={OnChangeInput}  placeholder="Masukan fax instansi" label="Fax Instansi" labelPosition="left" /><br/>
                                    <Text name="website" value={Form.website} onChange={OnChangeInput}  placeholder="Masukan Website instansi" label="Website Instansi" labelPosition="left" /><br/>
                                    <Text name="email" value={Form.email} onChange={OnChangeInput}  placeholder="Masukan Email instansi" label="Email Instansi" labelPosition="left" /><br/>

                                    <Text name="nama_ketua" value={Form.nama_ketua} onChange={OnChangeInput}  placeholder="Masukan nama pimpinan" label="Nama Pimpinan" labelPosition="left" /><br/>
                                    <Text name="nip_ketua" value={Form.nip_ketua} onChange={OnChangeInput}  placeholder="Masukan nip pimpinan" label="NIP Pimpinan" labelPosition="left" /><br/>
                                    <br/>
                                    <button disabled={LoadingSimpan} onClick={ubahData} className="btn btn-success btn-block">{LoadingSimpan ? "Loading..." : "Simpan Data"}</button>
                                </>
                            }
                        </Box>
                    </Col>
                </Row>
            </Content>
        </div>
    )
}

const Aplikasi = React.memo(AplikasiKomponent);
export default Aplikasi;