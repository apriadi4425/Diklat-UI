import React, { useState, useCallback, useEffect, useContext } from 'react';
import {Box, Inputs} from 'adminlte-2-react';
import {useDropzone} from 'react-dropzone'
import axios from 'axios';
import swal from 'sweetalert';
import { GlobalStateContext } from '../../../../../GlobalState';


const SuratTugasTabsKomponent = ({Users, TipeDokument, IdDiklat, bukaHalamanPdf}) => {
    const {Otoritas} = useContext(GlobalStateContext)
    const Token = JSON.parse(localStorage.getItem('token'));
    const {Text, Select2} = Inputs;
    const [DoUpload, setDoUpload] = useState(false)
    const [Form, SetForm] = useState({
        file : '', nama_file : ''
    })

    const [DataSuratTugas, setDataSuratTugas] = useState([]);
    const [LoadingButtonUpload, setLoadingButtonUpload] = useState(false)
    const [Loading, setLoading] = useState(true)
    const [PesertaDiklat, setPesertaDiklat] = useState([]);


    const onDrop = useCallback(acceptedFiles => {
        if(acceptedFiles[0].type === 'application/pdf'){
          SetForm({...Form, file : acceptedFiles[0], nama_file : acceptedFiles[0].name});
        }else{
          SetForm({...Form, file : 'error'});
        }
      }, [Form])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});


    const TambahFile = async () => {
      setLoadingButtonUpload(true)
        let bodyFormData = new FormData();
        bodyFormData.set('id_diklat', IdDiklat);
        bodyFormData.set('tipe', TipeDokument);
        bodyFormData.set('nama_file', Form.nama_file);
        bodyFormData.set('file', Form.file);
        bodyFormData.set('peserta', JSON.stringify(PesertaDiklat));

        await axios({
          method : 'post',
          url : `${process.env.REACT_APP_BASE_URL}/api/upload-surat-tugas`,
          data: bodyFormData,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${Token}`
          }
        }).then(res => {
          SetForm({file : '', nama_file : ''});
          setPesertaDiklat([])
          setDoUpload(false);
          getDataDokument();
        }).catch(function (error) {
          console.log(error);
        });
        setLoadingButtonUpload(false)
      };


      const getDataDokument = useCallback(async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-dokument?id=${IdDiklat}&tipe=${TipeDokument}`,{
          headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${Token}`
          }
        }).then(res => {
          setDataSuratTugas(res.data)
        }).catch(err => {
            console.log(err)
        });
        }, [])

      const PeringatanHapus = (IdnyaKirim) => {
        swal({
            title: "Data Akan Dihapus",
            text: "ketika dihapus data tidak akan bisa dikembalikan",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              KirimDelete(IdnyaKirim)
            } else {
              swal("Data tidak jadi dihapus");
            }
          });
    }

    const KirimDelete = async (IdnyaKirim) => {
      setLoading(true)
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/upload-surat-tugas/${IdnyaKirim}`,{
          headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${Token}`
          }
      }).then(res => {
          swal("Data berhasil dihapus", {
              icon: "success",
            });
            getDataDokument();
      }).catch(err => {
          console.log(err)
      });
      setLoading(false)
  }

      useEffect(() => {
        getDataDokument();
      }, [getDataDokument])

    return(
           <Box customOptions={
                <div>
                  {
                    Otoritas === 1 ? 
                    <button onClick={() => setDoUpload(!DoUpload)} className='btn btn-success btn-sm' style={{marginTop : 2, marginRight : '10px'}} >{!DoUpload ? 'Upload Dokument' : 'Batalkan'}</button> : null
                  }
                    
                  {
                      Form.nama_file !== '' ?
                      <button disabled={LoadingButtonUpload}  onClick={TambahFile} className='btn btn-warning btn-sm' style={{marginTop : 2, marginRight : '10px'}} >{!LoadingButtonUpload ? 'Upload' : 'Loading'}</button> : null
                  }
                </div>
            }>
                {
                    DoUpload ?
                    
                    <div>
                      <div {...getRootProps()} className='box_upload'>
                        <input {...getInputProps()} />
                        {
                            Form.file === 'error' ?
                            <h1 className={'text-center text-danger text_dalam_box'}>Format File tidak diperbolehkan (Hanya PDF)</h1>
                            :
                            isDragActive ?
                                <h1 className={'text-center text_dalam_box'}>..Lepaskan Sekarang!!</h1> :
                                Form.file === '' || Form.file === null ? <h1 className='text-center text_dalam_box'>Klik atau taruh file surat disini!!</h1> : <h1 className={'text-center text-success text_dalam_box'}>{Form.nama_file}</h1>
                        }
                        </div>
                        {
                          TipeDokument === 3 ? 
                          <div>
                            <Select2
                                  labelPosition="above"
                                  placeholder="Pilih Nama Pemilik Dokument"
                                  multiple
                                  label={'Pemilik Sertifikat/Piagam'}
                                  options={Users}
                                  value={PesertaDiklat}
                                  onUnselect={({ params: { data } }) => {
                                      setPesertaDiklat(data)
                                  }}
                                  onSelect={({ params: { data } }) => {
                                      setPesertaDiklat(data)
                                  }}
                            />
                          </div> : null
                        }
                    </div>
                    :
                       null
                }
                    <div>
                            <table>
                            <tbody>
                              <tr>
                                {
                                  DataSuratTugas.map((list, index) => 
                                    <td key={index}>
                                      <img onClick={() => {
                                        bukaHalamanPdf(list.id)
                                      }} className={`img img-thumbnail ${TipeDokument === 1 ? 'gambar_nya' : 'gambarnya2'}`} src={`${process.env.REACT_APP_BASE_URL}/dokument/${TipeDokument === 1 ? 'surat-tugas' : 'sertifikat'}/${list.path_gambar}`}/>
                                      <div className='tombol_box_nya'>
                                        <a href={`${process.env.REACT_APP_BASE_URL}/dokument/${TipeDokument === 1 ? 'surat-tugas' : 'sertifikat'}/${list.path_url}`} target="_blank" style={{marginRight : '10px'}} className='btn btn-sm btn-success'>Download</a>
                                        {
                                          Otoritas === 1 ? <button onClick={() => PeringatanHapus(list.id)} className='btn btn-sm btn-danger tombol_hapus'>Hapus</button> : null
                                        }
                                        
                                      </div>
                                      <p className='title_bawah'>{list.nama_file}</p>
                                    </td>
                                  )
                                }
                              </tr>
                            </tbody>
                          </table>
                          
                    </div>
                    
           </Box>
    )
}

const SuratTugasTabs = React.memo(SuratTugasTabsKomponent);
export default SuratTugasTabs;