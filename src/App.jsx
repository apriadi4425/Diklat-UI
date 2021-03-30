import React, { useContext } from 'react';
import AdminLTE, {
  Sidebar, Footer, Navbar,
} from 'adminlte-2-react';

import Index from './pages/rebuilds/Index';
import DashboardV2 from './pages/rebuilds/DashboardV2';
import ChartJS from './pages/rebuilds/charts/ChartJS';
import Widgets from './pages/rebuilds/Widgets';

import UserPengguna from './pages/master/konfigurasi/UserPengguna';
import Diklat from './pages/master/data/diklat/Diklat';
import DetilDiklat from './pages/master/data/diklat/DetilDiklat';
import Sertifikat from './pages/master/data/sertifikat/Sertifikat';
import Aplikasi from './pages/konfigurasi/Aplikasi';
import MyProfile from './pages/konfigurasi/UserPengguna';
import { GlobalStateContext } from './GlobalState';

const { Item, Header } = Sidebar;
const { Entry } = Navbar;
const App = ({ history }) => {
  const { Otoritas, setOtoritas } = useContext(GlobalStateContext);
  return (
    <AdminLTE title={['PTUN']} browserTitle="SI-STUDILA" theme="black" footer={<Footer />}>

      <Navbar.Core>
        <Entry
          icon="fas-power-off"
          onClick={() => {
            localStorage.clear();
            setOtoritas(0);
            history.push('/login');
          }}
        />
      </Navbar.Core>
      <Sidebar.Core>

        <Header text="MAIN NAVIGATION" />
        <Item to="/app/beranda" text="Beranda" icon="fa-tachometer-alt" />

        <Item text="Master Data" icon="fa-chart-pie">
          <Item text="Kegiatan" to="/app/master/diklat" />
          <Item text={Otoritas == 1 ? 'Sertifikat Peserta' : 'Sertifikat Saya'} to="/app/master/sertifikat" />
        </Item>


        <Header text="KONFIGURASI" />
        {
            Otoritas == 1
              ? (
                <React.Fragment>
                  <Item to="/app/konfigurasi-pengguna" text="User Pengguna" icon="fa-users" />
                  <Item to="/app/konfigurasi" text="Konfigurasi Aplikasi" icon="fa-cogs" />
                </React.Fragment>
              )
              : null
          }
        <Item to="/app/profile-saya" text="Profile Saya" icon="fa-user" />


      </Sidebar.Core>
      <Index path="/app" exact />

      <DashboardV2 path="/app/beranda" />
      <ChartJS path="/app/chart-js" exact />
      <Widgets path="/app/widgets" exact />
      <UserPengguna path="/app/konfigurasi-pengguna" />
      <Diklat path="/app/master/diklat" exact />
      <DetilDiklat path="/app/master/diklat/:slug" />
      <Sertifikat path="/app/master/sertifikat" />
      <Aplikasi path="/app/konfigurasi" />
      <MyProfile path="/app/profile-saya" />

    </AdminLTE>
  );
};

export default App;
