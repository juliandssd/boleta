import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componenst/login/iniciosesion';
import RegisterForm from './componenst/login/createusuario';
import SeatMap from './componenst/Mapadelevento/mapa/Palco';
import LoginForm from './componenst/PerfilEmpresario/LoginEmpresa';
import PerfilEmpresario from './componenst/PerfilEmpresario/perfilprincipal/PerfilPrincipal';
import ModernEventComponent from './componenst/PerfilEmpresario/InfoPersonalArtitas/CabezeradelArtista';
import PrincipalComponent from './componenst/paginaprincipal/Contenidoprincipal/panelprincipal';
import EmptyComponent from './componenst/perfildelartista/pagesprincipal/PageprincipalArtista';
import CarritocompraAPP from './componenst/Carritocompras/Pagesprincipal/Pagesprincipal';
import PaymentHomePage from './componenst/Detalledelpago/principal/PrincipalDetallePago';
import { useStoreEncryp } from './useUserStore';
import ProtectedRoute from './ProtectedRoute';
import VerificacionCodigo from './componenst/login/Verificarnumero';
function App() {
  return (
    <Router>
      <div style={{ backgroundColor:'#1e1e1e', margin:0, padding:0 }}>
        <Routes>
          <Route path='/' element={<PrincipalComponent/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
          <Route path='/evento/:autor' element={<EmptyComponent/>}/>
          <Route path='/perfil/empresario/mapa' element={<SeatMap/>}/>
          <Route path='/perfilempresario' element={<LoginForm/>}/>
          <Route path='/empresario/editar/info' element={<PerfilEmpresario/>}/>
          <Route path='/verify/number' element={<VerificacionCodigo/>}/>
          {/* Ruta protegida */}
          <Route 
            path='/detalle/pago' 
            element={
              <ProtectedRoute>
                <PaymentHomePage />
              </ProtectedRoute>
            }
          />
          <Route path='/carrito/de/compra' element={<CarritocompraAPP/>}/>
          <Route path='/component' element={<ModernEventComponent/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;