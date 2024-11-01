import {create} from 'zustand';
import { detalletotalapagar } from './api/Taskdetalle';
import { persist } from 'zustand/middleware'
// Definir la tienda de Zustand
export const useUserStore = create((set) => ({
    userId: localStorage.getItem('userId') || null, // Recuperar el ID del localStorage al iniciar
    setUserId: (id) => {
      localStorage.setItem('userId', id); // Guardar el ID en localStorage
      set({ userId: id });
    },
    clearUserId: () => {
      localStorage.removeItem('userId'); // Eliminar el ID del localStorage en el logout
      set({ userId: null });
    },
  }));


  export const useEventStore = create((set) => ({
    eventId: localStorage.getItem('eventId') || null, // Recuperar el 'id_evento' del localStorage al iniciar
    setEventId: (id) => {
      localStorage.setItem('eventId', id); // Guardar el 'id_evento' en localStorage
      set({ eventId: id });
    },
    clearEventId: () => {
      localStorage.removeItem('eventId'); // Eliminar el 'id_evento' del localStorage en el logout
      set({ eventId: null });
    },
  }));



  export const useConciertoStore = create((set) => ({
    conciertoId: localStorage.getItem('conciertoId') || null, // Recuperar el 'conciertoId' del localStorage al iniciar
    setConciertoId: (id) => {
      localStorage.setItem('conciertoId', id); // Guardar el 'conciertoId' en localStorage
      set({ conciertoId: id });
    },
    clearConciertoId: () => {
      localStorage.removeItem('conciertoId'); // Eliminar el 'conciertoId' del localStorage
      set({ conciertoId: null });
    }
  }));

  export const useColorStore = create((set) => ({
    colorseleccionado: localStorage.getItem('colorseleccionado') || null, // Recuperar el color seleccionado del localStorage al iniciar
    setColor: (color) => {
      localStorage.setItem('colorseleccionado', color); // Guardar el color en localStorage
      set({ colorseleccionado: color });
    },
    clearColor: () => {
      localStorage.removeItem('colorseleccionado'); // Eliminar el color del localStorage
      set({ colorseleccionado: null });
    }
  }));
  

  export const useDataevento = create((set) => ({
    dataevento: (() => {
      const storedData = localStorage.getItem('dataevento');
      try {
        return storedData ? JSON.parse(storedData) : null;
      } catch (error) {
        console.error("Error parsing dataevento from localStorage:", error);
        localStorage.removeItem('dataevento'); // Remover si está corrupto
        return null;
      }
    })(),
    setdataevento: (event) => {
      const eventString = JSON.stringify(event); // Convertir el objeto a string para almacenarlo
      localStorage.setItem('dataevento', eventString);
      set({ dataevento: event });
    },
    clearEventId: () => {
      localStorage.removeItem('dataevento'); // Eliminar el 'dataevento' del localStorage en el logout
      set({ dataevento: null });
    },
  }));


  export const usedatamapa = create((set) => ({
    datamapaconfigurar: [],
    
    setdatamapaconfigurar: (newPositions) => {
      set((state) => ({
        datamapaconfigurar: typeof newPositions === "function" 
          ? newPositions(state.datamapaconfigurar) 
          : newPositions
      }));
    },
  
    clearDatamapaconfigurar: () => set({ datamapaconfigurar: [] }),
  }));


  export const usemovimiento = create(
    persist(
      (set) => ({
        isDraggable: true, // Estado inicial
        toggleDraggable: () => set((state) => ({ isDraggable: !state.isDraggable })),
      }),
      {
        name: 'movimiento-storage', // Nombre clave en localStorage
      }
    )
  );


  export const useImageStore = create((set) => ({
    images: [], // Lista de imágenes
    addImage: (newImage) => set((state) => ({
      images: [...state.images, newImage]
    })),
  }));


  export const useselectgloabal = create((set) => ({
    selectedObjectId: null,
    setSelectedObjectId: (id) => set({ selectedObjectId: id }),
  
    datamapaconfigurar: [],
    setDatamapaconfigurar: (data) => set({ datamapaconfigurar: data }),
  
    addObject: (object) =>
      set((state) => ({
        datamapaconfigurar: [...state.datamapaconfigurar, object],
      })),
  }));


  export const useVisibilityStore = create((set) => ({
    hiddenCategories: {
      vip: false,
      preferencia: false,
      otraCategoria: false,
      // Agrega otras categorías aquí...
    },
    toggleCategoryVisibility: (category) =>
      set((state) => ({
        hiddenCategories: {
          ...state.hiddenCategories,
          [category]: !state.hiddenCategories[category],
        },
      })),
  }));


  export const useDataStorePalco = create((set) => ({
    dataList: [],
    
    // Carga inicial de datos desde la API
    setInitialData: (initialData) => set(() => ({ dataList: initialData })),
    
    // Agregar nuevos datos al estado existente
    addData: (newData) => set((state) => ({ dataList: [...state.dataList, newData] })),
  }));


  export const useSelectedIdStore = create((set) => ({
    selectedId: null,
    setSelectedId: (id) => set({ selectedId: id }),
  }));


  export const useStoreEncryp = create((set) => ({
    encryptedId: localStorage.getItem('encryptedId') || '', // Cargar desde localStorage o valor vacío
    setEncryptedId: (id) => {
        localStorage.setItem('encryptedId', id); // Guardar en localStorage
        set({ encryptedId: id }); // Actualizar el estado en Zustand
    },
}));




export const useStore = create((set) => ({
  count: 0,
  setCount: (newCount) => set({ count: newCount }),
  fetchCount: async (encryptedId) => {
    try {
      const info = { id: encryptedId };
      const response = await detalletotalapagar(info);
      set({ count: response.data.count });
    } catch (error) {
      console.error('Error fetching count:', error);
    }
  },
}));


export const useidcreate = create((set) => ({
  idcreate: null, // Siempre inicia en null al cargar la página
  setidcreate: (id) => {
    set({ idcreate: id });
  },
  Clearidcreate: () => {
    set({ idcreate: null });
  }
}));