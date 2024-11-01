import React from 'react';
import styled from 'styled-components';
import { posicionesinsertar } from '../../../api/Taskposiciones';
import { useConciertoStore, usedatamapa, useImageStore, usemovimiento, useselectgloabal } from '../../../useUserStore';

// Contenedor de los botones
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

// Estilo de los botones
const Button = styled.button`
  background-color: #3498db;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #2980b9;
  }

  &:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
  }
`;

const ObjectControlPanel = ({ infoposicion, objects, setObjects  }) => {
  const { datamapaconfigurar } = usedatamapa(); // Llama a usedatamapa aquí
  const { isDraggable, toggleDraggable } = usemovimiento();
  const selectedObjectId = useselectgloabal((state) => state.selectedObjectId);
  const addImage = useImageStore((state) => state.addImage);
  const {conciertoId} =useConciertoStore();
  // Función para guardar objetos
  const insertarObjetos = async () => {
    // Define uniqueObjects como un nuevo conjunto vacío
    const uniqueObjects = new Set();
  
    const updatedObjects = await Promise.all(
      datamapaconfigurar.map(async (object) => {
        const objectId = object.id || `temp-${Math.random().toString(36).substr(2, 9)}`; // Genera un id temporal si es null
  
        // Verifica si el id ya existe en uniqueObjects antes de añadir
        if (!uniqueObjects.has(objectId)) {
          uniqueObjects.add(objectId); // Añade el id al Set para futuras comprobaciones
  
          const infoimgbasededatos = {
            id: isNaN(object.id) || object.id.toString().startsWith('temp') ? null : object.id,
            x: object.x,
            y: object.y,
            width: object.width,
            height: object.height,
            url: object.url,
            _id_: conciertoId
          };
          try {
            // Hacer la solicitud al backend para insertar/actualizar el objeto
            const response = await posicionesinsertar(infoimgbasededatos);
            if (response && response.id) {
              setObjects((prevObjects) =>
                prevObjects.map((obj) =>
                  obj.id === object.id ? { ...obj, id: response.id } : obj
                )
              );
            }
          } catch (error) {
            //console.error('Error al insertar/actualizar el objeto:', error);
          } finally {
            window.location.reload();
          }
        }
      })
    );
  };
  const handleDuplicate = ()=>{
    const selectedObject = datamapaconfigurar.find((obj) => obj.id === selectedObjectId);
    const newObject = {
      ...selectedObject,
      id: `temp-${Math.random().toString(36).substr(2, 9)}`, // ID único
      x: selectedObject.x -390, // Ajuste de posición
      y: selectedObject.y,
    };
    addImage(newObject);
  }

  return (
    <ButtonContainer>
      <Button onClick={handleDuplicate} disabled={selectedObjectId === null}>Duplicar Objeto</Button>
      <Button disabled={selectedObjectId === null}>Eliminar Objeto</Button>
      <Button onClick={toggleDraggable}>
      {isDraggable ? 'Desactivar Movimiento' : 'Activar Movimiento'}
    </Button>
      <Button onClick={insertarObjetos}>Guardar Objetos</Button>
    </ButtonContainer>
  );
};

export default ObjectControlPanel;
