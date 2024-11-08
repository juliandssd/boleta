import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaUpload } from 'react-icons/fa';
import { Insertarsvg } from '../../../api/Task';
import { useConciertoStore, useUserStore } from '../../../useUserStore';
import { CategorymostrarporIDvento } from '../../../api/TaskEvento';
// Estilos generales del contenedor para centrar el formulario
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #2d2d2d;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
`;

// Estilos del formulario
const Form = styled.form`
  position: relative; /* Añade esto para que el botón de cierre esté dentro del formulario */
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 300px;
  width: 100%;
  color: #fff;
`;

// Botón para cerrar en la parte superior derecha
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
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

// Resto del código que ya tenías
const FormGroup = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #fff;
  text-align: left; 
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  background-color: #444;
  color: #fff;
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
`;

const UploadButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 0 auto;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const PreviewImage = styled.img`
  margin-top: 10px;
  max-width: 50%;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
  display: grid;
  place-items: center;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;  /* Cambia el color del botón cuando esté deshabilitado */
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
// Agrega este contenedor para organizar las vistas previas de múltiples imágenes
const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
`;

// Asegúrate también de tener `PreviewImage` definido



const FormComponent = ({ onClose }) => {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]); 
  const {conciertoId}=useConciertoStore();
  const [previewURL, setPreviewURL] = useState('');
  const [errors, setErrors] = useState({});
  const [archivo, setarchivo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);  // Estado de carga
  const [successMessage, setSuccessMessage] = useState('');  // Estado para el mensaje de éxito
  const id_usuario =useUserStore((state) => state.userId);
  const [isNewCategory, setIsNewCategory] = useState(false); // Declaración de isNewCategory en el estado
  const [newCategory, setNewCategory] = useState('');
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const svgFiles = selectedFiles.filter(file => file.type === 'image/svg+xml');
    
    if (svgFiles.length) {
      setFiles(svgFiles.map(file => ({
        file,
        previewURL: URL.createObjectURL(file) // Genera la URL de vista previa para cada archivo
      })));
      setErrors({ ...errors, file: '' });
    } else {
      setFiles([]);
      setErrors({ ...errors, file: 'Por favor, sube solo archivos SVG.' });
    }
  };
  
  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const validateForm = () => {
    let formErrors = {};
  
    // Validar si al menos un archivo ha sido seleccionado
    if (!files.length) {
      formErrors.file = 'Es obligatorio subir al menos un archivo.';
    }
  
    // Validar si la categoría ha sido seleccionada
    if (!category) {
      formErrors.category = 'La categoría es obligatoria.';
    }
  
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setSuccessMessage('');
      try {
        for (const fileObj of files) {
          console.log(fileObj.file); // Asegúrate de que `fileObj.file` esté definido
           await InsertarsvgEnfronte(fileObj.file); // Comenta esta línea si deseas probar solo la validación
        }
        setSuccessMessage('Registrado correctamente.');
        setFiles([]); // Limpia la lista de archivos seleccionados
        setCategory(''); // Limpia la categoría seleccionada
        onClose();
      } catch (error) {
        console.error('Error al registrar los archivos:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  
  useEffect(()=>{
    const fetdata=async()=>{
      try {
        const response = await CategorymostrarporIDvento(conciertoId);
        setCategories(response.data);
      } catch (error) {
        
      }
    }
    fetdata();
  },[])

  const InsertarsvgEnfronte = async (file) => {
    const currentDateTime = new Date(); // Obtiene la fecha y hora actual
    const timezoneOffset = currentDateTime.getTimezoneOffset() * 60000; // Convierte la diferencia a milisegundos
    const localDateTime = new Date(currentDateTime.getTime() - timezoneOffset); // Ajusta la hora a la zona horaria local
  
    // Formatear la fecha y hora en el formato deseado
    const formattedDateTime = localDateTime.toISOString().replace('T', ' ').split('.')[0];
    const formData = new FormData(); // Crea un nuevo FormData
    formData.append('file', file);
    formData.append('date', formattedDateTime);
    formData.append('id_usuarioevento', conciertoId);
    formData.append('category', category);
    formData.append('estado', 'PUBLICO');
    
    try {
      const response = await Insertarsvg(formData);
      const data =response.data;
    } catch (error) {
      console.log(error); // Lanza el error para manejarlo en otro lugar si es necesario
    }
  };
  const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
  display: flex;
  justify-content: center; /* Centra el modal horizontalmente */
  align-items: center; /* Centra el modal verticalmente */
  z-index: 999; /* Asegúrate de que esté por encima del contenido de fondo */
`;
const ModalContent = styled.div`
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth; /* Comportamiento suave del scroll */
  position: relative;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
`;
const NewCategoryInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-top: 10px;
  border: 2px solid #007bff;
  border-radius: 5px;
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #0056b3;
  }

  &::placeholder {
    color: #888;
  }
`;

const handleFocus = (e) => {
  e.preventDefault(); // Previene el movimiento del scroll al obtener el foco
};
const handleCategoryChange = (e) => {
  const selectedValue = e.target.value;
  if (selectedValue === 'NuevaCategoria') {
    setIsNewCategory(true);
    setCategory('');
  } else {
    setIsNewCategory(false);
    setCategory(selectedValue);
    setNewCategory('');
  }
};

const handleNewCategoryChange = (e) => {
  const value = e.target.value;
  setNewCategory(value);
  setCategory(value); // Actualizamos ambos estados
};

useEffect(()=>{
  const fetdata=async()=>{
    try {
      const response = await CategorymostrarporI
      setCategories(response.data);
    } catch (error) {
      
    }
  }
  fetdata();
},[])
  return (
    <Container>
  <ModalOverlay>
    <ModalContent>
      <Form onSubmit={handleSubmit}>
        {/* Botón de cierre en la parte superior derecha */}
        <CloseButton onClick={onClose}>X</CloseButton>
        <FormGroup>
      <Label htmlFor="category">Categoría:</Label>
      <Select value={category} onChange={handleCategoryChange}>
        <option value="">Categoría</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat.categoria}>
            {cat.categoria}
          </option>
        ))}
        <option value="NuevaCategoria">Crear nueva categoría...</option>
      </Select>
      {isNewCategory && (
  <NewCategoryInput
    type="text"
    value={newCategory}
    onChange={handleNewCategoryChange}
    placeholder="Nombre de nueva categoría"
    autoFocus
  />
)}
      {errors.category && <ErrorMessage>{errors.category}</ErrorMessage>}
    </FormGroup>
        <FormGroup>
          <HiddenInput
            type="file"
            id="fileInput"
            name="file"
            accept=".svg"
            onChange={handleFileChange}
            multiple
          />
          <UploadButton type="button" onClick={handleButtonClick}>
            <FaUpload />
            Subir archivos
          </UploadButton>
          {errors.file && <ErrorMessage>{errors.file}</ErrorMessage>}
          
          {/* Agrega PreviewContainer aquí para mostrar todas las vistas previas */}
          <PreviewContainer>
            {files.map((fileObj, index) => (
              <PreviewImage key={index} src={fileObj.previewURL} alt={`Vista previa ${index + 1}`} />
            ))}
          </PreviewContainer>
        </FormGroup>
        <Button onClick={handleSubmit} type="submit" disabled={isLoading}>
          {isLoading ? 'Cargando...' : 'Guardar'}
        </Button>

        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </Form>
    </ModalContent>
  </ModalOverlay>
</Container>

  );
};

export default FormComponent;
