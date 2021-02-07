import React from 'react';
import {Content, Button, Inputs} from 'adminlte-2-react';
import { Tab, TabContent, Nav, NavItem, Tabs } from 'react-bootstrap';
import SuratTugasTabs from './Tabs/SuratTugasTabs';
import DokumentasiAcaraTabs from './Tabs/DokumentasiAcaraTabs';
import './Tabs/styletabs.css';

const ModalDokumentKomponen = ({Users, modal, toggle, IdDiklat, bukaHalamanPdf}) => {
    
    return (
        <Content title={'Dokument Diklat'} modal modalSize='lg' modalFooter={
            <React.Fragment>
                <Button text='Tutup' pullLeft onClick={toggle} />
            </React.Fragment> } show={modal}>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Surat Tugas">
                    <SuratTugasTabs Users={Users} TipeDokument={1} IdDiklat={IdDiklat} bukaHalamanPdf={bukaHalamanPdf}/>
                </Tab>
                <Tab eventKey={2} title="Dokumentasi Acara">
                    <DokumentasiAcaraTabs IdDiklat={IdDiklat}/>
                </Tab>
                <Tab eventKey={3} title="Piagam/Sertifikat">
                    <SuratTugasTabs Users={Users} TipeDokument={3} IdDiklat={IdDiklat} bukaHalamanPdf={bukaHalamanPdf}/>
                </Tab>
            </Tabs>
        </Content>
    )
}

const ModalDokument = React.memo(ModalDokumentKomponen);
export default ModalDokument;