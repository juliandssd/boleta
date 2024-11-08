import React, { useEffect, useState ,useRef } from 'react';
import { Stage, Layer, Text, Image as KonvaImage, Transformer } from 'react-konva';
import PanZoom from 'react-easy-panzoom';
import styled from 'styled-components';
import { posicionesmostrar } from '../../../api/Taskposiciones';

import { useColorCordenada, useConciertoStore, usedatamapa, useImageStore, usemovimiento, useselectgloabal, useSelectGlobal, useVisibilityStore } from '../../../useUserStore';

import Fpalcos from './Datosdepalco';
import Tooltip from './CartelAnuncioTooltip';
const Container = styled.div`
  width: 47.5%; /* Cambiar de 50vw a 100% para que ocupe solo el espacio disponible */
  height: 80vh;
  background-color: #2b2b2b;
  background-image: 
    linear-gradient(to right, rgba(0, 255, 255, 0.8) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 255, 255, 0.8) 1px, transparent 1px);
  background-size: 10px 10px; /* Tamaño de los cuadros */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
  position: relative;
  padding: 0;
  margin: 0;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #2c3e50;
  padding: 20px;
  border-radius: 8px;
  max-width: ${(props) => props.maxWidth || '300px'};
  width: 100%;
  max-height: ${(props) => props.maxHeight || '200px'};
  overflow: hidden;
  position: relative;
  z-index: 1000;
`;

// Hook para cargar todas las imágenes
const useImages = (items) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        items.map((item) => {
          return new Promise((resolve) => {
            const img = new window.Image();
            img.src = item.url;
            img.onload = () => resolve({ id: item.id, image: img });
          });
        })
      );
      setImages(loadedImages);
    };
    loadImages();
  }, [items]);

  return images;
};

const SeatMapConfiguration = ({objects}) => {

  const [isFpalco,setisFpalco]=useState(false);
  const { 
    setSelectedObjectId
  } = useSelectGlobal();
  const imagesglobal = useImageStore((state) => state.images);
  const [linkimagen,setlinkimagen]=useState('');
  const {setdatamapaconfigurar}=usedatamapa();
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 ,id:0});
  const [isMobile, setIsMobile] = useState(false);
  const [id_posicionespalco,setid_posicionespalco]=useState(0);
  const [imagesData, setImagesData] = useState([]);
  const {conciertoId}=useConciertoStore();
  const [isResizing, setIsResizing] = useState(false);
  const hiddenCategories = useVisibilityStore((state) => state.hiddenCategories);
  const isDraggable = usemovimiento((state) => state.isDraggable);
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const transformerRef = useRef(null);
  const { setCoordinates } = useColorCordenada();
  const imageRefs = useRef({});
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iPad|iPhone|iPod/i.test(userAgent));
  }, []);
  useEffect(() => {
    const fetchImagesData = async () => {
      try {
        const response = await posicionesmostrar(conciertoId);
        const data = response.data;// Verificar datos recibidos
        setImagesData(data);
        setdatamapaconfigurar(data); // Se asume que `data` es un array de objetos con {id, x, y, url, width, height}
      } catch (error) {
      }
    };
    fetchImagesData();
  }, []);

  const images = useImages(imagesData);


  useEffect(() => {
  
    setImagesData((prevData) => {
      const uniqueImages = imagesglobal
        .map((newImage) => ({
          ...newImage,
          x: newImage.x + 400, // Desplazamiento a la derecha
        }))
        .filter((newImage) => !prevData.some((img) => img.id === newImage.id)); // Evitar duplicados
  
      // Actualizar `datamapaconfigurar` con los nuevos elementos únicos
      setdatamapaconfigurar((prevConfig) => [...prevConfig, ...uniqueImages]);
  
      return [...prevData, ...uniqueImages];
    });
  }, [imagesglobal]);


  const handleDragEnd = (id, e) => {
    // Obtener el nodo que se está transformando
    const node = e.target;
  
    // Calcular las nuevas dimensiones y posiciones
    const updatedProps = {
      id: id,
      x: Math.round(node.x()),
      y: Math.round(node.y()),
      width: Math.round(node.width() * node.scaleX()), // Multiplicamos por el scaleX para obtener el tamaño real
      height: Math.round(node.height() * node.scaleY()), // Multiplicamos por el scaleY para obtener el tamaño real
      _id_: conciertoId,
      url: imagesData.find(img => img.id === id)?.url || '' // Asegurarnos que url esté definido
    };
    const newX = Math.round(node.x());
    const newY = Math.round(node.y());
    setCoordinates({
      x: newX.toString(),
      y: newY.toString()
    });
    // Resetear la escala
    node.scaleX(1);
    node.scaleY(1);
  
    // Actualizar el estado con las nuevas dimensiones para el objeto específico
    setImagesData((prevData) =>
      prevData.map(item =>
        item.id === id ? { ...item, ...updatedProps } : item
      )
    );
  
    // Actualizar el estado en `datamapaconfigurar` también
    setdatamapaconfigurar((prevPositions) =>
      (prevPositions || []).map(item =>
        item.id === id ? { ...item, ...updatedProps } : item
      )
    );
  };
      const handledabrir=(id,link)=>{
        if (isDraggable==false) {
          setid_posicionespalco(id);
          setlinkimagen(link);
          setisFpalco(true);
        }
     
      }
      const handledclosed=()=>{
          setisFpalco(false);
     
      }
      const handleMouseOver = (e, data) => {
        const { clientX: x, clientY: y } = e.evt;
        setTooltipPos({ x, y, id: data.id });
        setTooltipData(data);
      };
    
      const handleMouseOut = () => {
        setTooltipData(null); // Ocultar tooltip cuando el mouse sale
        setTooltipPos({ x: 0, y: 0, id: null });
      };
      const handleMouseMove = (e) => {
        const { clientX: x, clientY: y } = e.evt;
        setTooltipPos((prev) => ({ ...prev, x, y })); // Actualizar posición con cada movimiento
      };

      const handleImageClick = (id) => {
        setSelectedShapeId(id);
        setSelectedObjectId(id);
        const selectedNode = imageRefs.current[id]; // Obtén el nodo seleccionado
      
        if (isDraggable && selectedNode) {
          transformerRef.current.nodes([selectedNode]); // Aplica el transformer al nodo seleccionado
          transformerRef.current.getLayer().batchDraw(); // Redibuja la capa
        }    
      };
    

      const handleStageClick = (e) => {
        
        // Desmarcar si el clic fue en el Stage vacío
        if (e.target === e.target.getStage()) {
          setSelectedShapeId(null); // Deselecciona la imagen
          if (transformerRef.current) {
            transformerRef.current.detach(); // Desvincula el Transformer
            transformerRef.current.getLayer().batchDraw(); // Redibuja la capa
          }

        }
      };
  return (
    <Container>
      {isMobile ? (
        <PanZoom
          minZoom={0.5}
          maxZoom={2} // Limitar el zoom máximo en móviles
          enableTouch
          enableZoom
          zoomSpeed={0.3} // Aumentar velocidad de zoom en móviles
          autoCenter
          disableScroll
        >
          <Stage
            width={window.innerWidth}
            height={window.innerHeight}
            draggable={isDraggable} 
            scaleX={0.5} // Reducir escala para que se ajuste mejor en móviles
            scaleY={0.5}
            onClick={handleStageClick}
            pixelRatio={2} // Mejorar resolución en dispositivos móviles
          >
            <Layer>
            {images
              .filter((item) => {
                const itemData = imagesData.find((data) => data.id === item.id);
                // Si la categoría está en hiddenCategories y su valor es true, no se mostrará
                const isVisible = !hiddenCategories[itemData?.categoria];
                console.log(`Image ID: ${item.id}, Category: ${itemData?.categoria}, isVisible: ${isVisible}`);
                return isVisible;
              }).map((item) => (

                <KonvaImage
  key={item.id}
  x={imagesData.find(data => data.id === item.id)?.x || 0}
  y={imagesData.find(data => data.id === item.id)?.y || 0}
  width={(imagesData.find(data => data.id === item.id)?.width || 100) * 1.5}
  height={(imagesData.find(data => data.id === item.id)?.height || 100) * 1.5}
  image={item.image}
  onClick={(e) => handleImageClick(item.id, e)}
  draggable={isDraggable} 
  onMouseOver={(e) => handleMouseOver(e, { id: item.id, info: 'Información del objeto' })}
  onMouseMove={handleMouseMove} // Actualizar posición en cada movimiento
  onMouseOut={handleMouseOut}
  onDblClick={() => handledabrir(item.id,item.image)}
  onDragEnd={(e) => handleDragEnd(item.id, e)}
/>

              ))}
            </Layer>
          </Stage>
        </PanZoom>
      ) : (
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          draggable={isDraggable} 
          pixelRatio={1} // Configuración estándar para escritorio
          onWheel={(e) => {
            e.evt.preventDefault();
            const scaleBy = 1.05;
            const stage = e.target.getStage();
            const oldScale = stage.scaleX();
            const pointer = stage.getPointerPosition();

            const newScale = e.evt.deltaY > 0 ? oldScale / scaleBy : oldScale * scaleBy;
            stage.scale({ x: newScale, y: newScale });

            const mousePointTo = {
              x: (pointer.x - stage.x()) / oldScale,
              y: (pointer.y - stage.y()) / oldScale,
            };
            const newPos = {
              x: pointer.x - mousePointTo.x * newScale,
              y: pointer.y - mousePointTo.y * newScale,
            };

            stage.position(newPos);
            stage.batchDraw();
          }}
        >
          <Layer>
          {images
              .filter((item) => {
                const itemData = imagesData.find((data) => data.id === item.id);
                // Si la categoría está en hiddenCategories y su valor es 
                const isVisible = itemData?.categoria === "VACIO" || !hiddenCategories[itemData?.categoria];
                return isVisible;
              }).map((item) => (
                <React.Fragment key={item.id}>
                <KonvaImage
                ref={(node) => {
                  imageRefs.current[item.id] = node; // Vincula el nodo con su referencia
                }}
                  x={imagesData.find((data) => data.id === item.id)?.x || 0}
                  y={imagesData.find((data) => data.id === item.id)?.y || 0}
                  width={imagesData.find((data) => data.id === item.id)?.width || 100}
                  height={imagesData.find((data) => data.id === item.id)?.height || 100}
                  image={item.image}
                  onClick={() => handleImageClick(item.id)}
                  draggable={isDraggable}
                  onTransformEnd={(e) => handleDragEnd(item.id, e)}
                  onDblClick={() => handledabrir(item.id,item.image)}
                  onDragEnd={(e) => handleDragEnd(item.id, e)}
                />
              </React.Fragment>
            ))}
          <Transformer ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => ({
              ...newBox,
              width: Math.max(10, newBox.width),
              height: Math.max(10, newBox.height)
            })}
          />
          </Layer>
        </Stage>
      )}
      {isFpalco && (
        <ModalOverlay>
          <ModalContent style={{ maxHeight: '500px', maxWidth: '700px' }}>
            <Fpalcos onClose={handledclosed} id_posicionespalco={id_posicionespalco} link={linkimagen}  />
          </ModalContent>
        </ModalOverlay>
      )}

      {tooltipData && (
  <Tooltip x={tooltipPos.x} y={tooltipPos.y} data={tooltipData} id_posidata={tooltipPos.id}/>
)}
    </Container>
  );
};

export default SeatMapConfiguration;
