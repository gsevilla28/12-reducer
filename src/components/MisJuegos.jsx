import React, { useReducer } from "react";
import { JuegoReducer } from "../reducers/JuegoReducer";
import { useEffect } from "react";

const init = () => {
  return JSON.parse(localStorage.getItem("juegos")) || [];
};

export const MisJuegos = () => {
  // 1 al reducer se la pasa como parametro el obejto reducer creadoo con las acciones que puede realizar
  // 2 un array vacio para inicializar datos
  // 3 una funcion que se va a ejecutar de forma async para obtener los datos por default y tiene prioridad sobre el array vacio
  // en este caso es de local storage pero podria ser una API
  //los datos que va a contener el reducer en un principio, seran que lo que trae de la funcion init que a su vez consulta localstorage
  const [juegos, dispatch] = useReducer(JuegoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("juegos", JSON.stringify(juegos));
  }, [juegos]);

  const conseguirDatosForm = (e) => {
    e.preventDefault();

    let juego = {
      id: new Date().getTime(),
      titulo: e.target.titulo.value,
      descripcion: e.target.descripcion.value,
    };

    // console.log(juego);
    const action = {
      type: "crear",
      payload: juego,
    };

    dispatch(action);
    console.log(juegos);
  };
  const borrar = (id) => {
    const action = {
      type: "borrar",
      payload: id,
    };

    dispatch(action);
  };

  const editar = (e, id) => {
    let juego = {
      id,
      titulo: e.target.value,
      descripcion: e.target.value,
    };

    const action = {
      type: "editar",
      payload: juego,
    };
    dispatch(action);
  };

  return (
    <div>
      <h1>Estos son mis video juegos</h1>
      <p>Numero de video juegos: {juegos.length}</p>
      <ul>
        {juegos.length < 1 ? (
          <h2>No hay informacion para mostrar</h2>
        ) : (
          juegos.map((item) => {
            return (
              <li key={item.id}>
                {item.titulo} &nbsp;{" "}
                <button onClick={() => borrar(item.id)}>X</button>
                &nbsp;{" "}
                <input
                  type="text"
                  onBlur={(e) => editar(e, item.id)}
                  onKeyPress={(e) => {
                    //ejecutar la accion especificamente cuando se le da enter
                    if (e.key === "Enter") editar(e, item.id);
                  }}
                />
              </li>
            );
          })
        )}
      </ul>
      <h3>Agregar Juego</h3>
      <form onSubmit={conseguirDatosForm}>
        <input type="text" name="titulo" placeholder="Titulo" />
        <textarea name="descripcion" id="" placeholder="descripcion"></textarea>
        <input type="submit" value="Guardar" />
      </form>
    </div>
  );
};
