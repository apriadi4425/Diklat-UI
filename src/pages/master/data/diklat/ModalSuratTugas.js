import React, {useState } from 'react';
import {Content, Button, Inputs} from 'adminlte-2-react';
import axios from 'axios';

const ModalSuratTugasKompoonent = ({GetData, IdDiklat, Users, modal, TogleModalSuratTugas}) => {
    const Token = JSON.parse(localStorage.getItem('token'));
    const {Text, Select2} = Inputs;
    const [NomorSuratTugas, setNomorSuratTugas] = useState('');
    const [TanggalSuratTugas, setTanggalSuratTugas] = useState('');
    const [PesertaDiklat, setPesertaDiklat] = useState([]);
    

    const TambahSuratTugas = async () => {
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}/api/surat-tugas`,
            data: {
                id_diklat : IdDiklat,
                nomor_surat_tugas : NomorSuratTugas,
                tanggal_surat_tugas : TanggalSuratTugas,
                peserta : PesertaDiklat,
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
          }).then(res => {
                GetData();
                TogleModalSuratTugas();
                setNomorSuratTugas('')
                setTanggalSuratTugas('')
                setPesertaDiklat([])
          }).catch(function (error) {
            if(error.response){
                console.log(error.response)
            }
          });
    }

    return (
        <Content title={'Tambah Acara Diklat'} modal onHide={TogleModalSuratTugas} modalFooter={
            <React.Fragment>
                <Button text='Tutup' pullLeft onClick={TogleModalSuratTugas} />
                <Button text={'Tambah'} onClick={TambahSuratTugas}/>
            </React.Fragment>
        } show={modal}>
                <Text name="nomor_surat_tugas" value={NomorSuratTugas} onChange={(e) => setNomorSuratTugas(e.target.value)}  placeholder="Masukan Nomor Surat Tugas" label="Nomor Surat Tugas" labelPosition="above" />
                <p style={{fontWeight : 'bold'}}>Tanggal Surat Tugas</p>
                <input value={TanggalSuratTugas} onChange={(e) => setTanggalSuratTugas(e.target.value)} className='form-control' type='date'/><br/>

                <Select2
                    labelPosition="above"
                    placeholder="Pilih Nama Peserta Diklat"
                    multiple
                    label={'Peserta Diklat'}
                    options={Users}
                    value={PesertaDiklat}
                    onUnselect={({ params: { data } }) => {
                        setPesertaDiklat(data)
                    }}
                    onSelect={({ params: { data } }) => {
                        setPesertaDiklat(data)
                    }}
              />
                    
        </Content>
    )
}

const ModalSuratTugas = React.memo(ModalSuratTugasKompoonent);
export default ModalSuratTugas;