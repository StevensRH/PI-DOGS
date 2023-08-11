import {
    GET_DOGS,
    GET_DOG,
    GET_DOGNAME,
    CLEANDETAIL,
    CREATEDOG,
    ORDER_ALFABETIC,
    ORDER_WEIGHT,
    FILTER_BY_ORIGIN,
    RESET_FILTERS,
    FILTER_BY_TEMPERAMENT,
    GET_TEMPERAMENTS,
  } from "./Actions";
  
  const initialState = {
    dogs: [],
    allDogs: [],
    dog: null,
    dogName: null,
    temperamentFilter: null,
    temperaments: [],
    filteredByOrigin: [],
    originFilter: null,
  };
  
  const rootReducer = (state = initialState, action) => { // recibe estado actual y accion y devuelve un nuevo estado actualizado
    switch (action.type) {
      case GET_DOGS:
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };
      case GET_DOG:
        return {
          ...state,
          dog: action.payload,
        };
      case GET_TEMPERAMENTS:
        return {
          ...state,
          temperaments: action.payload,
        };
      case GET_DOGNAME:
        return {
          ...state,
          dogs: action.payload,
        };
      case CLEANDETAIL:
        return {
          ...state,
          dogName: null,
        };
      case CREATEDOG:
        return {
          ...state,
        };
  
      case ORDER_ALFABETIC:
        const sortedName = state.dogs.slice().sort((a, b) => {
          return action.payload === "A-Z"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        });
  
        return {
          ...state,
          dogs: sortedName,
        };
  
      case ORDER_WEIGHT:
        const sortedWeight = state.dogs.slice().sort((a, b) => { //realizo copia del estado y ordeno
          let weightA, weightB;
  
          if (a.createdInDb) {
            const [minA, maxA] = a.weight.split("-").map(Number);
            weightA = (minA + maxA) / 2;
          } else {
            const [minA, maxA] = a.weight.metric.split("-").map(Number);
            weightA = (minA + maxA) / 2;
          }
  
          if (b.createdInDb) {
            const [minB, maxB] = b.weight.split("-").map(Number);
            weightB = (minB + maxB) / 2;
          } else {
            const [minB, maxB] = b.weight.metric.split("-").map(Number);
            weightB = (minB + maxB) / 2;
          }
  
          return action.payload === "asc" ? weightA - weightB : weightB - weightA;
        });
  
        return {
          ...state,
          dogs: sortedWeight,
        };
  
  
      case FILTER_BY_ORIGIN:
        const selectedOrigin = action.payload;
          let filteredByOrigin = [];
            if (selectedOrigin === "DB") {
            filteredByOrigin = state.allDogs.filter((dog) => dog.createdInDb);
          } else if (selectedOrigin === "API") {
            filteredByOrigin = state.allDogs.filter((dog) => !dog.createdInDb);
          } else {
           filteredByOrigin = state.allDogs;
          }
  
    let filteredByTemperament = [];
      if (state.temperamentFilter) {
      filteredByTemperament = filteredByOrigin.filter(
        (dog) =>
          (dog.temperament && dog.temperament.includes(state.temperamentFilter)) ||
          (dog.temperaments &&
            dog.temperaments.some((temp) => temp.name === state.temperamentFilter))
      );
    } else {
      filteredByTemperament = filteredByOrigin;
    }
  
    return {
      ...state,
      dogs: filteredByTemperament,
      filteredByOrigin: filteredByOrigin,
      originFilter: selectedOrigin,
    };
  
    
    case FILTER_BY_TEMPERAMENT:
    const selectedTemperament = action.payload;
    if (selectedTemperament === "") { //filtre por origen y no por temperamento
      if (state.originFilter) {
        return {
          ...state,
          dogs: state.filteredByOrigin,
          temperamentFilter: null,
        };
      } else {
        return {
          ...state,
          dogs: state.allDogs,
          temperamentFilter: null,
        };
      }
    } else { // si no esta vacio la seleccion de temperamento seguimos
      let filteredByTemperament = [];
      if (state.originFilter) { //si se filtro primero por origen
        filteredByTemperament = state.filteredByOrigin.filter(
          (dog) =>
            (dog.temperament && dog.temperament.includes(selectedTemperament)) ||
            (dog.temperaments &&
              dog.temperaments.some((temp) => temp.name === selectedTemperament))
        );
      } else {
        filteredByTemperament = state.allDogs.filter( // si no se filtro por origen
          (dog) =>
            (dog.temperament && dog.temperament.includes(selectedTemperament)) ||
            (dog.temperaments &&
              dog.temperaments.some((temp) => temp.name === selectedTemperament))
        );
      }
      return {
        ...state,
        dogs: filteredByTemperament,
        temperamentFilter: selectedTemperament,
      };
    } 
  
      case RESET_FILTERS:
        return {
          ...state,
          dogs: state.allDogs,
          filteredByOrigin: [],
          originFilter: null,
          temperamentFilter: null,
        };
        
      default:
        return state;
    }
  };
  
  export default rootReducer;