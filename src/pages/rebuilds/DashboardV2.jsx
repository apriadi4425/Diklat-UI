/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved, jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';

import {
  Content, Col, Row, Box, Chatbox, Memberbox,
  ProductList, ProductListItem, Infobox, Alert
} from 'adminlte-2-react';
import InfoModal from './InfoModal';
import {
  alert, infobox5, infobox6, infobox7, infobox8, latestOrders
} from './DashboardV2.Info';


import UpperInfoBoxes from './dashboardV2/UpperInfoBoxes';
import upperInfoBoxesString from '!raw-loader!./dashboardV2/UpperInfoBoxes';
import TableSedangDiklat from './dashboardV2/TableSedangDiklat';

class DashboardV2 extends Component {
  state = {
    showInfoModal: false,
    infoModalText: null,
  }

  constructor() {
    super();
    this.onHide = this.onHide.bind(this);
    this.showInfoModal = this.showInfoModal.bind(this);
  }

  onHide() {
    this.setState({ showInfoModal: false, infoModalText: null });
  }

  showInfoModal(text) {
    this.setState({ showInfoModal: true, infoModalText: text });
  }

  render() {
    const { showInfoModal, infoModalText } = this.state;
    return (
      <div className='full-height'>
        <div className='untuk_menutupi text-center'>
          <p className='text_judul'>PTUN-DIKLAT</p>
        </div>
      <Content title="Beranda" subTitle="Versi 1.0.0">
        <div onClick={() => this.showInfoModal(alert)}>
          <Alert closable type="info" title="Informasi Halaman" icon="fa-info">Halaman ini untuk melihat analisa keseluruhan data aplikasi</Alert>
        </div>
        <InfoModal show={showInfoModal} onHide={this.onHide} text={infoModalText} />
        <Row onClick={() => this.showInfoModal(upperInfoBoxesString)}>
          <UpperInfoBoxes />
        </Row>
        <Row>
          <Col md={12}>
            <Box
              title="Pegawai sedang mengikuti kegiatan"
              collapsable
              closable
              options={<ul />}
            >
              <Row>
              <Col md={12}>
                <TableSedangDiklat/>
              </Col>
              </Row>
            </Box>
          </Col>
        </Row>
        
      </Content>
      </div>
    );
  }
}

export default DashboardV2;
