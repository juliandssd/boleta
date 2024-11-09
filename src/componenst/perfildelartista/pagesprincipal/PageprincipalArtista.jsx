import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled, { createGlobalStyle } from 'styled-components';
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

const AppWrapper = styled.div`
  width: min(100%, 100vw);
  margin: 0 auto;
  background-color: #1e1e1e;
`;

const Section = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const EmptyComponent = () => {
  const [event, setEvent] = useState(null);
  const { conciertoId } = useConciertoStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await eventsMostrarIdEvents(conciertoId);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getEvent();
  }, [conciertoId]);

  if (loading) {
    return <div>Cargando...</div>;
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

        <Section data-aos="fade-right">
          <TermsAndConditions />
        </Section>

        <Section data-aos="fade-up">
          <DATAdelempresario event={event} />
        </Section>

        <Section data-aos="fade-up">
          <Footer />
        </Section>
      </AppWrapper>
    </>
  );
};

export default EmptyComponent;