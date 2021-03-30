import React, { useState, useEffect, useContext } from 'react';
import {
  Content, Col, Row, DataTable, Alert, Box, Button, Inputs,
} from 'adminlte-2-react';
import { withRouter, Redirect } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { GlobalStateContext } from '../../../../GlobalState';


const Diklat = ({ history }) => {
  const { Otoritas } = useContext(GlobalStateContext);
  const Token = JSON.parse(localStorage.getItem('token'));
  const [modal, setmodal] = useState(false);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [LoadingButton, setLoadingButton] = useState(false);
  const [Bulan, setBulan] = useState('all')
  const [Jenisnya, setJenisnya] = useState('')
  const [Form, setForm] = useState({
    nama_diklat: '',
    jenis_kegiatan : '',
    asal_surat_undangan: '',
    perihal_undangan: '',
    nomor_surat_undangan: '',
    tanggal_surat_undangan: '',
    tempat_acara: '',
    tanggal_awal_acara: '',
    tanggal_akhir_acara: '',
  });
  const { Text, Select2 } = Inputs;

  const firstColumns = [
    { title: 'Nama', data: 'nama_diklat' },
    { title: 'Jenis', data: 'jenis_kegiatan' },
    { title: 'Asal Surat', data: 'asal_surat_undangan' },
    { title: 'No. Surat', data: 'nomor_surat_undangan' },
    { title: 'Tgl. Surat', data: 'tanggal_surat_undangan' },
  ];


  const GetData = async () => {
    setLoading(true);
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/diklat`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    }).then((res) => {
      setData(res.data);
    }).catch((err) => {
      console.log(err);
    });
    setLoading(false);
  };

  const TambahDataDiklat = async () => {
    setLoadingButton(true);
    await axios({
      method: 'post',
      url: `${process.env.REACT_APP_BASE_URL}/api/diklat`,
      data: Form,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${Token}`,
      },
    }).then((res) => {
      setmodal(false);
      setForm({
        nama_diklat: '',
        asal_surat_undangan: '',
        perihal_undangan: '',
        nomor_surat_undangan: '',
        tanggal_surat_undangan: moment(),
        tempat_acara: '',
        tanggal_awal_acara: moment(),
        tanggal_akhir_acara: moment(),
      });
      GetData();
    }).catch((error) => {
      if (error.response) {
        console.log(error.response);
      }
    });
    setLoadingButton(false);
  };


  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="full-height">
<div className='untuk_menutupi text-center'>
          <p className='text_judul'>SI-STUDILA</p>
        </div>
      <Content title="Jurnal Kegiatan">
        <Alert closable type="info" title="Informasi Umum" icon="fa-info">Halaman ini untuk menmabahkan data acara/kegiatan</Alert>
        <Row>
          <Col md={12}>
            <Box
              title="Daftar Kegiatan"
              customOptions={
                        Otoritas == 1 ? 
						<div className='row' style={{marginRight : '0px'}}>
							<div className='col-xs-4'>
								<select className="form-control" value={Bulan} onChange={(e) => {
									 setBulan(e.target.value)
								}}>
								  <option value='all'>Semua Bulan</option>
								  <option value='01'>Januari</option>
								  <option value='02'>Februari</option>
								  <option value='03'>Maret</option>
								  <option value='04'>April</option>
								  <option value='05'>Mei</option>
								  <option value='06'>Juni</option>
								  <option value='07'>Juli</option>
								  <option value='08'>Agustus</option>
								  <option value='09'>Oktober</option>
								  <option value='10'>November</option>
								  <option value='11'>Desember</option>
								</select>
							</div>
              <div className='col-xs-4'>
								<select className="form-control" value={Jenisnya} onChange={(e) => {
                  if(e.target.value !== ''){
                    window.location.href = `http://apitest.pta-banjarmasin.go.id/public/cetak-laporan-diklat/${e.target.value}/${Bulan}`;
                    setJenisnya('')
                  }
								}}>
								  <option value=''>Laporan</option>
								  <option value='all'>Semua</option>
								  <option value='diklat'>Diklat</option>
								  <option value='non-diklat'>Non Diklat</option>
								</select>
							</div>
							<div className='col-xs-3'>
								<button className="btn btn-info" style={{ marginTop: 2 }} onClick={() => setmodal(true)}>Tambah Kegiatan</button>
							</div>
						</div> : null
                    }
            >

              <div className="table-responsive">
                {
                                Loading
                                  ? <h2 className="text-center mt-3 mb-3">Loading...</h2>
                                  : (
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
                                  )
                        }
              </div>

            </Box>
          </Col>
        </Row>
      </Content>

      <Content
        title="Tambah Kegiatan"
        modal
        onHide={() => setmodal(false)}
        modalFooter={(
          <React.Fragment>
            <Button text="Tutup" pullLeft onClick={() => setmodal(false)} />
            <Button disabled={LoadingButton || Form.nama_diklat === '' || Form.tanggal_surat_undangan === '' || Form.nomor_surat_undangan === '' || Form.perihal_undangan === '' || Form.tempat_acara === '' || Form.tanggal_awal_acara === '' || Form.tanggal_akhir_acara === ''} onClick={TambahDataDiklat} type="primary" text={!LoadingButton ? 'Tambah Data Diklat' : 'Loading'} />
          </React.Fragment>
              )}
        show={modal}
      >
        <Text name="nama_diklat" value={Form.nama_diklat} onChange={e => setForm({ ...Form, nama_diklat: e.target.value })} placeholder="Masukan nama kegiatan" label="Nama Kegiatan" labelPosition="above" />
        
        <Select2
                    labelPosition="above"
                    placeholder="Pilih Nama Peserta Diklat"
                    multiple={false}
                    label={'Jenis Kegiatan'}
                    options={['Diklat','Non Diklat']}
                    value={Form.jenis_kegiatan}
                    onUnselect={({ params: { data } }) => {
                      setForm({ ...Form, jenis_kegiatan: data })
                    }}
                    onSelect={({ params: { data } }) => {
                      setForm({ ...Form, jenis_kegiatan: data })
                    }}
              />
        
        <Text name="asal_surat_undangan" value={Form.asal_surat_undangan} onChange={e => setForm({ ...Form, asal_surat_undangan: e.target.value })} placeholder="Masukan Asal Surat Undangan" label="Asal Surat Undangan" labelPosition="above" />
        <Text name="nomor_surat_undangan" value={Form.nomor_surat_undangan} onChange={e => setForm({ ...Form, nomor_surat_undangan: e.target.value })} placeholder="Masukan Nomor Surat Undangan" label="Nomor Surat Undangan" labelPosition="above" />

        <p style={{ fontWeight: 'bold' }}>Tanggal Surat Undangan</p>
        <input value={Form.tanggal_surat_undangan} onChange={e => setForm({ ...Form, tanggal_surat_undangan: e.target.value })} className="form-control" type="date" />
        <br />
        <Text label="Perihal Surat Undangan" value={Form.perihal_undangan} onChange={e => setForm({ ...Form, perihal_undangan: e.target.value })} inputType="textarea" rows={3} labelPosition="above" placeholder="Masukan Perihal Undangan" />
        <Text name="tempat_acara_diklat" value={Form.tempat_acara} onChange={e => setForm({ ...Form, tempat_acara: e.target.value })} placeholder="Tempat Acara Kegiatan" label="Tempat Acara Kegiatan" labelPosition="above" />

        <p style={{ fontWeight: 'bold' }}>Tanggal Mulai - Akhir Acara</p>
        <div className="row">
          <div className="col-md-6">
            <input value={Form.tanggal_awal_acara} onChange={e => setForm({ ...Form, tanggal_awal_acara: e.target.value })} className="form-control" type="date" />
          </div>
          <div className="col-md-6">
            <input value={Form.tanggal_akhir_acara} onChange={e => setForm({ ...Form, tanggal_akhir_acara: e.target.value })} className="form-control" type="date" />
          </div>
        </div>

      </Content>
    </div>
  );
};

export default withRouter(Diklat);
