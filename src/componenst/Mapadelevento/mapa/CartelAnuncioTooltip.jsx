import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaInfoCircle } from 'react-icons/fa';
import { MostrarPosicionesporidposiciones } from '../../../api/Taskpalco';

const TooltipContainer = styled.div`
  position: fixed;
  background-color: #2f3640;
  color: #f5f6fa;
  padding: 20px;
  border-radius: 12px;
  z-index: 1000;
  pointer-events: none;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transform: translate(-50%, -120%);
  max-width: 280px;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  font-family: Arial, Helvetica, sans-serif;
`;

const TooltipTitle = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TooltipContent = styled.div`
  font-size: 14px;
  margin-bottom: 5px;
  color: ${({ status }) => (status === 'AGOTADO' ? '#e74c3c' : '#dcdde1')}; 
  display: flex;
  justify-content: center;
`;

const InfoIcon = styled(FaInfoCircle)`
  color: #00a8ff;
  font-size: 20px;
`;

const Tooltip = ({ x, y, data, id_posidata }) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    console.log(id_posidata);
    // Verifica que `id_posidata` tenga un valor antes de hacer la solicitud
    if (id_posidata) {
      const fetchTooltipData = async () => {
        try {
          console.log("Fetching data for ID:", id_posidata);
          const response = await MostrarPosicionesporidposiciones(id_posidata);
          const data = response.data;
          if (data && Object.keys(data).length > 0) {
            setInfo(data); // Actualiza solo si hay datos válidos
          } else {
            setInfo(null); // Configura null si no hay datos
          }
        } catch (error) {
          console.log("Error fetching data:", error);
          setInfo(null); // Configura null en caso de error
        }
      };

      fetchTooltipData();
    }
  }, [id_posidata]);

  if (!info) return null; // No mostrar el tooltip si no hay datos

  return (
    <TooltipContainer style={{ top: `${y + 15}px`, left: `${x + 15}px` }} visible={!!data}>
      <TooltipTitle>
        <InfoIcon /> {info.nombre}
      </TooltipTitle>
      <TooltipContent>COP ${info.precio}</TooltipContent>
      <TooltipContent status={info.estado_palco}>{info.estado_palco}</TooltipContent>
    </TooltipContainer>
  );
};

export default Tooltip;
