import React, {useState} from 'react';
import {Content, Button, Inputs} from 'adminlte-2-react';
import axios from 'axios';

const ModalEditSuratTugasKomponent = ({Users, GetData, Data, setDataSuratTugas, modal, TogleModalEditSuratTugas}) => {
    const Token = JSON.parse(localStorage.getItem('token'));
    const {Text, Select2} = Inputs;
    const [Loading, setLoading] = useState(false);

    const UbahSuratTugas = async () => {
        setLoading(true);
        await axios({
            method: 'put',
            url: `${process.env.REACT_APP_BASE_URL}/api/surat-tugas`,
            data: {
                id_diklat : Data.id_diklat,
                id : Data.id,
                nomor_surat_tugas : Data.nomor_surat_tugas,
                tanggal_surat_tugas : Data.tanggal_surat_tugas,
                peserta : Data.peserta
            },
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
          }).then(res => {
                GetData();
                TogleModalEditSuratTugas();
                setDataSuratTugas({...Data, id : '', nomor_surat_tugas : '', tanggal_surat_tugas : ''})
          }).catch(function (error) {
            if(error.response){
                console.log(error.response)
            }
          });
          setLoading(true);
    }

    return(
        <Content title={'Tambah Acara Diklat'} modal onHide={TogleModalEditSuratTugas} modalFooter={
                    <React.Fragment>
                        <Button text='Tutup' pullLeft onClick={TogleModalEditSuratTugas} />
                        <Button disabled={Loading} text={!Loading ? 'Ubah Data' : 'Loading...'} onClick={UbahSuratTugas}/>
                    </React.Fragment>
                } show={modal}>
                        <Text name="nomor_surat_tugas" value={Data.nomor_surat_tugas} onChange={(e) => setDataSuratTugas({...Data, nomor_surat_tugas : e.target.value})}  placeholder="Masukan Nomor Surat Tugas" label="Nomor Surat Tugas" labelPosition="above" />
                        <p style={{fontWeight : 'bold'}}>Tanggal Surat Tugas</p>
                        <input value={Data.tanggal_surat_tugas} onChange={(e) => setDataSuratTugas({...Data, tanggal_surat_tugas : e.target.value})} className='form-control' type='date'/><br/>
                        <Select2
                            labelPosition="above"
                            placeholder="Pilih Nama Peserta Diklat"
                            multiple
                            label={'Peserta Diklat'}
                            options={Users}
                            value={Data.peserta}
                            onUnselect={({ params: { data } }) => {
                                setDataSuratTugas({...Data, peserta : data})
                            }}
                            onSelect={({ params: { data } }) => {
                                setDataSuratTugas({...Data, peserta : data})
                            }}
                    />
        </Content>
    )
}

const ModalEditSuratTugas = React.memo(ModalEditSuratTugasKomponent);
export default ModalEditSuratTugas;