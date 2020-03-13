import React, { Fragment, useState, useEffect } from "react";
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import Clima from "./components/Clima";
import Error from "./components/Error";


function App() {
  const [busqueda, setBusqueda] = useState({
    pais: "",
    ciudad: ""
  });

  const { ciudad, pais } = busqueda;

  const [consultar, setConsultar] = useState(false);

  const [resultado, setResultado] = useState({});

  const [error, setError] = useState(false);

  useEffect(() => {
    if (consultar) {
      const consultarAPI = async () => {
        const key = "43ee53c439b997243a49dbf3dc1c80da";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${key}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        setConsultar(false);
        setError(resultado.cod === "404");
      };
      consultarAPI();
    }
    //Con esta linea ignoramos variables que usamos y que no tenemos que monitorear
    // eslint-disable-next-line
  }, [consultar/*, ciudad, pais*/]);

  let component = error ? <Error mensaje="ciudad no encontrada"/> 
    : <Clima resultado={resultado} />;

  return (
    <Fragment>
      <Header titulo="Clima React" />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
            </div>
            <div className="col m6 s12">{component}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
