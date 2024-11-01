export const createCartAnimation = (event) => {
    // Remover cualquier toast existente primero
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => toast.remove());

    // Crear el cartel de confirmación
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #4CAF50;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(120%);
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 12px;
    `;

    // Agregar icono de check
    const checkIcon = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="white"/>
        </svg>
    `;

    // Contenido del toast
    toast.innerHTML = `
        ${checkIcon}
        <div>
            <div style="font-weight: bold;">¡Agregado al carrito!</div>
            <div style="font-size: 14px; opacity: 0.9;">El palco se ha añadido correctamente
            
            </div>
            <div style="font-size: 14px; opacity: 0.9;">
            Recuerda que tiene 15 minutos para realizar tu pago
            </div>
        </div>
    `;

    // Crear botón de cierre
    const closeButton = document.createElement('button');
    closeButton.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        font-size: 18px;
        line-height: 1;
    `;
    closeButton.textContent = '×';
    closeButton.onclick = () => {
        toast.style.transform = 'translateX(120%)';
        setTimeout(() => toast.remove(), 100);
    };
    toast.appendChild(closeButton);

    // Añadir al documento
    document.body.appendChild(toast);

    // Animar entrada
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });

    // Efecto en el botón
    const button = event.currentTarget;
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }

    // Remover automáticamente después de 3 segundos
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
};