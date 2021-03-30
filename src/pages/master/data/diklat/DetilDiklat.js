import React, { useState, useEffect, useCallback, useContext } from 'react';
import {Content, Col, Row, Alert, Box, Button, Inputs} from 'adminlte-2-react';
import ModalSuratTugas from './ModalSuratTugas';
import ModalEditDiklat from './ModalEditDiklat';
import ModalEditSuratTugas from './ModalEditSuratTugas';
import ModalDokument from './ModalDokument';
import { withRouter } from "react-router-dom";
import axios from 'axios'
import moment from 'moment';
import swal from 'sweetalert';

import ImageViewer from 'react-simple-image-viewer';
import { GlobalStateContext } from '../../../../GlobalState';

const DetilDiklat = ({match, history}) => {
    const {Otoritas} = useContext(GlobalStateContext)
    const Token = JSON.parse(localStorage.getItem('token'));
    const slug = match.params.slug;
  
    const [Data, setData] = useState({});
    const [Loading, setLoading] = useState(true);
    const [DataSuratTugas, setDataSuratTugas] = useState({id_diklat : '', id : '', nomor_surat_tugas : '', tanggal_surat_tugas : '', peserta : []})
    const [Users, setUsers] = useState([])
    const [modalSuratTugas, setModalSuratTugas] = useState(false);
    const [modalEdit, setmodalEdit] = useState(false);
    const [modalEditSuratTugas, setmodalEditSuratTugas] = useState(false);
    const [modalDokumen, setModalDokumen] = useState(false)

    const togglemodalDokumen = useCallback(() => {
        setModalDokumen(!modalDokumen)
    }, [modalDokumen]);

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

    const PeringatanHapus = (Metode, IdSuratTugas) => {
        swal({
            title: "Data Akan Dihapus",
            text: "ketika dihapus data tidak akan bisa dikembalikan",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                if(Metode === 'Surat Tugas'){
                    KirimDelete('surat-tugas', IdSuratTugas, Metode)
                }else{
                    KirimDelete('diklat', IdSuratTugas, Metode)
                }
            } else {
              swal("Data tidak jadi dihapus");
            }
          });
    }

    const KirimDelete = async (Link, Id, Metode) => {
        setLoading(true)
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/${Link}/${Id}`,{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            swal("Data berhasil dihapus", {
                icon: "success",
              });
                if(Metode === 'Surat Tugas'){
                    GetData();
                }else{
                    history.push('/app/master/diklat')
                }
        }).catch(err => {
            console.log(err)
        });
        setLoading(false)
    }


    useEffect(() => {
        GetData();
        GetUsers();
    }, []);




    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [images, setimages] = useState([]);


    const bukaHalamanPdf = async (idDokument) => {
       await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-halaman?id_dokument=${idDokument}`,{
         headers: {
             Accept: 'application/json',
             Authorization: `Bearer ${Token}`
         }
       }).then(res => {
         togglemodalDokumen()
         setimages(res.data)
         openImageViewer(0)
       }).catch(err => {
           console.log(err)
       });
   }



   const openImageViewer = useCallback((index) => {
       setCurrentImage(index);
       setIsViewerOpen(true);
     }, []);
   
     const closeImageViewer = () => {
       setCurrentImage(0);
       togglemodalDokumen();
       setIsViewerOpen(false);
     };



    return(
        <div className='full-height'>
            <div className='untuk_menutupi text-center'>
          <p className='text_judul'>SI-STUDILA</p>
        </div>
             <div className='paling_atas'>
             {isViewerOpen && (
                    <ImageViewer
                    style={{height : 5000}}
                    src={ images }
                    currentIndex={ currentImage }
                    onClose={ closeImageViewer }
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)",
                        zIndex:9999
                    }}
                    />
                )}
             </div>
            <Content title="Detil Kegiatan">
            <Row>
                <Col md={12}>
                    <Box title={!Loading ? Data.nama_diklat : "Loading Data...."}  customOptions={
                        Otoritas == 1 ?
                        <div>
                            <button className='btn btn-info btn-sm' style={{marginTop : 2, marginRight : 5}} onClick={() => setModalSuratTugas(true)}>Buat Surat Tugas</button>
                            <button className='btn btn-success btn-sm' style={{marginTop : 2, marginRight : 5}} onClick={TogleModalEditDiklat}>Ubah Kegiatan</button>
                            <button className='btn btn-primary btn-sm' style={{marginTop : 2, marginRight : 5}} onClick={togglemodalDokumen}>Dokument</button>
                            <button className='btn btn-danger btn-sm' style={{marginTop : 2}} onClick={() => PeringatanHapus('Diklat', Data.id)}>Hapus Kegiatan</button>
                        </div>
                        : 
                        <button className='btn btn-primary btn-sm' style={{marginTop : 2}} onClick={togglemodalDokumen}>Dokument Diklat</button>
                    }>
                        {
                            Loading ?
                            <h1 className='text-center'>Loading Data...</h1> :
                            <React.Fragment>
                                <table>
                                    <tbody>
                                    <tr>
                                            <td style={{width : '200px'}}>Jenis Kegiatan</td>
                                            <td style={{width : '10px'}}>:</td>
                                            <td>{Data.jenis_kegiatan}</td>
                                        </tr>
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
                                    {
                                        Otoritas == 1 ?
                                        <React.Fragment>
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
                                        
                                            <button onClick={() => PeringatanHapus('Surat Tugas',list.id)} className='btn btn-danger btn-sm' style={{marginTop : 2, marginRight : '10px'}}>Hapus</button>
                                        </React.Fragment> : null
                                    }
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
                    <ModalDokument Users={Users} bukaHalamanPdf={bukaHalamanPdf} IdDiklat={Data.id} toggle={togglemodalDokumen} modal={modalDokumen}/>
                </React.Fragment>
            }
        </div>
    )
}

export default withRouter(DetilDiklat);