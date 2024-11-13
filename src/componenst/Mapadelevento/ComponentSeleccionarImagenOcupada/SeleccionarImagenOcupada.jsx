import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { palcocategoriaconfigurarocupada } from '../../../api/Taskpalco';
import { useConciertoStore } from '../../../useUserStore';
import { posicionocupadainsertarApi } from '../../../api/Taskposiciones';

// Styled Components
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  width: 80%;
  max-width: 900px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: rgba(106, 27, 154, 0.8);
`;

const HeaderCell = styled.th`
  padding: 16px;
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
  color: #ffffff;
  letter-spacing: 1px;
`;

const TableRow = styled.tr`
  background-color: ${(props) => (props.isEven ? 'rgba(48, 63, 159, 0.2)' : 'rgba(63, 81, 181, 0.2)')};
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(94, 53, 177, 0.3);
    transform: scale(1.02);
  }
`;

const TableCell = styled.td`
  padding: 16px;
  font-size: 1rem;
  color: #f5f5f5;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  vertical-align: middle;
`;

const ColorCell = styled(TableCell)`
  width: 15%;
`;

const CategoryCell = styled(TableCell)`
  width: 55%;
`;

const ActionsCell = styled(TableCell)`
  width: 30%;
`;

const ColorBox = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color || '#ddd'};
  border-radius: 50%;
  margin: 0 auto;
`;

const UploadButton = styled.label`
  padding: 10px 20px;
  font-size: 1rem;
  color: #ffffff;
  background-color: ${props => props.disabled ? '#666666' : '#d32f2f'};
  border: none;
  border-radius: 25px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: 0px 4px 15px rgba(211, 47, 47, 0.4);
  display: inline-block;
  text-align: center;
  opacity: ${props => props.disabled ? '0.7' : '1'};

  &:hover {
    background-color: ${props => props.disabled ? '#666666' : '#b71c1c'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-3px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0px 6px 20px rgba(183, 28, 28, 0.6)'};
  }

  input[type="file"] {
    display: none;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin: 0 auto;

  &:hover {
    transform: scale(1.1);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .success-indicator {
    position: absolute;
    bottom: -10px;
    right: -10px;
    background-color: #4caf50;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .error-indicator {
    position: absolute;
    bottom: -10px;
    right: -10px;
    background-color: #f44336;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }

  .uploading-indicator {
    position: absolute;
    bottom: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
`;

const UploadAllButton = styled.button`
  padding: 12px 24px;
  font-size: 1.1rem;
  color: #ffffff;
  background-color: ${props => props.disabled ? '#666' : '#2196f3'};
  border: none;
  border-radius: 25px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0px 4px 15px rgba(33, 150, 243, 0.4);

  &:hover {
    background-color: ${props => props.disabled ? '#666' : '#1976d2'};
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    box-shadow: ${props => props.disabled ? 'none' : '0px 6px 20px rgba(25, 118, 210, 0.6)'};
  }
`;

const Spinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const ExistingImage = styled(ImagePreview)`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 4px;
  }
`;
const StatusMessage = styled.div`
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
  background-color: ${props => 
    props.type === 'error' ? 'rgba(211, 47, 47, 0.2)' : 
    props.type === 'success' ? 'rgba(76, 175, 80, 0.2)' : 
    'rgba(33, 150, 243, 0.2)'};
  color: #ffffff;
  font-size: 1rem;
  width: 80%;
  max-width: 600px;
  backdrop-filter: blur(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

// Componente Principal
const SeleccionarImagenOcupada = () => {
  const { conciertoId } = useConciertoStore();
  const [categories, setCategories] = useState([]);
  const [uploadedImages, setUploadedImages] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await palcocategoriaconfigurarocupada(conciertoId);
        console.log(response.data)
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [conciertoId]);

  const validateImage = (file) => {
    if (!file) return false;
    if (file.type !== "image/svg+xml") {
      alert("Por favor, sube solo imágenes SVG");
      return false;
    }
    return true;
  };

  const createFormData = (file, id_posi,color) => {
    const formData = new FormData();
    const timestamp = new Date().toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/:/g, '_');

    formData.append("file", file);
    formData.append("date", timestamp);
    formData.append("id_evento", conciertoId);
    formData.append("id_posi", id_posi);
    formData.append("color",color);

    return formData;
  };

  const handleImageUpload = async (event, id,setcolor) => {
    const file = event.target.files[0];
    if (!validateImage(file)) return;

    try {
      // Actualizar el preview
      const imageUrl = URL.createObjectURL(file);
      setUploadedImages(prev => ({ ...prev, [id]: imageUrl }));
      setUploadedFiles(prev => ({ ...prev, [id]: file,color: setcolor}));
      
      // Opcional: Subida inmediata individual
      const formData = createFormData(file, id,setcolor);
      setUploadProgress(prev => ({
        ...prev,
        [id]: 'uploading'
      }));      
      setUploadProgress(prev => ({
        ...prev,
        [id]: 'success'
      }));
      
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      setUploadProgress(prev => ({
        ...prev,
        [id]: 'error'
      }));
      alert("Error al subir la imagen");
    }
  };

  const uploadsvg = async (data) => {
    try {
      const response = await posicionocupadainsertarApi(data);
      return response.data;
    } catch (error) {
      console.error("Error en uploadsvg:", error);
      throw error;
    }
  };

  const uploadAllImages = async () => {
    if (Object.keys(uploadedFiles).length === 0) {
      alert('No hay imágenes seleccionadas para subir');
      return;
    }

    setIsUploading(true);
    const errors = [];
    let successCount = 0;
    
    try {
      // Procesar todas las imágenes en paralelo
      const uploadPromises = categories.map(async (item) => {
        const file = uploadedFiles[item.id_posi];
        if (!file) return null;

        try {
          const formData = createFormData(file, item.id_posi,item.color);
          
          setUploadProgress(prev => ({
            ...prev,
            [item.id_posi]: 'uploading'
          }));
console.log(formData);
          await uploadsvg(formData);
          
          setUploadProgress(prev => ({
            ...prev,
            [item.id_posi]: 'success'
          }));
          
          successCount++;
          return { success: true, categoria: item.categoria };
        } catch (error) {
          setUploadProgress(prev => ({
            ...prev,
            [item.id_posi]: 'error'
          }));
          
          return {
            success: false,
            categoria: item.categoria,
            error: error.message
          };
        }
      });

      const results = await Promise.all(uploadPromises);
      
      // Filtrar y procesar errores
      const uploadErrors = results.filter(result => result && !result.success);
      if (uploadErrors.length > 0) {
        const errorMessage = uploadErrors
          .map(({categoria, error}) => `Error en ${categoria}: ${error}`)
          .join('\n');
        alert(`Se subieron ${successCount} imágenes con éxito.\n\nErrores encontrados:\n${errorMessage}`);
      } else {
        alert(`Se subieron ${successCount} imágenes exitosamente`);
      }
    } catch (error) {
      console.error('Error general:', error);
      alert('Error al procesar las imágenes');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <TableContainer>
    <StyledTable>
      <TableHeader>
        <tr>
          <HeaderCell>Color</HeaderCell>
          <HeaderCell>Categoría</HeaderCell>
          <HeaderCell>Acciones</HeaderCell>
        </tr>
      </TableHeader>
      <tbody>
        {categories.map((item, index) => (
          <TableRow key={index} isEven={index % 2 === 0}>
            <ColorCell>
              <ColorBox color={item.color} />
            </ColorCell>
            <CategoryCell>{item.categoria}</CategoryCell>
            <ActionsCell>
              {item.url === 'vacio' ? (
                // Si la URL es 'vacio', mostrar el botón de subida o preview de la imagen subida
                uploadedImages[item.id_posi] ? (
                  <ImagePreview onClick={() => document.getElementById(`file-input-${item.id_posi}`).click()}>
                    <img src={uploadedImages[item.id_posi]} alt="Uploaded preview" />
                    <input
                      type="file"
                      id={`file-input-${item.id_posi}`}
                      accept="image/svg+xml"
                      onChange={(event) => handleImageUpload(event, item.id_posi, item.color)}
                      style={{ display: 'none' }}
                    />
                    {uploadProgress[item.id_posi] === 'uploading' && (
                      <Spinner className="uploading-indicator" />
                    )}
                    {uploadProgress[item.id_posi] === 'success' && (
                      <span className="success-indicator">✓</span>
                    )}
                    {uploadProgress[item.id_posi] === 'error' && (
                      <span className="error-indicator">✗</span>
                    )}
                  </ImagePreview>
                ) : (
                  <UploadButton disabled={isUploading}>
                    Subir Imagen
                    <input
                      type="file"
                      accept="image/svg+xml"
                      onChange={(event) => handleImageUpload(event, item.id_posi, item.color)}
                      disabled={isUploading}
                    />
                  </UploadButton>
                )
              ) : (
                // Si la URL no es 'vacio', mostrar la imagen existente
                <ExistingImage>
                  <img src={item.url} alt={`${item.categoria}`} />
                </ExistingImage>
              )}
            </ActionsCell>
          </TableRow>
        ))}
      </tbody>
    </StyledTable>
    <ButtonContainer>
      <UploadAllButton 
        onClick={uploadAllImages} 
        disabled={isUploading || Object.keys(uploadedFiles).length === 0}
      >
        {isUploading ? (
          <>
            <Spinner /> Subiendo...
          </>
        ) : (
          'Subir Todas las Imágenes'
        )}
      </UploadAllButton>
    </ButtonContainer>
    {Object.keys(uploadProgress).length > 0 && (
      <StatusMessage type={
        Object.values(uploadProgress).includes('error') ? 'error' : 
        Object.values(uploadProgress).includes('uploading') ? 'info' : 
        'success'
      }>
        {`${Object.values(uploadProgress).filter(status => status === 'success').length} de ${Object.keys(uploadProgress).length} imágenes procesadas`}
      </StatusMessage>
    )}
  </TableContainer>

    );
  };
  
  export default SeleccionarImagenOcupada;