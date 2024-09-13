import styled from "styled-components";
import Titulo from "../Titulo";
import Populares from "./Populares";
import Tag from "./Tags";
import Imagen from "./Imagen";
import Cargando from "../Cargando";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const GaleriaContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const SeccionFluida = styled.section`
  flex-grow: 1;
`;
const ImagenesContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px;
`;

const Galeria = () => {

  //const {fotosDeGaleria, consulta, alAlternarFavorito, setFotoSeleccionada} = useContext(GlobalContext);
  //alSeleccionarFoto={foto => setFotoSeleccionada()}
  const {state} = useContext(GlobalContext)
  return (
    state.fotosDeGaleria.length == 0 ?
    <Cargando/> :
    <>
      <Tag />
      <GaleriaContainer>
        <SeccionFluida>
          <Titulo>Navegue por la galería</Titulo>
          <ImagenesContainer>
            {state.fotosDeGaleria
              .filter((foto) => {
                return (
                  state.consulta == "" ||
                  foto.titulo
                    .toLocaleLowerCase()
                    .normalize("NFD")
                    .replace(/\p{Diacritic}/gu, "")
                    .includes(
                      state.consulta
                        .toLocaleLowerCase()
                        .normalize("NFD")
                        .replace(/\p{Diacritic}/gu, "")
                    )
                ); //si no hay nada en consulta muestra todo, si se escribe algo se compara el titulo con lo escrito.
                //Toda la parte del normalize es para que no importen los acentos en la busqueda
              })
              .map((foto) => (
                <Imagen

                  //alAlternarFavorito={alAlternarFavorito}
                  //alSolicitarZoom={foto => setFotoSeleccionada(foto)}
                  key={foto.id}
                  foto={foto}
                />
              ))}
          </ImagenesContainer>
        </SeccionFluida>
        <Populares />
      </GaleriaContainer>
    </>
  );
};

export default Galeria;
