export const createBlockedAnimation = (event, remainingMinutes) => {
    // Remove any existing toasts first
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => toast.remove());

    // Create confirmation toast
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #DC3545;
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

    // Add timer icon
    const timerIcon = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm1-13h-2v6l5.25 3.15.75-1.23-4-2.42V7z" fill="white"/>
        </svg>
    `;

    // Toast content
    toast.innerHTML = `
        ${timerIcon}
        <div>
            <div style="font-weight: bold;">Palco Temporalmente Bloqueado</div>
           <div style="font-size: 14px; opacity: 0.9;">
                Tiempo restante: <span id="countdown-display">${(remainingMinutes)}</span>
            </div>
            <div style="font-size: 14px; opacity: 0.9;">Por favor, vuelva a intentar más tarde</div>
        </div>
    `;

    // Create close button
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

    // Add to document
    document.body.appendChild(toast);

    // Animate entry
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
    });

    // Button effect
    const button = event.currentTarget;
    if (button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 200);
    }

    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (document.body.contains(toast)) {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => toast.remove(), 300);
        }
    }, 3000);
};