import React, { useEffect, useState ,useRef } from 'react';
import { Stage, Layer, Text, Image as KonvaImage } from 'react-konva';
import PanZoom from 'react-easy-panzoom';
import styled from 'styled-components';
import { posicionesmostrar, posicionesmostrarporcliente } from '../../../api/Taskposiciones';
import { useConciertoStore, usedatamapa, useImageStore, usemovimiento, useSelectedIdStore, useselectgloabal, useVisibilityStore } from '../../../useUserStore';

const Container = styled.div`
  width: 50%;
  height: 80vh;
  background-color: #2b2b2b;
  background-size: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  touch-action: none; /* Previene el scroll */
  padding: 0;
  margin: 0;

  /* Prevenir comportamientos táctiles por defecto */
  & * {
    touch-action: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
  }

  /* Asegurar que el canvas se ajuste correctamente */
  canvas {
    display: block;
    touch-action: none;
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 40vh;
  }
`;

const PanZoomContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  &.interacting {
    touch-action: none;
  }

  &:not(.interacting) {
    touch-action: auto;
  }
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

const SeatMap = ({objects}) => {

  const {setdatamapaconfigurar}=usedatamapa();
  const [isMobile, setIsMobile] = useState(false);
  const [imagesData, setImagesData] = useState([]);
  const {conciertoId}=useConciertoStore();
  const selectedId = useSelectedIdStore((state) => state.selectedId);
  const setSelectedId = useSelectedIdStore((state) => state.setSelectedId);
  const hiddenCategories = useVisibilityStore((state) => state.hiddenCategories);
  const isDraggable = usemovimiento((state) => state.isDraggable);
  const [toggleState, setToggleState] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const layerRef = useRef(null);
  const [isInteracting, setIsInteracting] = useState(false);
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/android|iPad|iPhone|iPod/i.test(userAgent));
  }, []);
  useEffect(() => {
    const fetchImagesData = async () => {
      try {
        const response = await posicionesmostrarporcliente(conciertoId);
        const data = response.data;// Verificar datos recibidos
        console.log(data);
        setImagesData(data);
        setdatamapaconfigurar(data); // Se asume que `data` es un array de objetos con {id, x, y, url, width, height}
      } catch (error) {
      }
    };
    fetchImagesData();
  }, []);

  const images = useImages(imagesData);


  const handleMouseEnter = (e) => {
    // Cambia el cursor a mano solo cuando el puntero está sobre el objeto específico
    e.target.getStage().container().style.cursor = 'pointer';
  };

  const handleMouseLeave = (e) => {
    // Restablece el cursor a predeterminado cuando el puntero sale del objeto específico
    e.target.getStage().container().style.cursor = 'default';
  };
  const getSelectedStyle = (id) => ({
  });

  const toggleImageUrl = (id) => {
    setImagesData((prevData) =>
      prevData.map((item) => {
        const isSelected = item.id === id;
        const shouldUseUrlDos = isSelected && selectedImageId !== id;
        const updatedImage = new window.Image();
        updatedImage.src = shouldUseUrlDos ? item.urlDos : item.url;

        updatedImage.onload = () => {
          setImagesData((updatedImages) =>
            updatedImages.map((imgItem) =>
              imgItem.id === item.id ? { ...imgItem, image: updatedImage } : imgItem
            )
          );
          if (layerRef.current) {
            layerRef.current.batchDraw();
          }
        };

        return {
          ...item,
          image: updatedImage,
          url: shouldUseUrlDos ? item.urlDos : item.url,
        };
      })
    );

    setSelectedImageId(selectedImageId === id ? null : id);
  };


  const handleImageDoubleClick = (id, categoria) => {
    if (categoria !== 'VACIO') {

      if (selectedImageId != id) {
        setSelectedId(id);
        toggleImageUrl(id);
      }
    }
  };

  const handlePanStart = () => {
    setIsInteracting(true);
  };

  const handlePanEnd = () => {
    setIsInteracting(false);
  };


  return (
    <Container>
     {isMobile ? (
     <PanZoomContainer className={isInteracting ? 'interacting' : ''}>
       <PanZoom
            minZoom={0.5}
            maxZoom={1}
            enableTouch
            enableZoom
            defaultZoom={5} 
            zoomSpeed={0.15} // Reducido de 0.3 a 0.15 para un zoom más suave
            zoomInSteps={100} // Más pasos para un zoom más granular
            zoomOutSteps={100}
            autoCenter
            onPanStart={handlePanStart}
            onPanEnd={handlePanEnd}
            onZoomStart={handlePanStart}
            onZoomEnd={handlePanEnd}
            style={{ width: '100%', height: '100%' }}
            transformStyle="preserve-3d" // Mejora el rendimiento de las transformaciones
            enableTransition // Habilita transiciones suaves
            pinchEnabled={true} // Asegura que el pinch zoom esté habilitado
            pinchZoomSpeed={0.15} // Velocidad del pinch zoom
            smoothScaling // Habilita el escalado suave
            centerZoomedOut
            bounces={false}
          >
            <Stage
              width={1000}
              height={1000}
              x={-100}
              y={200}
              draggable={isDraggable}
              scaleX={1}
              scaleY={1}
              pixelRatio={2}
            >
              <Layer>
                {images
                  .filter((item) => {
                    const itemData = imagesData.find((data) => data.id === item.id);
                    const isVisible = !hiddenCategories[itemData?.categoria];
                    return isVisible;
                  })
                  .map((item) => {
                    const itemData = imagesData.find((data) => data.id === item.id);
                    const isSelected = item.id === selectedImageId;
                    return (
                      <KonvaImage
                        key={item.id}
                        x={itemData?.x || 0}
                        y={itemData?.y || 0}
                        width={itemData?.width || 100}
                        height={itemData?.height || 100}
                        image={item.image}
                        onDblTap={() => handleImageDoubleClick(item.id, itemData?.categoria)}
                        onMouseEnter={handleMouseEnter}
                        opacity={isSelected ? 0.300 : 1}
                        onMouseLeave={handleMouseLeave}
                        {...getSelectedStyle(item.id)}
                      />
                    );
                  })}
              </Layer>
            </Stage>
          </PanZoom>
        </PanZoomContainer>
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
          <Layer ref={layerRef}>
          {images
              .filter((item) => {
                const itemData = imagesData.find((data) => data.id === item.id);
                // Si la categoría está en hiddenCategories y su valor es 
                const isVisible = itemData?.categoria === "VACIO" || !hiddenCategories[itemData?.categoria];
                return isVisible;
              }).map((item) => {
      const itemData = imagesData.find((data) => data.id === item.id); // Se asegura de que itemData esté definido antes de mapear
      const isSelected = item.id === selectedImageId;
      return (
        <KonvaImage
          key={item.id}
          x={itemData?.x || 0}
          y={itemData?.y || 0}
          width={itemData?.width || 100}
          height={itemData?.height || 100}
          image={item.image}
          onDblClick={() => handleImageDoubleClick(item.id, itemData?.categoria)}
          //onDblClick={() => handleImageDoubleClick(item.id, itemData.categoria)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          opacity={isSelected ? 0.300 : 1} 
          {...getSelectedStyle(item.id)}
        />
      );
    })}
          </Layer>
        </Stage>
      )}
     
    </Container>
  );
};

export default SeatMap;






