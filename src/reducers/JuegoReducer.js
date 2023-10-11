export const JuegoReducer = (state = [], action) => {
  //el dispatch siempre lleva dos parametros, el action a realizar y el payload que son los datos
  switch (action.type) {
    case "crear":
      return [...state, action.payload]; //copia de los datos que ya tiene el state y se le agregan los datos que vienen en el payload
    case "borrar":
      return state.filter((item) => item.id !== action.payload);
    case "editar":
      let index = state.findIndex((item) => item.id === action.payload.id);
      state[index] = action.payload;

      return [...state];

    default:
      return state;
  }
};
