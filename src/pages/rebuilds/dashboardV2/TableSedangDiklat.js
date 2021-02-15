import React, {useState, useCallback, useEffect} from 'react';
import {SimpleTable, ProgressBar, Badge} from 'adminlte-2-react';
import axios from 'axios';

const TableSedangDiklatKomponent = () => {
    const Token = JSON.parse(localStorage.getItem('token'));
    const [Data, setData] = useState([]);
    const [DataJenis, setDataJenis] = useState([])
    const [Loading, setLoading] = useState(true)

    const GetData = useCallback(async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/sedang-diklat`,{
          headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${Token}`
          }
        }).then(res => {
            setData(res.data[0])
            setDataJenis(res.data[1])
        }).catch(err => {
            console.log(err)
        });
        setLoading(false)
      }, [])

      useEffect(() => {
        GetData();
      }, [GetData])

    return(
       Loading ? 
            <h1>Loading...</h1> : 
            <div className="table-responsive">
                <SimpleTable
                        columns={[
                            { title: '#', data: 'no', width: '10px' },
                            { title: 'Nama Peserta', data: 'nama_peserta' },
                            { title: 'Nama Kegiatan', data: 'nama_diklat'},
                            { title: 'Tempat Kegiatan', data: 'tempat_diklat'},
                            { title: 'Tanggal Kegiatan', data: 'tanggal_diklat'},
                        ]}
                        data={Data}
                        border
                    />

<h4>Jumlah Pegawai yang ikut kegiatan</h4>
                <SimpleTable
                        columns={[
                            { title: 'Jenis Kegiatan', data: 'jenis_kegiatan' },
                            { title: 'Januari', data: 'Januari' },
                            { title: 'Februari', data: 'Februari' },
                            { title: 'Maret', data: 'Maret' },
                            { title: 'April', data: 'April' },
                            { title: 'Mei', data: 'Mei' },
                            { title: 'Juni', data: 'Juni' },
                            { title: 'Juli', data: 'Juli' },
                            { title: 'Agustus', data: 'Agustus' },
                            { title: 'September', data: 'September' },
                            { title: 'Oktober', data: 'Oktober' },
                            { title: 'November', data: 'November' },
                            { title: 'Desember', data: 'Desember' },
                        ]}
                        data={DataJenis}
                        border
                    />
            </div>
            
        )
}

const TableSedangDiklat = React.memo(TableSedangDiklatKomponent);
export default TableSedangDiklat;