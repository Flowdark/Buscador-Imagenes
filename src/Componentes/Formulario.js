import React, { useState } from 'react';
import Error from "./Error";

const Formulario = ({ guardarBusqueda }) => {

    const [ termino, guardarTermino ] = useState("");
    const [ error, guardarError ] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();

        //Validar

        if( termino.trim() === "" ){
            guardarError(true);
            return;
        }

        //Eliminar Error Previo
        guardarError(false);

        //Enviar a la App

        guardarBusqueda(termino);

    }

    return ( 
        <form
            onSubmit={buscarImagenes}
        >
            <div className="row">
                <div className="form-grup col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imágen, ejemplo: Tecnología"
                        onChange={ e => { guardarTermino(e.target.value) } }
                    />
                </div>
                <div className="form-grup col-md-4">
                    <input 
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar Imágenes"
                    />
                </div>
            </div>

            {error ? <Error mensaje = "EL CAMPO DE BUSQUEDA ES OBLIGATORIO" /> : null}

        </form>
     );
}
 
export default Formulario;