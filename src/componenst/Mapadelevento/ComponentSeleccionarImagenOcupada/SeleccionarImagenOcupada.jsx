import React from 'react';

const SeleccionarImagenOcupada = () => {
  const handleImageSelect = () => {
    // Lógica para seleccionar una imagen ocupada
    console.log("Imagen ocupada seleccionada");
  };

  return (
    <div>
      <button onClick={handleImageSelect}>Seleccionar Imagen Ocupada</button>
    </div>
  );
};

export default SeleccionarImagenOcupada;
