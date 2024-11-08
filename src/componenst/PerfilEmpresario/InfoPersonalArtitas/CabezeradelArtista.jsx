import React,{useEffect,useState} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { eventsMostrarIdEvents,eventoeditarubicacion } from '../../../api/TaskEvento';
import EventInfoBlue from './InformaciondelEventoiconos';
import ImageUploadComponent from './plano';
import PricingTable from './PricingTable';
import TermsAndConditions from '../../condition/Terminos';
import ResponsibleInfo from './ResponsibleInfo';
import { useNavigate } from 'react-router-dom';
import { useConciertoStore, useEventStore } from '../../../useUserStore';

// Contenedor principal que organiza la disposición
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const EventContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 95%;
  max-width: 100%; /* Remueve cualquier margen superior */
  position: relative;
  top: 0; /* Coloca el componente en la parte superior */
  left: 0; /* Alinea a la izquierda */
`;



// Contenedor de la imagen
const ImageContainer = styled.div`
  flex: 1;
  max-width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  img {
    width: 100%;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

// Contenedor de la información del evento
const EventInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Esto asegura que el botón esté en la parte inferior */
  width: 100%;
  
  text-align: right; /* Alinea todo el texto a la derecha */
`;

// Título del evento
const EventTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: #f7f7f7;
  margin-bottom: 20px;
  text-align: left; /* Alinea solo el título al centro */
  width: 100%; /* Asegura que tome el ancho completo del contenedor */
`;

// Detalles del evento
const EventDetails = styled.div`
  display: flex;
  background-color: #333;
  flex-direction: column;
  gap: 5px;
  border-radius: 8px;
  padding: 15px;
width: 100%;
  .date {
    font-size: 20px;
    color: #00e6e6;
    font-weight: bold;
  }

  .city {
    font-size: 18px;
    color: white;
  }

  .location {
    font-size: 16px;
    color: #ccc;
  }
`;
const EditableText = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px; /* Espacio entre el texto y el icono */
  background-color: #333;
  padding: 10px;
  border-radius: 5px;
  color: white;

  .edit-icon {
    cursor: pointer;
    color: #ccc;

    &:hover {
      color: #fff; /* Cambia el color al pasar el cursor */
    }
  }

  input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    color: white;
    outline: none;
    font-size: 16px;
  }
`;

// Precio y botón de compra
// Precio y botón de compra
const PurchaseInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  text-align: right;
  background-color: #333;
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
  margin-right: 10px;
  width: 100%; /* Ocupa todo el ancho */
  gap: 10px; /* Añade espacio entre los botones */

  .price {
    font-size: 20px;
    font-weight: bold;
    color: #00e6e6;
  }

  .buyButton {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background-color: #0056b3;
    }
  }
`;



  


const ModernEventComponent = ({ event,initialLocation }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [infoeventsdata, setinfoevents] = useState(null);
  const [location, setLocation] = useState(initialLocation || "");
  const [originalLocation, setOriginalLocation] = useState(initialLocation || ""); 
  const { conciertoId } = useConciertoStore();
  const navigate = useNavigate();
  const { setEventId } = useEventStore();
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setLocation(e.target.value);
  };


  const handleBlur = () => {
    setIsEditing(false); // Guardar cambios al salir del input
    if (location !== originalLocation) {
      editarubicacion(); // Solo guarda si la ubicación ha cambiado
    }
  };

  useEffect(()=>{
const infoevent=async()=>{
  try {
    const response  = await eventsMostrarIdEvents(event.id_eventos);
    setinfoevents(response.data);
    setLocation(response.data.ubicaciondelevento);
    setOriginalLocation(response.data.ubicaciondelevento);
  } catch (error) {
    
  }
}
infoevent();
  },[event.id_eventos])


  const editarubicacion=async()=>{
    try {
      const data ={
        id_delevento:event.id_eventos,
        ubi:location
      }
      const response = await eventoeditarubicacion(data);
    } catch (error) {
      
    }
  }
  const pagemapa= () =>{
    try {
      setEventId(event.id_eventos)
      window.scrollTo(0, 0);      
      navigate('/perfil/empresario/mapa');
    } catch (error) {
      console.log(error);
    }
  }
  if (!infoeventsdata) {
    return <div>Cargando información del evento...</div>; // Muestra un mensaje de carga
  }
  return (
    <Container>
    <EventContainer>
      <ImageContainer>
        <img src={event.img} alt="Event" />
      </ImageContainer>
      
      <EventInfo>
        <EventTitle>{event.nombre}</EventTitle>

        <EventDetails>
          <div className="date">{event.fecha}</div>
          <div className="city">{event.ciudad}</div>
          <EditableText>
      {isEditing ? (
        <input
          type="text"
          value={location || ""} 
          onChange={handleInputChange}
          onBlur={handleBlur} // Cierra la edición al salir del input
          autoFocus
        />
      ) : (
        <>
        <span className={!location ? 'placeholder-text' : ''}>
            {location  || 'Haga clic para editar ubicación'}
          </span>
          <FontAwesomeIcon
            icon={faEdit}
            className="edit-icon"
            onClick={handleEditClick}
          />
        </>
      )}
    </EditableText>
        </EventDetails>

        <PurchaseInfo>
          <button onClick={pagemapa} className="buyButton">Crear mapa</button>
          <button className="buyButton">Comprar</button>
        </PurchaseInfo>
      </EventInfo>
    
    </EventContainer>
    <EventInfoBlue id={conciertoId} event={event} location={location} info={infoeventsdata} />
    <ImageUploadComponent event={event}/>
    <PricingTable id={conciertoId}/>
    <ResponsibleInfo  event={event} info={infoeventsdata}/>
    <TermsAndConditions/>
    </Container>
  );
};

export default ModernEventComponent;
