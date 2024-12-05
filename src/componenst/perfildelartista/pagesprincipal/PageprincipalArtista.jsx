import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { useParams } from 'react-router-dom';
import 'aos/dist/aos.css';
import styled, {keyframes, createGlobalStyle } from 'styled-components';
import Pcabezeraartista from '../Cabezeradelartitas/Pcabezeraartista';
import { eventomostraridporelnombre, eventsMostrarIdEvents } from '../../../api/TaskEvento';
import { useConciertoStore } from '../../../useUserStore';
import Iconosdeinfo from '../IconosDeInfo/Iconosdeinfo';
import Pplanosdelconcierto from '../Planosdelartista/Pplanosdelconcierto';
import Footer from '../../piedepagina/piedepagina';
import Header from '../../paginaprincipal/encabezado/Hedear';
import PricingTable from '../../PerfilEmpresario/InfoPersonalArtitas/PricingTable';
import TermsAndConditions from '../../condition/Terminos';
import DATAdelempresario from '../Infodelempresario/DATAdelempresario';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html, body {
    width: 100%;
    overflow-x: clip;
    background-color: #1e1e1e;
    font-family: Arial, Helvetica, sans-serif;
  }
`;
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
const AppWrapper = styled.div`
  width: min(100%, 100vw);
  margin: 0 auto;
  background-color: #1e1e1e;
`;
const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const Loader = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 0, 0, 0.1);
  border-top-color: #ff4444;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;
const Section = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const EmptyComponent = () => {
  const [event, setEvent] = useState(null);
  const { conciertoId } = useConciertoStore();
  const [loading, setLoading] = useState(true);
  const { autor } = useParams(); 
  const {setConciertoId}= useConciertoStore();
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  useEffect(() => {
    const getEvent = async () => {
      try {
        const responid= await eventomostraridporelnombre({id:autor});
        if(responid.data.id_eventos){
          setConciertoId(responid.data.id_eventos)
          const response = await eventsMostrarIdEvents(responid.data.id_eventos);
          setEvent(response.data);
        }
  
       
      } catch (error) {
        console.log
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [autor]);

  if (loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <Section>
          <Header />
        </Section>

        <Section data-aos="fade-right">
          <Pcabezeraartista event={event} />
        </Section>

        <Section data-aos="fade-left">
          <Iconosdeinfo event={event} />
        </Section>

        <Section data-aos="fade-right">
          <Pplanosdelconcierto event={event} />
        </Section>

        <Section data-aos="fade-left">
          <PricingTable id={conciertoId} />
        </Section>
        <Section data-aos="fade-up">
          <DATAdelempresario event={event} />
        </Section>

        <Section data-aos="fade-right">
          <TermsAndConditions />
        </Section>   

        <Section data-aos="fade-up">
          <Footer />
        </Section>
      </AppWrapper>
    </>
  );
};

export default EmptyComponent;