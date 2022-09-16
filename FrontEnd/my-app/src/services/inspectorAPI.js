import endpoints from "./index";
import Cookie from "js-cookie";
import Axios from "axios";
import dateFormat from "dateformat";

function getCookie() {
  let KEYS = {
    tokenKey: Cookie.get("token"),
    docIdProject: Cookie.get("cdPr"),
  };
  return KEYS;
}

const listarZonas = async () => {
  var KEY = getCookie();
  let body = { docIdproject: KEY.docIdProject, idToken: KEY.tokenKey };

  const response = await Axios.post(endpoints.inspector.listZone, body);
  let zonasArray = [];
  response.data.map((item) => {
    zonasArray.push({
      codeZone: item.id,
      nameZone: item.nameZone,
      camp1: item.typeZone,
      camp2: item.noLamps,
    });
  });
  return zonasArray;
};
const eliminarZona = async (id) => {
  var KEY = getCookie();
  let body = {
    idToken: KEY.tokenKey,
    docIdproject: KEY.docIdProject,
    docIdZone: id,
  };
  const response = await Axios.post(endpoints.inspector.deleteZone, body);

  return response;
};
const agregarZona = async (nmZn, noLamps, typeZone) => {
  var KEY = getCookie();
  let zone = {
    nameZone: nmZn,
    noLamps: noLamps,
    typeZone: typeZone,
  };

  let body = {
    idToken: KEY.tokenKey,
    docIdproject: KEY.docIdProject,
    zone,
  };
  const response = await Axios.post(endpoints.inspector.newZone, body);
  return response;
};
const editarZona = async (cdZn, nmZn, noLamps, typeZone) => {
  var KEY = getCookie();
  let zone = {
    nameZone: nmZn,
    noLamps: noLamps,
    typeZone: typeZone,
  };

  let body = {
    idToken: KEY.tokenKey,
    docIdproject: KEY.docIdProject,
    docIdZone: cdZn,
    zone,
  };
  const response = await Axios.post(endpoints.inspector.updateZone, body);
  return response;
};
const listarMedidas = async (cdZn) => {
  var KEY = getCookie();
  const body = {
    docIdproject: KEY.docIdProject,
    idToken: KEY.tokenKey,
    docIdZone: cdZn,
  };

  const response = await Axios.post(endpoints.inspector.listMeasure, body);
  let medidasArray = [];
  response.data.map((item) => {
    const date = new Date(
      item.timeStamp._seconds * 1000 + item.timeStamp._nanoseconds / 1000000
    );
    medidasArray.push({
      num: item.num,
      value: item.value,
      timeMeasure: dateFormat(date, "dd/mm/yyyy HH:MM:ss"),
      id: item.id,
    });
  });
  return medidasArray;
};
const eliminarMedida = async (id, cdZn) => {
  var KEY = getCookie();
  let body = {
    idToken: KEY.tokenKey,
    docIdproject: KEY.docIdProject,
    idMeasure: id,
    docIdZone: cdZn,
  };
  const response = await Axios.post(endpoints.inspector.deleteMeasure, body);
  return response.data;
};
const agregarMedida = async (cdZn, valorMedida, index) => {
  var KEY = getCookie();
  let body = {
    docIdproject: KEY.docIdProject,
    idToken: KEY.tokenKey,
    docIdZone: cdZn,
    measure: {
      num: index,
      value: valorMedida,
      timeStamp: {
        _seconds: Date.now() / 1000,
        _nanoseconds: Date.now() % 1000,
      },
    },
  };
  const response = await Axios.post(endpoints.inspector.newZoneMeasure, body);
  return response.data;
};
const editarMedida = async (cdZn, idMeasure, valorMedida) => {
  var KEY = getCookie();
  let body = {
    docIdproject: KEY.docIdProject,
    idToken: KEY.tokenKey,
    docIdZone: cdZn,
    idMeasure: idMeasure,
    measure: {
      value: valorMedida,
      timeStamp: {
        _seconds: Date.now() / 1000,
        _nanoseconds: Date.now() % 1000,
      },
    },
  };
  const response = await Axios.post(endpoints.inspector.updateMeasure, body);
  return response.data;
};
const listarProyectos = async () => {
  var KEY = getCookie();
  let body = {
    idToken: KEY.tokenKey,
    uid: Cookie.get("uid"),
  };
  const response = await Axios.post(endpoints.inspector.listProject, body);
  let proyectosArray = [];
  response.data.map((item) => {
    proyectosArray.push({
      codeProject: item.id,
      nameProject: item.nameProject,
    });
  });
  return proyectosArray;
};
export {
  listarZonas,
  eliminarZona,
  eliminarMedida,
  agregarZona,
  editarZona,
  listarMedidas,
  agregarMedida,
  editarMedida,
  listarProyectos,
};
