import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCalendarAlt, faClock, faDoorOpen, faUser, faEdit } from '@fortawesome/free-solid-svg-icons';
import { eventoeditaredades } from '../../../api/TaskEvento';


const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  color: #00e6e6;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #00e6e6;
  font-family: 'Poppins', sans-serif;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 28px;
  margin-bottom: 10px;
`;

const InfoText = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const SubText = styled.div`
  font-size: 14px;
  color: #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const EditButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const EventInfoBlue = ({event,location,info}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [hora, setHora] = useState(info.hora);
  const [aperturaPuertas, setAperturaPuertas] = useState(info.horadeapertura);
  const [edadMinima, setEdadMinima] = useState(info.edadminima);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    btnguardarmodificaredades();
    // Aquí puedes llamar a la función para guardar los cambios en la base de datos
    // y enviar los datos actualizados de `hora`, `aperturaPuertas` y `edadMinima`
  };
  const btnguardarmodificaredades= async ()=>{
    try {
        const data ={
            id:event.id_eventos,
            hora:hora,
            horainicio:aperturaPuertas,
            edad:edadMinima
        }
        const response = await eventoeditaredades(data);
    } catch (error) {
        console.log(error);
    }
  }


  return (
    <>
      <InfoContainer>
        <InfoItem>
          <Icon icon={faMapMarkerAlt} />
          <InfoText>Lugar</InfoText>
          <SubText>{location}</SubText>
        </InfoItem>
        <InfoItem>
          <Icon icon={faCalendarAlt} />
          <InfoText>Fecha</InfoText>
          <SubText>{event.fecha}</SubText>
        </InfoItem>
        <InfoItem>
          <Icon icon={faClock} />
          <InfoText>Hora</InfoText>
          {isEditing ? (
            <input value={hora} onChange={(e) => setHora(e.target.value)} />
          ) : (
            <SubText>{hora}</SubText>
          )}
        </InfoItem>
        <InfoItem>
          <Icon icon={faDoorOpen} />
          <InfoText>Apertura de puertas</InfoText>
          {isEditing ? (
            <input value={aperturaPuertas} onChange={(e) => setAperturaPuertas(e.target.value)} />
          ) : (
            <SubText>{aperturaPuertas}</SubText>
          )}
        </InfoItem>
        <InfoItem>
          <Icon icon={faUser} />
          <InfoText>Edad mínima</InfoText>
          {isEditing ? (
            <input value={edadMinima} onChange={(e) => setEdadMinima(e.target.value)} />
          ) : (
            <SubText>{edadMinima}</SubText>
          )}
        </InfoItem>
      </InfoContainer>

      <ButtonContainer>
        {isEditing ? (
          <EditButton onClick={handleSaveClick}>Guardar</EditButton>
        ) : (
          <EditButton onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} /> Editar
          </EditButton>
        )}
      </ButtonContainer>
    </>
  );
};

export default EventInfoBlue;
