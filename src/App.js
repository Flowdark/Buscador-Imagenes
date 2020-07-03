import React, { useState, useEffect } from 'react';
import Formulario from "./Componentes/Formulario";
import ListadoImagenes from "./Componentes/ListadoImagenes";

function App() {

  const [ busqueda, guardarBusqueda ] = useState("");
  const [ imagenes, guardarImagenes ] = useState([]);
  const [ paginaactual, guardarPaginaActual ] = useState(1);
  const [ totalpaginas, guardarTotalPaginas ] = useState(1);

  useEffect( () => {
    if(busqueda === "") return;

    const consultarAPI = async () => {

      const imagenesPorPagina = 30;
      const key = "17323911-6ec5ed82f7ff14a552321a2b9";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      //Calcular paginas

      const calcularTotalPaginas = Math.ceil( resultado.totalHits / imagenesPorPagina );
      guardarTotalPaginas(calcularTotalPaginas);

      //Regresar
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView( { behavior: "smooth" } );

    }

    consultarAPI();

  }, [busqueda, paginaactual] )

  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;

    if( nuevaPaginaActual === 0 ) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;

    if( nuevaPaginaActual > totalpaginas ) return;

    guardarPaginaActual(nuevaPaginaActual);
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>

        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />

      { (paginaactual === 1) ? null : ( <button
                                          type="button"
                                          className="btn btn-info mr-1 my-4"
                                          onClick={paginaAnterior}
                                        >
                                          Anterior &laquo;
                                        </button> 
      ) }

      { (paginaactual === totalpaginas) ? null : ( <button
                                                    type="button"
                                                    className="btn btn-info my-4"
                                                    onClick={paginaSiguiente}
                                                  >
                                                    Siguiente &raquo;
                                                  </button>
       ) }

      </div>
    </div>
  );
}

export default App;
