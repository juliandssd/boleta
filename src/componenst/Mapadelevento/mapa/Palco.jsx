import React, { useState, useEffect, useRef  } from 'react';
import styled from 'styled-components';
import {  posicionesmostrar } from '../../../api/Taskposiciones';
import HeaderWithButton from '../Cabezeradelmapa/AgregarSvg';
import SVGPanel from '../VisualizarSvg/SvgVisualizar';
import ObjectControlPanel from '../buttondeopciones/Option';
import SeatMapConfiguration from './Mapaconfiguracion';
import { useConciertoStore } from '../../../useUserStore';
import PriceList from '../CategoryPalco/Categoryinfopalco';
import ColorPicker from '../Detectarcolor/ColorPicker';
import TablaDePrecioE from '../Listprecio/TablaDePrecio';



// En CircleMap.js, ajusta `MainContainer` y `PriceAndSeatMapContainer`:

const ComponentContainer = styled.div`
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
`;
const PriceAndSeatMapContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  padding: 0;
  margin-top: 20px; /* Opcional: margen superior */
  gap: 10px; /* Agrega espacio entre los componentes */
`;
// Ajuste de `SeatMapConfiguration` para que ocupe el espacio completo
const StyledSeatMapConfiguration = styled(SeatMapConfiguration)`
  flex: 1; /* Ocupa el espacio disponible */
  height: 80vh; /* Asegura una altura uniforme */
  margin: 0;
  margin-right: 10px; 
`;

// Ajuste de `PriceList` para que tenga un ancho fijo
const StyledPriceList = styled(PriceList)`
  width: 300px;
  margin-left: 10px; /* Espacio a la izquierda de PriceList */
  padding: 0;
`;
const CircleMap = () => {
  const [objects, setObjects] = useState([]); // Objetos en el plano
  const [selectedObjectId, setSelectedObjectId] = useState(null);
 const [infoposicion,setinfoposicion]=useState([]);
const {conciertoId}=useConciertoStore();
  const [isMoveEnabled, setIsMoveEnabled] = useState(true);
  useEffect(() => {
    const cargarimgbasededatos = async () => {
      try {
        const response = await posicionesmostrar();
        setObjects(response.data);// Asegúrate de que los datos tengan los IDs correctos
   
      } catch (error) {
        console.error(error);
      }
    };
    cargarimgbasededatos();
  }, []);

  return (
    <MainContainer >
    <ComponentContainer>
    <HeaderWithButton/>
    </ComponentContainer>

    <ComponentContainer>
      <SVGPanel />
    </ComponentContainer>


      <ComponentContainer>
        <ObjectControlPanel setObjects={setObjects} infoposicion={infoposicion} setIsMoveEnabled={setIsMoveEnabled}
         isMoveEnabled={isMoveEnabled}
        selectedObjectId={selectedObjectId}
        setSelectedObjectId={setSelectedObjectId}/>
      </ComponentContainer>
      <PriceAndSeatMapContainer>
        <StyledSeatMapConfiguration setinfoposicion={setinfoposicion}  objects={objects} />
        <StyledPriceList />
        <ColorPicker/>
      </PriceAndSeatMapContainer>
     <TablaDePrecioE/>
    </MainContainer>
  );
  
};

export default CircleMap;



