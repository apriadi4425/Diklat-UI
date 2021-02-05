import React, { useState, useEffect, useCallback } from 'react';
import {Content, Col, Row, Alert, Box, Button, Inputs} from 'adminlte-2-react';
import ModalSuratTugas from './ModalSuratTugas';
import ModalEditDiklat from './ModalEditDiklat';
import ModalEditSuratTugas from './ModalEditSuratTugas';
import axios from 'axios'
import moment from 'moment';
import swal from 'sweetalert';

const DetilDiklat = ({match}) => {
    const Token = JSON.parse(localStorage.getItem('token'));
    const slug = match.params.slug;
  
    const [Data, setData] = useState({});
    const [Loading, setLoading] = useState(true);
    const [DataSuratTugas, setDataSuratTugas] = useState({id_diklat : '', id : '', nomor_surat_tugas : '', tanggal_surat_tugas : '', peserta : []})
    const [Users, setUsers] = useState([])
    const [modalSuratTugas, setModalSuratTugas] = useState(false);
    const [modalEdit, setmodalEdit] = useState(false);
    const [modalEditSuratTugas, setmodalEditSuratTugas] = useState(false);

    const TogleModalSuratTugas = useCallback(() => {
        setModalSuratTugas(!modalSuratTugas)
    }, [modalSuratTugas])

    const TogleModalEditDiklat = useCallback(() => {
        setmodalEdit(!modalEdit)
    }, [modalEdit])

    const TogleModalEditSuratTugas = useCallback(() => {
        setmodalEditSuratTugas(!modalEditSuratTugas)
    }, [modalEditSuratTugas])

    const GetData = useCallback(async () => {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/diklat-detil?slug=${slug}`,{
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
    }, [])

    const GetUsers = async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/users2`,{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            setUsers(res.data)
        }).catch(err => {
            console.log(err)
        });
    }

    const PeringatanHapus = (IdSuratTugas) => {
        swal({
            title: "Data Akan Dihapus",
            text: "ketika dihapus data tidak akan bisa dikembalikan",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                DeleteSuratTugas(IdSuratTugas)
            } else {
              swal("Data tidak jadi dihapus");
            }
          });
    }

    const DeleteSuratTugas = async (IdSuratTugas) => {
        setLoading(true)
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/surat-tugas/${IdSuratTugas}`,{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            swal("Data berhasil dihapus", {
                icon: "success",
              });
            GetData();
        }).catch(err => {
            console.log(err)
        });
        setLoading(false)
    }


    useEffect(() => {
        GetData();
        GetUsers();
    }, []);

    return(
        <div className='full-height'>
            <Content title="Detil Diklat">
            <Row>
                <Col md={12}>
                    <Box title={!Loading ? Data.nama_diklat : "Loading Data...."}  customOptions={
                        <div>
                            <button className='btn btn-info btn-sm' style={{marginTop : 2, marginRight : 5}} onClick={() => setModalSuratTugas(true)}>Buat Surat Tugas</button>
                            <button className='btn btn-success btn-sm' style={{marginTop : 2}} onClick={TogleModalEditDiklat}>Ubah Diklat</button>
                        </div>
                    }>
                        {
                            Loading ?
                            <h1 className='text-center'>Loading Data...</h1> :
                            <React.Fragment>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style={{width : '200px'}}>Asal Surat Undangan</td>
                                            <td style={{width : '10px'}}>:</td>
                                            <td>{Data.asal_surat_undangan}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width : '200px'}}>Nomor Surat Undangan</td>
                                            <td style={{width : '10px'}}>:</td>
                                            <td>{Data.nomor_surat_undangan}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width : '200px'}}>Tanggal Surat Undangan</td>
                                            <td style={{width : '10px'}}>:</td>
                                            <td>{moment(Data.tanggal_surat_undangan).format('dddd, DD MMMM YYYY')}</td>
                                        </tr>
                                        <tr>
                                            <td style={{width : '200px'}}>Perihal Surat Undangan</td>
                                            <td style={{width : '10px'}}>:</td>
                                            <td>{Data.perihal_undangan}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br/>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td style={{width : '200px'}}>Tempat Kegiatan</td>
                                        <td style={{width : '10px'}}>:</td>
                                        <td>{Data.tempat_acara}</td>
                                    </tr>

                                    <tr>
                                        <td style={{width : '200px'}}>Tanggal Kegiatan</td>
                                        <td style={{width : '10px'}}>:</td>
                                        <td>{
                                            moment(Data.tanggal_awal_acara).format('DD-MM') === moment(Data.tanggal_akhir_acara).format('DD-MM') ?
                                                moment(Data.tanggal_awal_acara).format('dddd, DD MMMM YYYY') :
                                                    moment(Data.tanggal_awal_acara).format('MM') === moment(Data.tanggal_akhir_acara).format('MM') ?
                                                        `${moment(Data.tanggal_awal_acara).format('DD')}-${moment(Data.tanggal_akhir_acara).format('DD')} ${moment(Data.tanggal_awal_acara).format('MMMM YYYY')} (${moment.duration(moment(Data.tanggal_akhir_acara).diff(moment(Data.tanggal_awal_acara))).asDays()} hari)` :
                                                            `${moment(Data.tanggal_awal_acara).format('dddd, DD MMMM YYYY')} - ${moment(Data.tanggal_akhir_acara).format('dddd, DD MMMM YYYY')} (${moment.duration(moment(Data.tanggal_akhir_acara).diff(moment(Data.tanggal_awal_acara))).asDays()} hari)`
                                        }</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </React.Fragment>
                            
                        }
                    </Box>
                </Col>
            </Row>
            {
                Loading ?
                null :
                Data.surat_tugas.length > 0 ?
                    Data.surat_tugas.map((list, index) => 
                    <Row key={index}>
                        <Col md={12}>
                            <Box title={list.nomor_surat_tugas}  customOptions={
                                <div>
                                    <a href={`${process.env.REACT_APP_BASE_URL}/cetak-surat-tugas?id=${list.id}`} className='btn btn-info btn-sm' style={{marginTop : 2, marginRight : '10px'}}>Cetak Surat Tugas</a>
                                    <button className='btn btn-success btn-sm' style={{marginTop : 2, marginRight : '10px'}} onClick={() => {
                                        let pesertanya = [];
                                        for(var i = 0; i < list.peserta.length; i++){
                                            pesertanya.push(list.peserta[i].user.name)
                                        }
                                        setDataSuratTugas({
                                            id_diklat : Data.id,
                                            id : list.id,
                                            nomor_surat_tugas : list.nomor_surat_tugas, 
                                            tanggal_surat_tugas : list.tanggal_surat_tugas,
                                            peserta : pesertanya
                                        })
                                        TogleModalEditSuratTugas();
                                    }}>Ubah Data Surat Tugas</button>
                                    <button onClick={() => PeringatanHapus(list.id)} className='btn btn-danger btn-sm' style={{marginTop : 2, marginRight : '10px'}}>Hapus</button>
                                </div>
                            }>
                                
                                    <Col md={12}>
                                        <Row>
                                        {
                                            list.peserta.map((peserta, index) => 
                                                <Col md={4} key={index} style={{marginBottom : 20}}>
                                                    <div>
                                                        <p style={{display:'inline-block', width : '100px'}}>Nama</p>
                                                        <p style={{display:'inline-block', marginRight : 10}}>:</p>
                                                        <p style={{display:'inline-block'}}>{peserta.user.name}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{display:'inline-block', width : '100px'}}>NIP</p>
                                                        <p style={{display:'inline-block', marginRight : 10}}>:</p>
                                                        <p style={{display:'inline-block'}}>{peserta.user.nip}</p>
                                                    </div>
                                                    <div>
                                                        <p style={{display:'inline-block', width : '100px'}}>Pangkat/Gol</p>
                                                        <p style={{display:'inline-block', marginRight : 10}}>:</p>
                                                        <p style={{display:'inline-block'}}>{peserta.user.pangkat} ({peserta.user.golongan})</p>
                                                    </div>
                                                    <div>
                                                        <p style={{display:'inline-block', width : '100px'}}>Jabatan</p>
                                                        <p style={{display:'inline-block', marginRight : 10}}>:</p>
                                                        <p style={{display:'inline-block'}}>{peserta.user.jabatan}</p>
                                                    </div>
                                                </Col>
                                            )
                                        }
                                        </Row>
                                    </Col>
                            </Box>
                        </Col>
                    </Row>
                    )
                : null
            }
            </Content>
            {
                Loading ? null :
                <React.Fragment>
                    <ModalSuratTugas GetData={GetData} IdDiklat={Data.id} Users={Users} modal={modalSuratTugas} TogleModalSuratTugas={TogleModalSuratTugas}/>
                    <ModalEditDiklat GetData={GetData} Data={Data} modal={modalEdit} TogleModalEditDiklat={TogleModalEditDiklat}/>
                    <ModalEditSuratTugas Users={Users} GetData={GetData} Data={DataSuratTugas} setDataSuratTugas={setDataSuratTugas} modal={modalEditSuratTugas} TogleModalEditSuratTugas={TogleModalEditSuratTugas}/>
                </React.Fragment>
            }
        </div>
    )
}

export default DetilDiklat;