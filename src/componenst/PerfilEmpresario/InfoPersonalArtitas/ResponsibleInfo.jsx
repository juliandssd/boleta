import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faFileAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { infoevento__editarresponsabilidades } from '../../../api/TaskEvento';


// Contenedor principal centrado con margen añadido
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  /* Alinea verticalmente el contenido */
  gap: 40px; /* Espaciado entre cada item */
  background-color: #1e1e1e;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  color: #00e6e6;
  width: 100%;
  max-width: 95%;
  margin: 20px; /* Margen para evitar que sobresalga */
`;

// Contenedor de cada ítem de información
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  color: #b3b3b3;
  justify-content: center;
`;

// Estilo para los íconos
const Icon = styled(FontAwesomeIcon)`
  font-size: 24px;
  margin-right: 10px;
  color: #00e6e6; /* Color de los íconos */
`;

// Estilo para el texto de título
const InfoText = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #fff; /* Color blanco para el texto principal */
`;

// Estilo para el texto adicional (como nombres, etc.)
const SubText = styled.div`
  font-size: 14px;
  color: #ccc; /* Color más claro para el texto secundario */
`;

// Botón de editar
const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Input = styled.input`
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  color: #333;
`;

const ResponsibleInfo = ({event,info}) => {
  // Estados para los valores y para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [responsable, setResponsable] = useState(info.responsable);
  const [nit, setNit] = useState(info.nit);
  const [pulep, setPulep] = useState(info.Pulep);
  const [isSaving, setIsSaving] = useState(false);

const editarresponsabilidaes=async()=>{
    try {
        setIsSaving(true);
        const data ={
            id:event.id_eventos,
            respo:responsable,
            _nit:nit,
            _Pulep:pulep
        }
        const response = await infoevento__editarresponsabilidades(data);
    } catch (error) {
        
    }finally {
      setIsSaving(false); // Reactiva el botón
    }
}
  // Función para alternar entre edición y vista
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Función para guardar los cambios (puedes agregar lógica para enviar los cambios al backend si es necesario)
  const saveChanges =async() => {
    setIsEditing(false);
   await editarresponsabilidaes();
  };

  return (
    <>
      <InfoContainer>
        <InfoItem>
          <Icon icon={faBriefcase} />
          <div>
            <InfoText>Responsable:</InfoText>
            {isEditing ? (
              <Input
                value={responsable}
                onChange={(e) => setResponsable(e.target.value)}
              />
            ) : (
              <SubText>{responsable}</SubText>
            )}
          </div>
        </InfoItem>
        <InfoItem>
          <Icon icon={faFileAlt} />
          <div>
            <InfoText>Nit:</InfoText>
            {isEditing ? (
              <Input value={nit} onChange={(e) => setNit(e.target.value)} />
            ) : (
              <SubText>{nit}</SubText>
            )}
          </div>
        </InfoItem>
        <InfoItem>
          <Icon icon={faKey} />
          <div>
            <InfoText>Pulep:</InfoText>
            {isEditing ? (
              <Input value={pulep} onChange={(e) => setPulep(e.target.value)} />
            ) : (
              <SubText>{pulep}</SubText>
            )}
          </div>
        </InfoItem>
      </InfoContainer>

      <div style={{ textAlign: 'center' }}>
        {isEditing ? (
          <EditButton onClick={saveChanges}>Guardar</EditButton>
        ) : (
          <EditButton onClick={toggleEdit}>Editar</EditButton>
        )}
      </div>
    </>
  );
};

export default ResponsibleInfo;
