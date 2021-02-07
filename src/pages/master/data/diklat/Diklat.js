import React, {useState, useEffect, useContext} from 'react';
import {Content, Col, Row, DataTable, Alert, Box, Button, Inputs} from 'adminlte-2-react';
import { withRouter } from "react-router-dom";
import axios from 'axios'
import moment from 'moment';
import { GlobalStateContext } from '../../../../GlobalState';



const Diklat = ({history}) => {
    const {Otoritas} = useContext(GlobalStateContext)
    const Token = JSON.parse(localStorage.getItem('token'));
    const [modal, setmodal] = useState(false);
    const [Data, setData] = useState([])
    const [Loading, setLoading] = useState(true)
    const [LoadingButton, setLoadingButton] = useState(false);
    const [Form, setForm] = useState({
        nama_diklat: '',
        asal_surat_undangan: '',
        perihal_undangan: '',
        nomor_surat_undangan: '',
        tanggal_surat_undangan: '',
        tempat_acara: '',
        tanggal_awal_acara: '',
        tanggal_akhir_acara : ''
    });
    const {Text} = Inputs;

    const firstColumns = [
        { title: 'Nama', data: 'nama_diklat'},
        { title: 'Asal Surat', data: 'asal_surat_undangan'},
        { title: 'No. Surat', data: 'nomor_surat_undangan' },
        { title: 'Tgl. Surat', data: 'tanggal_surat_undangan'},
    ];


    const GetData = async () => {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/diklat`,{
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

    const TambahDataDiklat = async () => {
         setLoadingButton(true);
         await axios({
             method: 'post',
             url: `${process.env.REACT_APP_BASE_URL}/api/diklat`,
             data: Form,
             headers: {
                 Accept: 'application/json',
                 Authorization: `Bearer ${Token}`
             }
           }).then(res => {
                 setmodal(false);
                 setForm({
                    nama_diklat: '',
                    asal_surat_undangan: '',
                    perihal_undangan: '',
                    nomor_surat_undangan: '',
                    tanggal_surat_undangan: moment(),
                    tempat_acara: '',
                    tanggal_awal_acara: moment(),
                    tanggal_akhir_acara : moment()
                 });
                 GetData();
           }).catch(function (error) {
             if(error.response){
                 console.log(error.response)
             }
           });
           setLoadingButton(false);
     }


     useEffect(() => {
        GetData();
     }, []);

    return(
        <div className='full-height'>
           
            <Content title="Data Diklat">
                <Alert closable type="info" title="Informasi Umum" icon="fa-info">Halaman ini untuk menmabahkan data diklat</Alert>
                <Row>
                    <Col md={12}>
                    <Box title="Daftar Diklat" customOptions={
                        Otoritas === 1 ? <div><button className='btn btn-info btn-sm' style={{marginTop : 2}} onClick={() => setmodal(true)}>Tambah Diklat</button></div> : null
                    }>

                        <div className={'table-responsive'}>
                        {
                                Loading ?
                                    <h2 className='text-center mt-3 mb-3'>Loading...</h2> : 
                                    <DataTable
                                    columns={firstColumns.concat([{
                                        title: 'Actions',
                                        data: null,
                                        render: () => <Button text="Detil" className="on-click-event" />,
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
                                            history.push(`/app/master/diklat/${data.slug}`);
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

            <Content title={'Tambah Acara Diklat'} modal onHide={() => setmodal(false)} modalFooter={
                <React.Fragment>
                    <Button text='Tutup' pullLeft onClick={() => setmodal(false)} />
                    <Button disabled={LoadingButton || Form.nama_diklat === '' || Form.tanggal_surat_undangan === '' || Form.nomor_surat_undangan === ''|| Form.perihal_undangan === '' || Form.tempat_acara === '' || Form.tanggal_awal_acara === ''|| Form.tanggal_akhir_acara === ''} onClick={TambahDataDiklat} type='primary' text={!LoadingButton ? 'Tambah Data Diklat' : 'Loading'}/>
                </React.Fragment>
            } show={modal}>
                    <Text name="nama_diklat" value={Form.nama_diklat} onChange={(e) =>setForm({...Form, nama_diklat : e.target.value})}  placeholder="Masukan nama diklat" label="Nama Diklat" labelPosition="above" />
                    <Text name="asal_surat_undangan" value={Form.asal_surat_undangan} onChange={(e) =>setForm({...Form, asal_surat_undangan : e.target.value})}  placeholder="Masukan Asal Surat Undangan" label="Asal Surat Undangan" labelPosition="above" />
                    <Text name="nomor_surat_undangan" value={Form.nomor_surat_undangan} onChange={(e) =>setForm({...Form, nomor_surat_undangan : e.target.value})}  placeholder="Masukan Nomor Surat Undangan" label="Nomor Surat Undangan" labelPosition="above" />

                        <p style={{fontWeight : 'bold'}}>Tanggal Surat Undangan</p>
                        <input value={Form.tanggal_surat_undangan} onChange={(e) =>setForm({...Form, tanggal_surat_undangan : e.target.value})}  className='form-control' type='date'/><br/>
                    <Text label="Perihal Surat Undangan" value={Form.perihal_undangan} onChange={(e) =>setForm({...Form, perihal_undangan : e.target.value})}  inputType="textarea" rows={3} labelPosition="above" placeholder="Masukan Perihal Undangan" />
                    <Text name="tempat_acara_diklat" value={Form.tempat_acara} onChange={(e) =>setForm({...Form, tempat_acara : e.target.value})}  placeholder="Tempat Acara Diklat" label="Tempat Acara Diklat" labelPosition="above" />
                    
                    <p style={{fontWeight : 'bold'}}>Tanggal Mulai - Akhir Acara</p>
                    <div className="row">
                        <div className="col-md-6">
                            <input value={Form.tanggal_awal_acara} onChange={(e) =>setForm({...Form, tanggal_awal_acara : e.target.value})} className='form-control' type='date'/>
                        </div>
                        <div className="col-md-6">
                            <input value={Form.tanggal_akhir_acara} onChange={(e) =>setForm({...Form, tanggal_akhir_acara : e.target.value})}  className='form-control' type='date'/>
                        </div>
                    </div>
                   
            </Content>
        </div>
    )
}

export default withRouter(Diklat);