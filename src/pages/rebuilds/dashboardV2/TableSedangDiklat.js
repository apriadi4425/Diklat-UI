import React, {useState, useCallback, useEffect} from 'react';
import {SimpleTable, ProgressBar, Badge} from 'adminlte-2-react';
import axios from 'axios';

const TableSedangDiklatKomponent = () => {
    const Token = JSON.parse(localStorage.getItem('token'));
    const [Data, setData] = useState([]);
    const [Loading, setLoading] = useState(true)

    const GetData = useCallback(async () => {
        await axios.get(`${process.env.REACT_APP_BASE_URL}/api/sedang-diklat`,{
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
                            { title: 'Nama Diklat', data: 'nama_diklat'},
                            { title: 'Tempat Diklat', data: 'tempat_diklat'},
                            { title: 'Tanggal Diklat', data: 'tanggal_diklat'},
                        ]}
                        data={Data}
                        border
                    />
            </div>
        )
}

const TableSedangDiklat = React.memo(TableSedangDiklatKomponent);
export default TableSedangDiklat;