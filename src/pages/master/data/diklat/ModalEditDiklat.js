import React, {useState, useEffect } from 'react';
import {Content, Button, Inputs} from 'adminlte-2-react';
import axios from 'axios';

const ModalEditDiklatKomponent = ({GetData, modal, Data, TogleModalEditDiklat}) => {
    const Token = JSON.parse(localStorage.getItem('token'));
    const {Text} = Inputs;
    const [Form, setForm] = useState({
        id : Data.id,
        nama_diklat: Data.nama_diklat,
        asal_surat_undangan: Data.asal_surat_undangan,
        perihal_undangan: Data.perihal_undangan,
        nomor_surat_undangan: Data.nomor_surat_undangan,
        tanggal_surat_undangan: Data.tanggal_surat_undangan,
        tempat_acara: Data.tempat_acara,
        tanggal_awal_acara: Data.tanggal_awal_acara,
        tanggal_akhir_acara : Data.tanggal_akhir_acara
    })

    const [Loading, setLoading] = useState(false);

    const UbahDataDiklat = async () => {
        setLoading(true);
        await axios({
            method: 'put',
            url: `${process.env.REACT_APP_BASE_URL}/api/diklat`,
            data: Form,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
          }).then(res => {
                GetData();
                TogleModalEditDiklat();
                setForm({
                   nama_diklat: '',
                   asal_surat_undangan: '',
                   perihal_undangan: '',
                   nomor_surat_undangan: '',
                   tanggal_surat_undangan: '',
                   tempat_acara: '',
                   tanggal_awal_acara: '',
                   tanggal_akhir_acara : ''
                });
          }).catch(function (error) {
            if(error.response){
                console.log(error.response)
            }
          });
          setLoading(false);
    }

    return(
        <Content title={'Edit Acara Diklat'} modal onHide={TogleModalEditDiklat} modalFooter={
                    <React.Fragment>
                        <Button text='Tutup' pullLeft onClick={TogleModalEditDiklat} />
                        <Button onClick={UbahDataDiklat} disabled={Loading} text={!Loading ? 'Ubah' : 'Loading...'}/>
                    </React.Fragment>
                } show={modal}>

                    <Text name="nama_diklat" value={Form.nama_diklat} onChange={(e) =>setForm({...Form, nama_diklat : e.target.value})}   placeholder="Masukan nama diklat" label="Nama Diklat" labelPosition="above" />
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
    )
}

const ModalEditDiklat = React.memo(ModalEditDiklatKomponent);
export default ModalEditDiklat;