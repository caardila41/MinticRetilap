import endpoints from "./index";
import Cookie from "js-cookie";
import Axios from "axios";

function getCookie() {
  let KEYS = {
    idToken: Cookie.get("token"),
    orgId: Cookie.get("orgId"),
  };
  return KEYS;
}

const obtenerNombre = async (uid) => {
  let body = {
    uid,
  };
  const response = await Axios.post(endpoints.aux.getName, body);
  return response.data;
};
const listarInspectores = async () => {
  var KEY = getCookie();
  let body = {
    idToken: KEY.idToken,
    orgId: KEY.orgId,
  };
  const response = await Axios.post(endpoints.aux.listInspector, body);
  let inspectorArray = [];
  response.data.map((item) => {
    inspectorArray.push({
      name: item.displayName,
      uid: item.uid,
    });
  });
  return inspectorArray;
};
const listarProyectos = async () => {
  var KEY = getCookie();
  let body = {
    idToken: KEY.idToken,
    orgId: KEY.orgId,
  };
  const response = await Axios.post(endpoints.aux.listProject, body);
  let inspectorArray = [];
  response.data.map((item) => {
    let nameInspector = obtenerNombre(item.idInspector).then((res) => {
      inspectorArray.push({
        id: item.id,
        name: item.nameProject,
        nameInspector: res,
        numZones: item.numZones,
        numLuminarias: item.numLuminarias,
        idCustomer: item.idCustomer,
        adress: item.adress,
        telefono: item.telefono,
        descripcion: item.descripcion,
      });
    });
  });
  return inspectorArray;
};
const crearProyecto = async (data) => {
  var KEY = getCookie();
  let project = {
    orgId: KEY.orgId,
    idInspector: data.idInspector,
    adress: data.direccion,
    nameProject: data.name,
    telefono: data.telefono,
    descripcion: data.descripcion,
    idCustomer: data.idCustomer,
    numZones: data.numZones,
    numLuminarias: data.numLuminarias,
    isActive: true,
  };

  let body = {
    idToken: KEY.idToken,
    project,
  };
  const response = await Axios.post(endpoints.aux.createProject, body);
  return response;
};
const borrarProyecto = async (id) => {
  var KEY = getCookie();
  let body = {
    idToken: KEY.idToken,
    docId: id,
  };

  const response = await Axios.post(endpoints.aux.deleteProject, body);
  return response;
};
const actualizarProyecto = async (data) => {
  var KEY = getCookie();
  let project = {
    orgId: KEY.orgId,
    idInspector: data.idInspector,
    adress: data.direccion,
    nameProject: data.name,
    telefono: data.telefono,
    descripcion: data.descripcion,
    idCustomer: data.idCustomer,
    numZones: data.numZones,
    numLuminarias: data.numLuminarias,
    isActive: true,
  };

  let body = {
    idToken: KEY.idToken,
    project,
    docId: data.idProject,
  };
  const response = await Axios.post(endpoints.aux.updateProject, body);
  return response;
};
const listarClientes = async () => {
  var KEY = getCookie();
  let body = {
    idToken: KEY.idToken,
    orgId: KEY.orgId,
  };
  const response = await Axios.post(endpoints.aux.listCustomer, body);
  let inspectorArray = [];
  response.data.map((item) => {
    inspectorArray.push({
      id: item.id,
      nameOwner: item.legalRepresentative,
      nameCustomer: item.nameCompany,
      type: item.companyType,
      nit: item.nit,
    });
  });
  return inspectorArray;
};
const crearCliente = async (data) => {
  var KEY = getCookie();
  let customer = {
    orgId: KEY.orgId,
    legalRepresentative: data.nameOwner,
    nameCompany: data.nameCustomer,
    companyType: data.typeEnterpise,
    nit: data.nit,
  };

  let body = {
    idToken: KEY.idToken,
    customer,
  };
  const response = await Axios.post(endpoints.aux.addCustomer, body);
  return response;
};
const borrarCliente = async (id) => {
  var KEY = getCookie();
  let body = {
    idToken: KEY.idToken,
    docId: id,
  };

  const response = await Axios.post(endpoints.aux.deleteCustomer, body);
  return response;
};
const actualizarCliente = async (data) => {
  var KEY = getCookie();
  let customer = {
    orgId: KEY.orgId,
    legalRepresentative: data.nameOwner,
    nameCompany: data.nameCustomer,
    companyType: data.typeEnterpise,
    nit: data.nit,
  };

  let body = {
    idToken: KEY.idToken,
    customer,
    docId: data.idCustomer,
  };
  const response = await Axios.post(endpoints.aux.updateCustomer, body);
  return response;
};

export {
  listarInspectores,
  crearProyecto,
  listarProyectos,
  borrarProyecto,
  actualizarProyecto,
  listarClientes,
  crearCliente,
  borrarCliente,
  actualizarCliente,
};
