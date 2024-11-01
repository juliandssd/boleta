import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { categoydemapamostrarporid } from '../../../api/Taskmapa';
import { useImageStore } from '../../../useUserStore';

const PanelContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  padding: 0;
  margin: 0;
  height: 20vh;
  box-sizing: border-box;
  overflow-x: auto;
`;

const ImageItem = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.4s ease-in-out;
  &:hover {
    transform: scale(1.2);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

const SVGPanel = () => {
  const [svgUrls, setSvgUrls] = useState([]);
  const addImage = useImageStore((state) => state.addImage);

  useEffect(() => {
    const fetchSvgUrls = async () => {
      const response = await categoydemapamostrarporid(2);
      setSvgUrls(response.data);
    };
    fetchSvgUrls();
  }, []);

  const handleDoubleClick = (url) => {
    getSvgDimensions(url, (width, height) => {
      console.log(`Dimensions of SVG: width=${width}, height=${height}`); // Verifica las dimensiones en consola

      const x = 50; // Coordenada inicial x
      const y = 50; // Coordenada inicial y
      const newObject = { 
        url, 
        x, 
        y, 
        width, // Usa el ancho original
        height, // Usa la altura original
        id: `temp-${Math.random().toString(36).substr(2, 9)}` 
      };
      addImage(newObject); // Agrega la imagen con dimensiones originales al store global
    });
  };

  const getSvgDimensions = (url, callback) => {
    const img = new Image();
    img.onload = () => {
      const width = img.naturalWidth; // Ancho original
      const height = img.naturalHeight; // Altura original
      callback(width, height); // Pasa las dimensiones al callback
    };
    img.src = url; // Carga la imagen
  };
  
  return (
    <PanelContainer>
      {svgUrls.map((item, index) => (
        <ImageItem
          key={index}
          src={item.url}
          onDoubleClick={() => handleDoubleClick(item.url)}
        />
      ))}
    </PanelContainer>
  );
};

export default SVGPanel;
