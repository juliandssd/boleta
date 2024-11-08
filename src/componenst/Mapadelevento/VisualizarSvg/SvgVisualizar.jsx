import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { categoydemapamostrarporid } from '../../../api/Taskmapa';
import { useConciertoStore, useImageStore } from '../../../useUserStore';

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
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  user-select: none;
  height: 100%;
`;

const ImageWrapper = styled.div`
  height: 100%;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageItem = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
  cursor: pointer;
  transition: transform 0.4s ease-in-out;
  &:hover {
    transform: scale(1.2);
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

const SVGPanel = ({category}) => {
  const [svgUrls, setSvgUrls] = useState([]);
  const {conciertoId} = useConciertoStore();
  const addImage = useImageStore((state) => state.addImage);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const fetchSvgUrls = async () => {
      try {
        const response = await categoydemapamostrarporid(conciertoId, category);
        setSvgUrls(response.data);
      } catch (error) {
        console.error('Error fetching SVG URLs:', error);
      }
    };
    fetchSvgUrls();
  }, [category, conciertoId]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleDoubleClick = (url) => {
    getSvgDimensions(url, (width, height) => {
      const x = 50;
      const y = 50;
      const newObject = { 
        url, 
        x, 
        y, 
        width,
        height,
        id: `temp-${Math.random().toString(36).substr(2, 9)}` 
      };
      addImage(newObject);
    });
  };

  const getSvgDimensions = (url, callback) => {
    const img = new Image();
    img.onload = () => {
      callback(img.naturalWidth, img.naturalHeight);
    };
    img.src = url;
  };
  
  return (
    <PanelContainer
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <ImageContainer>
        {svgUrls.map((item, index) => (
          <ImageWrapper key={index}>
            <ImageItem
              src={item.url}
              onDoubleClick={() => handleDoubleClick(item.url)}
              draggable={false}
            />
          </ImageWrapper>
        ))}
      </ImageContainer>
    </PanelContainer>
  );
};

export default SVGPanel;