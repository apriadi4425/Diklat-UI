import React, {useState, useCallback, useEffect} from 'react';
import {Content, Col, Row, DataTable, Alert, Box, Button, Inputs} from 'adminlte-2-react';
import axios from 'axios'
import ImageViewer from 'react-simple-image-viewer';

const Sertifikat = () => {
    const Token = JSON.parse(localStorage.getItem('token'));
    const [Data, setData] = useState([])
    const [Loading, setLoading] = useState(true)


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
        setIsViewerOpen(false);
      };
 

    const firstColumns = [
        { title: 'Nama', data: 'nama'},
        { title: 'Nama Diklat', data: 'nama_diklat'},
        { title: 'Tgl. Diklat', data: 'tanggal_diklat' },
    ];

    const GetData = async () => {
        setLoading(true)
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/sertifikat`,{
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${Token}`
            }
        }).then(res => {
            setData(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        });
        setLoading(false)
    }

    useEffect(() => {
        GetData();
     }, []);
    return(
         <div className='full-height'>
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
           <Content title="Data Sertifikat">
               <Alert closable type="info" title="Informasi Umum" icon="fa-info">Halaman ini untuk menmabahkan data diklat</Alert>
               <Row>
                   <Col md={12}>
                    <Box title="Daftar Sertifikat Diklat Pegawai">
                    <div className={'table-responsive'}>
                        {
                                Loading ?
                                    <h2 className='text-center mt-3 mb-3'>Loading...</h2> : 
                                    <DataTable
                                    columns={firstColumns.concat([{
                                        title: 'Lihat',
                                        data: null,
                                        render: (data) => <img style={{cursor : 'pointer'}} src={data.path} width="80px" height="50px" className="on-click-events"/>,
                                    },{
                                        title: 'Download',
                                        data: null,
                                        render: (data) => <a href={data.url} target='_blank' className="btn btn-sm btn-info">Download</a>,
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
                                        onClickEvents: (data, rowIdx, rowData) => {
                                            bukaHalamanPdf(data.sertifikat)
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
        </div>
    )
}

export default Sertifikat;