import { createContext, useEffect, useReducer, useState } from "react";

export const GlobalContext = createContext(); //Se crea el contexto para compartir

const initialState = {
  consulta: "",
  fotosDeGaleria: [],
  fotoSeleccionada: null,
  modalAbierto: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONSULTA":
      return { ...state, consulta: action.payload };
    case "SET_FOTOS_DE_GALERIA":
      return { ...state, fotosDeGaleria: action.payload };
    case "SET_FOTO_SELECCIONADA":
      return { ...state, 
        fotoSeleccionada: action.payload, 
        modalAbierto: action.payload != null ? true : false
      };
    case "ALTERNAR_FAVORITO":
      const fotosDeGaleria = state.fotosDeGaleria.map((fotoDeGaleria) => {
        return {
          ...fotoDeGaleria,
          favorita:
            fotoDeGaleria.id === action.payload.id
              ? !action.payload.favorita
              : fotoDeGaleria.favorita,
        };
      })
      if (action.payload.id === state.fotoSeleccionada?.id) {
        return {
          ...state,
          fotosDeGaleria: fotosDeGaleria,
          fotoSeleccionada: {
            ...state.fotoSeleccionada,
            favorita: !state.fotoSeleccionada.favorita,
          }, //Esto es lo mismo que lo de abajo

          /* if (foto.id === fotoSeleccionada?.id) {
            setFotoSeleccionada({
              ...fotoSeleccionada,
              favorita: !fotoSeleccionada.favorita,
            });
          } */
        };
      } else {
        return {
          ...state,
          fotosDeGaleria: fotosDeGaleria,
        };
      }

    default:
      return state;
  }
};

//Se crea el proveedor del contexto, es decir, el que va a compartir los estados
const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const [consulta, setConsulta] = useState("");
  // const [fotosDeGaleria, setFotosDeGaleria] = useState([]);
  // const [fotoSeleccionada, setFotoSeleccionada] = useState(null);
  //const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("https://spaceapp-api.vercel.app/fotos");
        const data = await res.json();
        //setFotosDeGaleria([...data]);
        dispatch({ type: "SET_FOTOS_DE_GALERIA", payload: data });
        //setCargando(false);
        
      } catch (error) {
        console.error("Error obteniendo fotos", error);
      }
    };

    setTimeout(() => getData(), 5000);
    //Tambien podría ser...
    /*const intervalId = setInterval(fetchFotos, 5000);
    getData();

    return () => clearInterval(intervalId);*/
  }, []);

  /* const globalState = {
    consulta,
    setConsulta,
    fotosDeGaleria,
    fotoSeleccionada,
    setFotoSeleccionada,
    alAlternarFavorito,
    //cargando,
  }; */

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
