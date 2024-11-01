import React,{useEffect, useState} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled, { keyframes,createGlobalStyle } from 'styled-components';
import Pcabezeraartista from '../Cabezeradelartitas/Pcabezeraartista';
import { eventsMostrarIdEvents } from '../../../api/TaskEvento';
import { useConciertoStore } from '../../../useUserStore';
import Iconosdeinfo from '../IconosDeInfo/Iconosdeinfo';
import Pplanosdelconcierto from '../Planosdelartista/Pplanosdelconcierto';
import Footer from '../../piedepagina/piedepagina';
import Header from '../../paginaprincipal/encabezado/Hedear';
import PricingTable from '../../PerfilEmpresario/InfoPersonalArtitas/PricingTable';
import TermsAndConditions from '../../condition/Terminos';
import DATAdelempresario from '../Infodelempresario/DATAdelempresario';
const loadingAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #1e1e1e;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
// Estilo para el contenedor de la barra de carga
const LoadingBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ddd;
  position: relative;
  overflow: hidden;
`;

// Estilo para la barra de carga animada
const LoadingBar = styled.div`
  width: 100%;
  height: 100%;
  background-color: #3b5998; /* Color de Facebook */
  position: absolute;
  animation: ${loadingAnimation} 1.5s infinite;
`;
// Definir un contenedor vacío con styled-components
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column; /* Alineación en columnas */

  background-color: #1e1e1e;
  gap: 20px; /* Espacio entre filas */
`;
const SubContainer = styled.div`
 width: 100%;
  height: 100vh;
  display: flex; /* Alineación en columnas */
  align-items: center;
`;

const EmptyComponent = () => {
const [event,setevent]=useState(null);
    const {conciertoId}=useConciertoStore();
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      AOS.init({
        duration: 1000, // Duración de la animación
        once: true, // La animación solo ocurre una vez
      });
    }, []);

    useEffect(()=>{
        const infoevent=async()=>{
          try {
            const response  = await eventsMostrarIdEvents(conciertoId);
            setevent(response.data);
            setLoading(false); 
          } catch (error) {
            
          }finally{
            setLoading(false); 
          }
        }
        infoevent();
          },[])
          if (loading) {
            return <div>Cargando...</div>; // Mostrar mientras está cargando
          }
          if (loading) {
            return (
              <LoadingBarContainer>
                <LoadingBar />
              </LoadingBarContainer>
            ); // Mostrar barra de carga mientras está cargando
          }
  
  return (
    <Container>
     <GlobalStyle /> 
     <Header/>
       {/* Usa AOS en cada componente para controlar la animación */}
       <SubContainer data-aos="fade-right">
       <Pcabezeraartista event={event} />
      </SubContainer>

      <div data-aos="fade-left">
      <Iconosdeinfo event={event} />
      </div>

      <SubContainer data-aos="fade-right">
      <Pplanosdelconcierto event={event} />
      </SubContainer>

      <div data-aos="fade-left">
        <PricingTable />
      </div>

      <div data-aos="fade-right">
      <TermsAndConditions />
      </div>

      <div data-aos="fade-up">
      <DATAdelempresario event={event} />
      </div>

      <div data-aos="fade-up">
      <Footer />
      </div>
    </Container>
  );
};

export default EmptyComponent;
