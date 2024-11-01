import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useColorStore } from '../../../useUserStore';

const ColorPickerWithModernUI = () => {
  const [selectedColor, setSelectedColor] = useState(null);
  const [isPicking, setIsPicking] = useState(false);
  const [error, setError] = useState(null);
  const { setColor } = useColorStore();
  const {colorseleccionado}=useColorStore();
  const handlePickColor = async () => {
    if (!window.EyeDropper) {
      setError('La API de EyeDropper no es compatible con este navegador.');
      return;
    }

    setIsPicking(true);
    setError(null);

    const eyeDropper = new window.EyeDropper();
    try {
      const result = await eyeDropper.open();
      setSelectedColor(result.sRGBHex);
      setColor(result.sRGBHex); // Guardar en el store global
    } catch (err) {
      setError('No se seleccionó ningún color o hubo un error.');
    } finally {
      setIsPicking(false);
    }
  };

  return (
    <Container>
      <PickButton onClick={handlePickColor} disabled={isPicking}>
        {isPicking ? 'Seleccionando color...' : 'Activar cuentagotas'}
      </PickButton>

      {colorseleccionado && <ColorPreview color={colorseleccionado} />}

      {selectedColor && (
        <Modal>
          <h3>Color Seleccionado</h3>
          <ColorPreviewLarge color={selectedColor} />
          <ColorCode>{selectedColor}</ColorCode>
          <CloseButton onClick={() => setSelectedColor(null)}>Cerrar</CloseButton>
        </Modal>
      )}

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
};

// Animación de aparición del modal
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -30%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -20%);
  }
`;

// Styled Components

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const PickButton = styled.button`
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  background-color: #6200ea;
  color: #fff;
  border: none;
  border-radius: 50px;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: scale(1.05);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ColorPreview = styled.div`
  margin-top: 10px;  /* Espacio entre el botón y el círculo de color */
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 2px solid #ccc;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
`;

const Modal = styled.div`
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: ${fadeIn} 0.3s ease-in-out;
  z-index: 1000;
`;

const ColorPreviewLarge = styled(ColorPreview)`
  width: 100px;
  height: 100px;
  margin: 10px auto;
`;

const ColorCode = styled.p`
  font-size: 18px;
  color: #333;
`;

const CloseButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  margin-top: 10px;
  background-color: #6200ea;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
`;

export default ColorPickerWithModernUI;
