import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usuariobloqueadoactualizarbloqueo, usuariobloqueadoMostrarminutos } from '../../../api/Taskusuario';
import { useStoreEncryp } from '../../../useUserStore';
import { useNavigate } from 'react-router-dom';
import { detalleeliminar } from '../../../api/Taskdetalle';

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Outfit', sans-serif;
  font-weight: 800;
  color: #f8f9fa;
  margin-top: 20px;
`;

const CountdownDigit = styled.div`
  background-color: #17191d;
  color: #f8f9fa;
  font-size: 40px;
  padding: 14px 20px;
  border-radius: 8px;
  margin: 0 8px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 0.4s, color 0.4s, transform 0.3s, box-shadow 0.3s;

  &.active {
    background-color: #e63946;
    color: #fff;
    transform: translateY(-4px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }
`;

const ModernCountdownTimer = () => {
  const encryptedId = useStoreEncryp((state) => state.encryptedId);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(0 * 60); // 15 minutes in seconds
const info=async ()=>{
  try {
    const respon=await usuariobloqueadoactualizarbloqueo({id:encryptedId});
    if (respon.data.message==='correctamente') {
      const response =await usuariobloqueadoMostrarminutos({id:encryptedId});
      if (response.data.message.estado==='BLOQUEADO') {
        const responde= await detalleeliminar({id:encryptedId});
        navigate('/',{replace:true});
      }else{
        const  data =response.data.message.minutos_restantes;
        setCountdown(data* 60);
      }
   
    }

  } catch (error) {
    console.log(error);
  }
}
useEffect(()=>{
  info();
},[])

useEffect(() => {
  const interval = setInterval(() => {
    setCountdown((prevCount) => {
      if (prevCount <= 0) {     
        clearInterval(interval);
        return 0;
      }
      return prevCount - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, []);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  return (
    <CountdownContainer>
      <CountdownDigit className={countdown <= 60 ? 'active' : ''}>
        {Math.floor(minutes / 10)}
      </CountdownDigit>
      <CountdownDigit className={countdown <= 60 ? 'active' : ''}>
        {minutes % 10}
      </CountdownDigit>
      <CountdownDigit className={countdown <= 10 ? 'active' : ''}>
        {Math.floor(seconds / 10)}
      </CountdownDigit>
      <CountdownDigit className={countdown <= 10 ? 'active' : ''}>
        {seconds % 10}
      </CountdownDigit>
    </CountdownContainer>
  );
};

export default ModernCountdownTimer;