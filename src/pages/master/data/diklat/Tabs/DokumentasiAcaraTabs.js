import React, {useState, useCallback, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import {Box} from 'adminlte-2-react';
import axios from 'axios';
import swal from 'sweetalert';

const DokumentasiAcaraTabsKomponent = ({IdDiklat}) => {
    const Token = JSON.parse(localStorage.getItem('token'));
    const [DoUpload, setDoUpload] = useState(false)
    const [Form, SetForm] = useState({
        file : '', nama_file : ''
    })
    const [LoadingButtonUpload, setLoadingButtonUpload] = useState(false)
    const [DataDokument, setDataDokument] = useState([])
    const [Loading, setLoading] = useState(true)

    const onDrop = useCallback(acceptedFiles => {
        if( acceptedFiles[0].type === 'image/jpeg' || acceptedFiles[0].type === 'image/png' || acceptedFiles[0].type === 'image/jpg'){
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
          bodyFormData.set('nama_file', Form.nama_file);
          bodyFormData.set('file', Form.file);
  
          await axios({
            method : 'post',
            url : `${process.env.REACT_APP_BASE_URL}/api/upload-dokumentasi`,
            data: bodyFormData,
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${Token}`
            }
          }).then(res => {
            SetForm({file : '', nama_file : ''});
            setDoUpload(false);
            getDataDokument();
          }).catch(function (error) {
            console.log(error);
          });
          setLoadingButtonUpload(false)
        };

        const getDataDokument = useCallback(async () => {
            await axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-dokument?id=${IdDiklat}&tipe=2`,{
              headers: {
                  Accept: 'application/json',
                  Authorization: `Bearer ${Token}`
              }
          }).then(res => {
            setDataDokument(res.data)
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
                    <button onClick={() => setDoUpload(!DoUpload)} className='btn btn-success btn-sm' style={{marginTop : 2, marginRight : '10px'}} >{!DoUpload ? 'Upload Dokument' : 'Batalkan'}</button>
                    {
                        Form.nama_file !== '' ?
                        <button disabled={LoadingButtonUpload}  onClick={TambahFile} className='btn btn-warning btn-sm' style={{marginTop : 2, marginRight : '10px'}} >{!LoadingButtonUpload ? 'Upload' : 'Loading'}</button> : null
                    }
                </div>
            }>
                {
                    DoUpload ?
                    <div {...getRootProps()} className='box_upload'>
                        <input {...getInputProps()} />
                        {
                            Form.file === 'error' ?
                            <h1 className={'text-center text-danger text_dalam_box'}>Format File tidak diperbolehkan (jpg, jpeg, png)</h1>
                            :
                            isDragActive ?
                                <h1 className={'text-center text_dalam_box'}>..Lepaskan Sekarang!!</h1> :
                                Form.file === '' || Form.file === null ? <h1 className='text-center text_dalam_box'>Klik atau taruh file surat disini!!</h1> : <h1 className={'text-center text-success text_dalam_box'}>{Form.nama_file}</h1>
                        }
                        </div> :
                       null
                }

<div>
                            <table>
                            <tbody>
                            {
                              DataDokument.map((list, index) => 
                              <tr key={index}>
                                    <td >
                                      <button onClick={() => PeringatanHapus(list.id)} className='btn btn-sm btn-danger tombol_hapus2'>Hapus</button>
                                      <img className='img img-thumbnail gambar_nya2' src={`${process.env.REACT_APP_BASE_URL}/dokument/dokumentasi/${list.path_url}`}/>
                                      <p className='title_bawah2'>{list.nama_file}</p>
            
                                    </td>
                              </tr>
                              )}
                            </tbody>
                          </table>
                          
                    </div>
    
           </Box>
    )
}

const DokumentasiAcaraTabs = React.memo(DokumentasiAcaraTabsKomponent);
export default DokumentasiAcaraTabs;