import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUpload } from 'react-icons/fa';
import { InsertarImgeventosT,infoeventoinsertarpordefault } from '../../../api/TaskEvento';


// Estilos para el contenedor del formulario
const FormContainer = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: rgba(255, 255, 255, 0.1); /* Fondo translúcido */
  padding: 20px;
  border-radius: 20px; /* Bordes redondeados */
  width: 320px;
  margin: 20px auto;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.2); /* Sombra suave */
  backdrop-filter: blur(10px); /* Efecto de desenfoque */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde translúcido */
`;

// Estilos para los inputs flotantes y selectores
const FloatingInputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;

  input, select {
    width: 100%;
    padding: 12px 10px;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    color: white;
    font-size: 14px;
    outline: none;
    transition: 0.3s;
    appearance: none; /* Para ocultar la flecha predeterminada del select */

    &:focus {
      border-color: #007bff; /* Color azul para el borde al hacer focus */
      box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5); /* Sombra azul */
    }

    &:focus + label,
    &:not(:placeholder-shown) + label {
      transform: translateY(-20px);
      font-size: 12px;
      color: #007bff; /* Color azul para el label */
    }
  }

  label {
    position: absolute;
    left: 10px;
    top: 12px;
    color: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    pointer-events: none;
    transition: 0.3s ease-in-out;
  }

  /* Estilo para los selectores */
  select {
    background-color: #2b2b2b; /* Fondo oscuro */
    color: white;
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23007bff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>');
    background-repeat: no-repeat;
    background-position: right 10px top 50%;
    background-size: 16px;
  }

  option {
    background-color: #2b2b2b; /* Fondo oscuro para las opciones */
    color: white;
  }
  
  /* Estilos personalizados para el calendario */
  input[type="date"] {
    position: relative;
    color: white;

    &::-webkit-calendar-picker-indicator {
      filter: invert(1); /* Invertir los colores del icono del calendario */
      background-color: #007bff; /* Fondo azul para el icono del calendario */
      border-radius: 8px;
      cursor: pointer;
    }
  }
`;

// Estilos para el botón azul
const SubmitButton = styled.button`
  background: #007bff; /* Fondo azul para el botón */
  color: white;
  padding: 15px;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  box-shadow: 8px 8px 15px rgba(0, 0, 0, 0.3), -8px -8px 15px rgba(255, 255, 255, 0.1);

  &:hover {
    background-color: #0056b3; /* Azul más oscuro al pasar el ratón */
    box-shadow: inset 8px 8px 15px rgba(0, 0, 0, 0.3), inset -8px -8px 15px rgba(255, 255, 255, 0.1);
  }
`;

// Estilos para el botón de subir archivo centrado
const UploadButton = styled.label`
  display: inline-flex;
  justify-content: center; /* Centrar el botón horizontalmente */
  align-items: center;
  background-color: #007bff; /* Color azul */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  gap: 10px; /* Espacio entre el ícono y el texto */
  margin: 0 auto; /* Centrando el botón en el contenedor */
  margin-bottom: 20px; /* Separación inferior */

  &:hover {
    background-color: #0056b3; /* Azul más oscuro al hacer hover */
  }

  input {
    display: none; /* Ocultar el input de archivo */
  }

  svg {
    font-size: 18px; /* Tamaño del ícono */
  }
`;
const CloseButton = styled.button`
position: absolute;
top: -20px;
right: 10px;
background-color: #ff4d4d;
color: white;
border: none;
border-radius: 50%;
width: 30px;
height: 30px;
font-size: 18px;
cursor: pointer;
display: flex;
justify-content: center;
align-items: center;
&:hover {
  background-color: #cc0000;
}
`;

// Estilos para la vista previa de la imagen
const ImagePreview = styled.img`
  margin-top: 20px;
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
`;

const CreateEvent = ({onclose,id_usuariocreate,onAddEvent }) => {
  const [eventName, setEventName] = useState('');
  const [eventImage, setEventImage] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [eventCity, setEventCity] = useState('');
  const [eventCategory, setEventCategory] = useState('');
  const [imagePreview, setImagePreview] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [errorMessage, setErrorMessage] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [eventType,seteventType]=useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Validación de campos
    if (!eventName  || !eventCity || !eventCategory || !eventImage) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    // Validación de fecha (no puede ser menor a la fecha actual)
    if (eventType !=='Rifa') {
      if (eventDate < today) {
        setErrorMessage('La fecha del evento no puede ser anterior a hoy.');
        return;
      }
    }else{
      setEventDate('NULL');
    }


    setIsSubmitting(true);
    
    // Lógica para manejar el envío del formulario
    const formData = new FormData();
    formData.append('file', eventImage);
    formData.append('nombre', eventName);
    formData.append('fecha', eventDate);
    formData.append('ciudad', eventCity);
    formData.append('categoria', eventCategory);
    formData.append('id_usuario', id_usuariocreate);
    formData.append('Tipoevento',eventType);

    try {
      const response = await InsertarImgeventosT(formData);
      console.log(response.data);
      const newEvent = {
        id_eventos:response.data.id,
        nombre: eventName,
        img: URL.createObjectURL(eventImage), // Esto es solo para la vista previa, se debe cambiar por la URL que se obtiene de la API.
        ciudad: eventCity,
        categoria: eventCategory,
        fecha: eventDate
      };

      const info={
        id:response.data.id
      }
      const insert = await infoeventoinsertarpordefault(info);

      onAddEvent(newEvent);
    } catch (error) {
      console.log(error);
    } finally {
      onclose();
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventImage(file);
      setImagePreview(URL.createObjectURL(file)); // Crear la URL de vista previa de la imagen
    }
  };



  return (
    <FormContainer>
       <CloseButton onClick={onclose} type="button">X</CloseButton>
      <FloatingInputContainer>
        <select 
          id="eventCategory" 
          value={eventCategory} 
          onChange={(e) => setEventCategory(e.target.value)}
        >
          <option value="">Seleccionar categoría</option>
          <option value="Concierto">Concierto</option>
          <option value="Deportes">Deportes</option>
          <option value="Conferencia">Conferencia</option>
          <option value="Festival">Festival</option>
        </select>
        <label htmlFor="eventCategory">Categoría</label>
      </FloatingInputContainer>

      <FloatingInputContainer>
        <input 
          type="text" 
          id="eventName" 
          value={eventName} 
          onChange={(e) => setEventName(e.target.value)} 
          placeholder=" " /* Placeholder vacío para hacer que el label flote */
        />
        <label htmlFor="eventName">Nombre del Evento</label>
      </FloatingInputContainer>
      <FloatingInputContainer>
  <select 
    id="eventType" 
    value={eventType} 
    onChange={(e) => seteventType(e.target.value)}
  >
     <option value="">Tipo de evento</option>
    <option value="Boleta">Boleta</option>
    <option value="Rifa">Rifa</option>
  </select>
  <label htmlFor="eventType">Tipo de Evento</label>
</FloatingInputContainer>

{eventType !== "Rifa" && (
  <FloatingInputContainer>
    <input 
      type="date" 
      id="eventDate" 
      value={eventDate} 
      onChange={(e) => setEventDate(e.target.value)}
    />
    <label htmlFor="eventDate">Fecha del Evento</label>
  </FloatingInputContainer>
)}

      <FloatingInputContainer>
        <select 
          id="eventCity" 
          value={eventCity} 
          onChange={(e) => setEventCity(e.target.value)}
        >
          <option value="">Seleccionar ciudad</option>
          <option value="Bogotá">Bogotá</option>
          <option value="Medellín">Medellín</option>
          <option value="Cali">Cali</option>
          <option value="Cartagena">Cartagena</option>
        </select>
        <label htmlFor="eventCity">Ciudad</label>
      </FloatingInputContainer>

      {/* Botón de subir archivo centrado */}
      <UploadButton htmlFor="fileInput">
        <FaUpload />
        Subir archivo
        <input
          type="file"
          id="fileInput"
          onChange={handleFileChange}
        />
      </UploadButton>
      
      {imagePreview && <ImagePreview src={imagePreview} alt="Vista previa de la imagen" />}
      
      <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
      {isSubmitting ? 'Enviando...' : 'Crear Evento'}
      </SubmitButton>
    </FormContainer>
  );
};

export default CreateEvent;
