import React from "react";

const Cargando = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height:'980px',
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: "#7B78E5", fontSize: "4em" }}>Cargando...</h1>
      <img
        src="img/cargando.gif"
        alt="imagen cargando"
        style={{ width: "30vw" }}
      />
    </div>
  );
};

export default Cargando;
