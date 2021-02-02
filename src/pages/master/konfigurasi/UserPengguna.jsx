import React from 'react';
import {Content, Col, Row, DataTable, Alert, Box} from 'adminlte-2-react';


  const UserPengguna = () => {
    const firstColumns = [
        { title: 'Rendering engine', data: 'engine' },
        { title: 'Browser', data: 'browser' },
        { title: 'Platform(s)', data: 'platform' },
        { title: 'Engine version', data: 'engineVersion' },
        { title: 'CSS grade', data: 'cssGrade' },
    ];
      const data = [
        {engine: 'Trident', browser: 'Internet Explorer 4.0', platform: 'Win 95+', engineVersion: ' 4', cssGrade: 'X'}
      ]

      return(
        <div className='full-height'>
            <Content title="User Pengguna">
                <Alert closable type="success" title="Informasi Umum" icon="fa-info">Halaman ini untuk menambahkan user pengguna/pejabat untuk dipilih sebagai peserta</Alert>
                <Row>
                    <Col md={12}>
                    <Box title="Daftar Pengguna Sistem" customOptions={
                        <div><button className='btn btn-success btn-sm'>Tambah pengguna</button></div>
                    }>
                        <div className={'table-responsive'}>
                            <DataTable
                            columns={firstColumns}
                            options={{
                                paging: true,
                                lengthChange: false,
                                searching: true,
                                ordering: true,
                                info: true,
                                autoWidth: false,
                            }}
                            data={data}
                            footer
                            />
                        </div>
                    </Box>
                    </Col>
                </Row>
            </Content>
            
        </div>
      )
  }

  export default UserPengguna;