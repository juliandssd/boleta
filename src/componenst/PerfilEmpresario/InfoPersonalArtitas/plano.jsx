import React, { useState , useEffect, useRef  } from 'react';
import styled from 'styled-components';
import { planoinsertarimagenes,planomostrarporid_evento } from '../../../api/TaskEvento';


// Estilos para el contenedor del componente
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #2c2c2c;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.5);
  color: #fff;
  width: 100%;
  max-width: 900px;
  text-align: center;
`;

// Estilos para el botón de carga
const UploadButton = styled.button`
  padding: 12px 30px;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
const UploadedImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  margin-top:10px /* Asegura que el contenedor ocupe todo el ancho */
`;

// Estilos para cada imagen
const UploadedImage = styled.img`
width: calc(50% - 20px); /* Hace que las imágenes ocupen el 100% del contenedor */
  max-width: 50%; /* Mantén el ancho máximo al 100% para evitar que se estire más allá del contenedor */
  height: auto; /* Asegura que la altura sea proporcional al ancho para no distorsionar la imagen */
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  object-fit: contain; /* Muestra la imagen completa sin recortarla */
`;
// Estilos para la previsualización de la imagen
const PreviewImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
  margin-top: 20px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3);
`;

// Estilos para el input de archivo
const FileInputLabel = styled.label`
  background-color: #444;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  margin-top: 10px;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #666;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const ImageUploadComponent = ({event}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [imagenes, setImagenes] = useState([]);
  const timeoutRef = useRef(null);
  const isFirstRender = useRef(true);

  // Maneja el cambio de archivo cuando se selecciona una imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file)); // Genera una URL temporal para la vista previa
    }
  };
  const planoinsertarbasededatos = async ()=>{
    try {
        const currentDateTime = new Date(); // Obtiene la fecha y hora actual
        const timezoneOffset = currentDateTime.getTimezoneOffset() * 60000; // Convierte la diferencia a milisegundos
        const localDateTime = new Date(currentDateTime.getTime() - timezoneOffset); // Ajusta la hora a la zona horaria local
      
        // Formatear la fecha y hora en el formato deseado
        const formattedDateTime = localDateTime.toISOString().replace('T', ' ').split('.')[0];
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('fecha',formattedDateTime);
        formData.append('id_evento',event.id_eventos);

        const response = await planoinsertarimagenes(formData);
      await imgmostrar();
    } catch (error) {
        console.log(error);
    }
  }

  // Simulación de un envío de archivo
  const handleUpload = () => {
    if (!selectedImage) {
      alert('Por favor, selecciona una imagen primero.');
      return;
    }
    planoinsertarbasededatos();
    setUploadedImageUrl(selectedImage);
    setSelectedImage(null);
    setPreviewUrl(null);
    alert('Imagen subida con éxito');
    // Aquí puedes manejar el envío de la imagen a tu servidor
  };

  const imgmostrar = async () => {
    try {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(async () => {
        const response = await planomostrarporid_evento(event.id_eventos);
        setImagenes(response.data);
      }, 500); // Espera 500ms antes de hacer la petición
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
    }
  };
useEffect(() => {
    // Evita la primera ejecución si es necesario
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (!event.id_eventos) return; // No ejecutar si no hay ID
    }

    imgmostrar();

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [event.id_eventos]);

  return (
    <UploadContainer>
      <h2>Sube una imagen</h2>
      <FileInputLabel>
        Selecciona una imagen
        <HiddenFileInput type="file" accept="image/*" onChange={handleImageChange} />
      </FileInputLabel>
      {previewUrl && <PreviewImage src={previewUrl} alt="Vista previa" />}
      <UploadButton onClick={handleUpload}>Subir Imagen</UploadButton>
      <UploadedImageContainer>
        {imagenes.map((imagen) => (
          <UploadedImage key={imagen.id_plano} src={imagen.img} alt={imagen.nombre} />
        ))}
      </UploadedImageContainer>
    </UploadContainer>
  );
};

export default ImageUploadComponent;
