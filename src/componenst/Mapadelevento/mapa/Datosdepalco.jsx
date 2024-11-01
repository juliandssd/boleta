import React, { useState,useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {palcoinsertar,PalcoMostrarAeditarPorIdPosiciones,palcoeditarbasededatos, palcomostrartablaCategory} from '../../../api/Taskpalco';
import { useColorStore, useConciertoStore, useDataStorePalco, useVisibilityStore } from '../../../useUserStore';


// Estilos para el contenedor del menú desplegable

// Estilos para la etiqueta
const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
  display: block;
`;
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 1s linear infinite;
  margin: 20px auto;
`;
const DropdownContainer = styled.div`
  width: 680px;
  margin: 0 auto;
  padding: 20px;
  background-color: #2c3e50;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  flex: 1;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  padding-top: 20px;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #3498db;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #2980b9;
  }
`;

// Los demás estilos se mantienen igual (Label, Input, Select, etc.)


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


// Estilos para los inputs
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #34495e;
  color: white;
  box-sizing: border-box;

  /* Elimina las flechas del input number */
  -moz-appearance: textfield;
  -webkit-appearance: none;
  appearance: none;
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #34495e;
  color: white;
  box-sizing: border-box;
`;



const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
`;
const colorChange = keyframes`
  0% { transform: scale(0.8); opacity: 0.6; }
  50% { transform: scale(1.2); opacity: 0.9; }
  100% { transform: scale(1); opacity: 1; }
`;

const ColorPreviewWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1px;
  margin-bottom: 5px;
`;

const ColorPreview = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${colorChange} 0.5s ease-in-out;
`;

// Componente principal
const ReservationForm = ({ onClose,onInsert,id_posicionespalco }) => {
  const [personCount, setPersonCount] = useState(1);
  const [planSepare, setPlanSepare] = useState('no');
  const [montoPlanSepare, setMontoPlanSepare] = useState(0);
  const [precio, setPrecio] = useState(''); // Nuevo campo de precio
  const [categoria, setCategoria] = useState(''); // Campo para la categoría
  const [nombre, setNombre] = useState(''); // Nuevo campo de nombre
  const [otraCategoria, setOtraCategoria] = useState(''); // Campo para ingresar una nueva categoría
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [datacategory,setdatacategory]=useState([]);
  const [xxpersonas,setxxpersona]=useState(1);

  const {colorseleccionado}=useColorStore();
  const {conciertoId}=useConciertoStore();
  const { addData } = useDataStorePalco();

  // Manejador para cambiar el valor de Plan Separe
  const handlePlanSepareChange = (e) => {
    setPlanSepare(e.target.value);
    if (e.target.value === 'no') {
      setMontoPlanSepare(''); // Resetea el monto si se selecciona "No"
    }
  };

  // Manejador para el cambio en la categoría
  const handleCategoriaChange = (e) => {
    const selectedCategory = e.target.value;
    setCategoria(selectedCategory);
    if (selectedCategory !== 'otra') {
      setOtraCategoria(''); // Resetea el campo si no se selecciona "Otra"
    }
  };

  // Validación de los campos
  const validarCampos = () => {
    if (!nombre || !categoria || !personCount || !precio) {
      setErrorMessage('Por favor, completa todos los campos obligatorios.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  // Manejador para el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Remover los puntos y convertir los valores a números
    const numericPrice = parseFloat(String(precio).replace(/\./g, ''));
    const numericMontoPlanSepare = parseFloat(String(montoPlanSepare).replace(/\./g, ''));
  
    // Validar que el monto del Plan Separe no sea mayor ni igual que el precio
    if (planSepare === 'si' && (numericMontoPlanSepare >= numericPrice)) {
      setErrorMessage('El monto del Plan Separe no puede ser mayor o igual que el precio.');
      return; // Evitar el envío del formulario si no se cumple la validación
    }
  
    // Validar que se haya seleccionado una categoría válida
    if (!categoria && !otraCategoria) {
      setErrorMessage('Por favor, selecciona una categoría o ingresa una nueva categoría.');
      return;
    }
  
    // Validar que se haya ingresado un nombre si se seleccionó "Otra" como categoría
    if (categoria === 'otra' && !otraCategoria) {
      setErrorMessage('Por favor, ingrese el nombre de la nueva categoría.');
      return;
    }
  
    // Validar que la cantidad de personas sea mayor que 0
    if (personCount <= 0) {
      setErrorMessage('La cantidad de personas debe ser mayor a 0.');
      return;
    }
    if (xxpersonas <= 0) {
      setErrorMessage('La cantidad de personas debe ser mayor a 0.');
      return;
    }
  
    // Validar que el nombre no esté vacío
    if (!nombre.trim()) {
      setErrorMessage('Por favor, ingrese su nombre.');
      return;
    }
    
  
    const formData = {
      nombre, // Incluimos el nombre en los datos del formulario
      personCount,
      planSepare,
      montoPlanSepare: planSepare === 'si' ? numericMontoPlanSepare : null,
      precio: numericPrice, // Enviar el precio convertido a número
      categoria: categoria === 'otra' ? otraCategoria : categoria, // Usa "otraCategoria" si seleccionó "Otra"
    };
  
    palconinsertarConladata();
  
    setErrorMessage(''); // Resetear el mensaje de error si la validación pasa
  };
  
  
  const handlePriceminimoChange = (e) => {
    const formattedPrice = formatPrice(e.target.value);
    setMontoPlanSepare(formattedPrice);  // Guardar el precio con formato
  };

  const formatPrice = (value) => {
    // Elimina cualquier cosa que no sea número
    const numericValue = value.replace(/\D/g, '');
    // Formatea el número con puntos
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  
  const handlePriceChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatPrice(rawValue);
    setPrecio(formattedValue);  // Actualiza el valor con el formato
  };
  const handlexxpersona= (e) => {
    const rawValue = e.target.value;
    setxxpersona(rawValue);  // Actualiza el valor con el formato
  };
  // Función para insertar el palco
  const palconinsertarConladata = async () => {
    try {
      setIsSubmitting(true);
      const precioSinPuntos = parseFloat(String(precio).replace(/\./g, ''));
      const montoPlanSepareSinPuntos = parseFloat(String(montoPlanSepare).replace(/\./g, ''));
      const info = {
        id_posiciones: id_posicionespalco,
        id_evento: conciertoId,
        id_usuario: 1,
        categoria: categoria === 'otra' ? otraCategoria : categoria,
        cantidad: personCount, // Aquí cambiamos "cantidad" por "personCount"
        estadopalco: 'disponible', // Puedes modificar este valor según tu lógica // Inicialmente 0 o según tu lógica
        plansepare: planSepare,
        minimo: planSepare === 'si' ? montoPlanSepareSinPuntos : 0,
        nombre,
        precio:precioSinPuntos,
        color:colorseleccionado,
        Xpersona:xxpersonas

      };
  
      if (isEditing) {
        // Si es edición, llamar a la función para editar
        await palcoeditar(info);
      } else {
        // Si es creación, llamar a la función para insertar
        await palcoinsertar(info);
      }    
 
      onClose();
      // Aquí puedes hacer la solicitud al backend para insertar
    } catch (error) {
      console.error('Error al insertar:', error);
    }finally {
      setIsSubmitting(false); // Finalizar el estado de envío
      window.location.reload();
    }
  };

  const palcoeditar = async (data)=>{
    try {
      const response = await palcoeditarbasededatos(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (id_posicionespalco) {
      const MostrarInfopalco = async () => {
        try {
          const response = await PalcoMostrarAeditarPorIdPosiciones(id_posicionespalco);
          const data = response.data;
          if (data) {
            setNombre(data.nombre || "");  // Asegurarse de que data tenga valores o asignar por defecto
            setPersonCount(data.cantidad || 0);
            setPlanSepare(data.plansepare || "no");
            setMontoPlanSepare(data.minimo || "");
            setPrecio(data.precio || "");
            setCategoria(data.categoria || "");
            setxxpersona(data.Xpersona || "");
            setIsEditing(true);
          }
        } catch (error) {
          console.log(error);
        }finally{
          setIsLoading(false);
        }
      };
  
      MostrarInfopalco(); // Llamada a la función dentro del useEffect
    }else{
      setIsLoading(false);
    }
  }, [id_posicionespalco]);

useEffect(()=>{
const info = async()=>{
 try {
  const response= await palcomostrartablaCategory(conciertoId);
  setdatacategory(response.data);
 } catch (error) {
  
 }
}
info();
},[])

  return (
    <DropdownContainer>
    <CloseButton onClick={onClose} type="button">X</CloseButton>
    {isLoading ? (
      <Spinner />
    ) : (
      <form onSubmit={handleSubmit}>
        <FormGrid>
          {/* Columna izquierda */}
          <FormColumn>
            <Label>Nombre</Label>
            <Input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingrese su nombre"
            />

            <Label>Cantidad de Personas</Label>
            <Input
              type="number"
              value={personCount}
              onChange={(e) => setPersonCount(e.target.value)}
              placeholder="Ingrese la cantidad de personas"
            />

            <Label>Precio</Label>
            <Input
              type="text"
              value={precio}
              onChange={handlePriceChange}
              placeholder="Ingrese el precio"
            />
          </FormColumn>

          {/* Columna derecha */}
          <FormColumn>
            <Label>¿Desea permitir Plan Separe?</Label>
            <Select value={planSepare} onChange={handlePlanSepareChange}>
              <option value="no">No</option>
              <option value="si">Sí</option>
            </Select>

            {planSepare === 'si' && (
              <>
                <Label>Monto del Plan Separe</Label>
                <Input
                  type="text"
                  value={montoPlanSepare}
                  onChange={handlePriceminimoChange}
                  placeholder="Ingrese el monto del Plan Separe"
                />
              </>
            )}

            <Label>Categoría</Label>
            <Select value={categoria} onChange={handleCategoriaChange}>
  {/* Opción para agregar una nueva categoría */}
  <option value="otra">Otra</option>
  
  {/* Opción por defecto */}
  <option value="">Seleccione una categoría</option>
  
  {/* Mapear las categorías que vienen de la API */}
  {datacategory.map((cat, index) => (
    <option key={index} value={cat.categoria}>
      {cat.categoria}
    </option>
  ))}
</Select>

            {categoria === 'otra' && (
              <>
                <Label>Ingrese la nueva categoría</Label>
                <Input
                  type="text"
                  value={otraCategoria}
                  onChange={(e) => setOtraCategoria(e.target.value)}
                  placeholder="Nueva categoría"
                />
              </>
            )}
               <Label>Cantidad de X</Label>
            <Input
              type="number"
              value={xxpersonas}
              onChange={handlexxpersona}
              placeholder="Cantidad"
            />
          </FormColumn>
        </FormGrid>

        <ColorPreviewWrapper>
          <ColorPreview color={colorseleccionado} />
        </ColorPreviewWrapper>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <ButtonContainer>
          <Button type="submit">
            {isSubmitting ? 'Enviando...' : isEditing ? 'Guardar Como' : 'Enviar'}
          </Button>
        </ButtonContainer>
      </form>
    )}
  </DropdownContainer>
  );
};

export default ReservationForm;
