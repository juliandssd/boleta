import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { eventopublicarpublicidadprincipal } from '../../../api/TaskEvento';

const CarouselContainer = styled.div`
  width: 100vw;
  height: 450px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 70px;
  background: #1a1a1d;
`;

const CarouselWrapper = styled.div`
  display: flex;
  height: 100%;
  width: ${props => props.$itemCount * 100}%;
  transform: translateX(calc(-${props => props.$currentIndex * 100}% + ${props => props.$dragAmount}px));
  transition: ${props => props.$isDragging ? 'none' : 'transform 0.8s ease'};
`;

const CarouselItem = styled.div`
  display: flex;
  min-width: 100%;
  height: 90%;
  gap: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;

  @media (max-width: 768px) {
    justify-content: center;
    padding: 0 10px;
  }
`;

const ImageSection = styled.div`
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 20px;
  background: #262626;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.6), 
              -10px -10px 20px rgba(255, 255, 255, 0.05);
  position: relative;

  @media (max-width: 768px) {
    width: 95%;
    height: 95%;
    border-radius: 30px;
    background: rgba(38, 38, 38, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
  border-radius: 15px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    border-radius: 25px;
    object-fit: cover;
  }
`;

const ContentSection = styled.div`
  width: 40%;
  background: #1f1f2e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px;
  box-sizing: border-box;
  border-radius: 15px;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.6),
              -10px -10px 20px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);

  @media (max-width: 768px) {
    display: none;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%);
  display: none;
  flex-direction: column;
  align-items: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  @media (max-width: 768px) {
    display: flex;
    background: linear-gradient(to top, 
      rgba(0,0,0,0.9) 0%,
      rgba(0,0,0,0.8) 30%,
      rgba(0,0,0,0) 100%
    );
    backdrop-filter: blur(4px);
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    padding: 30px 20px;
  }
`;

const EventTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: #ffffff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.6rem;
    font-weight: 800;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    margin-bottom: 8px;
  }
`;

const EventDate = styled.p`
  font-size: 1rem;
  color: #ff4d4d;
  font-weight: bold;
  margin-bottom: 15px;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 0.9rem;
    letter-spacing: 1px;
    color: #ff6b6b;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    margin-bottom: 20px;
  }
`;

const EventDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
  line-height: 1.5;
  color: #dcdcdc;
`;

const BuyButton = styled.button`
  background: linear-gradient(135deg, #ff4d4d, #ff7676);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 15px rgba(255, 77, 77, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #ff7676, #ff4d4d);
    box-shadow: 0px 6px 20px rgba(255, 77, 77, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    background: linear-gradient(135deg, #ff6b6b, #ff4d4d);
    padding: 14px 28px;
    font-size: 1.1rem;
    border-radius: 30px;
    letter-spacing: 0.5px;
    box-shadow: 0px 4px 20px rgba(255, 77, 77, 0.4);
    
    &:active {
      transform: scale(0.95);
      box-shadow: 0px 2px 10px rgba(255, 77, 77, 0.3);
    }
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;

  @media (max-width: 768px) {
    bottom: 25px;
    gap: 10px;
  }
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${props => props.$isActive ? '#ff4d4d' : 'rgba(255, 255, 255, 0.5)'};
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    background: ${props => props.$isActive ? '#ff4d4d' : 'rgba(255, 255, 255, 0.8)'};
  }

  @media (max-width: 768px) {
    width: 8px;
    height: 8px;
    background: ${props => props.$isActive ? '#ff6b6b' : 'rgba(255, 255, 255, 0.3)'};
    transform: ${props => props.$isActive ? 'scale(1.2)' : 'scale(1)'};
    box-shadow: ${props => props.$isActive ? '0 0 10px rgba(255, 107, 107, 0.5)' : 'none'};
  }
`;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [dragState, setDragState] = useState({
    isDragging: false,
    startPos: 0,
    dragAmount: 0
  });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchImages = async () => {
      try {
        const response = await eventopublicarpublicidadprincipal();
        if (mounted) {
          setImages(response.data.map((item) => ({
            img: item.img,
            title: item.nombre,
            date: "SAB 09 NOV",
            description: `Noche de humor con los mejores humoristas y comediantes del país, quienes estarán en ${item.ciudad}.`
          })));
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();

    return () => {
      mounted = false;
      setImages([]);
      setCurrentIndex(0);
    };
  }, []);

  useEffect(() => {
    if (isInteracting || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isInteracting, images.length]);

  const handleDragStart = useCallback((position) => {
    setDragState(prev => ({
      ...prev,
      isDragging: true,
      startPos: position
    }));
    setIsInteracting(true);
  }, []);

  const handleDragMove = useCallback((position) => {
    if (!dragState.isDragging) return;
    
    setDragState(prev => ({
      ...prev,
      dragAmount: position - prev.startPos
    }));
  }, [dragState.isDragging]);

  const handleDragEnd = useCallback(() => {
    const threshold = 50;
    
    if (Math.abs(dragState.dragAmount) > threshold) {
      const newIndex = dragState.dragAmount > 0
        ? (currentIndex === 0 ? images.length - 1 : currentIndex - 1)
        : (currentIndex === images.length - 1 ? 0 : currentIndex + 1);
      setCurrentIndex(newIndex);
    }

    setDragState({
      isDragging: false,
      startPos: 0,
      dragAmount: 0
    });
    setIsInteracting(false);
  }, [currentIndex, dragState.dragAmount, images.length]);

  const eventHandlers = {
    onMouseDown: (e) => handleDragStart(e.clientX),
    onMouseMove: (e) => handleDragMove(e.clientX),
    onMouseUp: handleDragEnd,
    onMouseLeave: () => {
      if (dragState.isDragging) handleDragEnd();
    },
    onTouchStart: (e) => handleDragStart(e.touches[0].clientX),
    onTouchMove: (e) => handleDragMove(e.touches[0].clientX),
    onTouchEnd: handleDragEnd
  };

  return (
    <CarouselContainer {...eventHandlers}>
      <CarouselWrapper
        $itemCount={images.length}
        $currentIndex={currentIndex}
        $isDragging={dragState.isDragging}
        $dragAmount={dragState.dragAmount}
      >
        {images.map((item, index) => (
          <CarouselItem key={index}>
            <ImageSection>
              <CarouselImage src={item.img} alt={`Event ${index + 1}`} />
              <ImageOverlay>
                <EventTitle>{item.title}</EventTitle>
                <EventDate>{item.date}</EventDate>
                <BuyButton>Reservar Ahora</BuyButton>
              </ImageOverlay>
            </ImageSection>
            <ContentSection>
              <EventTitle>{item.title}</EventTitle>
              <EventDate>{item.date}</EventDate>
              <EventDescription>{item.description}</EventDescription>
              <BuyButton>Reservar Ahora</BuyButton>
            </ContentSection>
          </CarouselItem>
        ))}
      </CarouselWrapper>
      <DotsContainer>
        {images.map((_, index) => (
          <Dot
            key={index}
            $isActive={currentIndex === index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </DotsContainer>
    </CarouselContainer>
  );
};

export default Carousel;