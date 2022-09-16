import Axios from "axios";
import Cookie from "js-cookie";
import endpoints from "./index";

const DASHBOARD_TYPE = {
  admin: "/admin",
  inspector: "/inspector",
  aux: "/auxAdmin",
};

const getLogAndType = async (pswd, email) => {
  let body = {
    password: pswd,
    email: email,
    returnSecureToken: true,
  };

  const responseToken = await Axios.post(endpoints.auth.login, body);

  Cookie.set("token", responseToken.data.idToken);
  Cookie.set("uid", responseToken.data.localId);
  Cookie.set("displayName", responseToken.data.displayName);

  let getType = {
    token: Cookie.get("token"),
  };

  const responseType = await Axios.post(endpoints.auth.verifyToken, getType);
  Cookie.set("typeUser", responseType.data.type);
  let getorgId = {
    idToken: Cookie.get("token"),
    uid: Cookie.get("uid"),
  };

  const url = DASHBOARD_TYPE[responseType.data.type];
  if (Cookie.get("typeUser") == "admin") {
    const responseorgId = await Axios.post(endpoints.auth.orgId, getorgId);
    Cookie.set("orgId", responseorgId.data[0].orgId);
  } else {
    const orgId = await Axios.post(endpoints.auth.uidCompany, getorgId);
    Cookie.set("orgId", orgId.data);
  }

  return url;
};

const getAuthInformation = async () => {
  const body = {
    idToken: Cookie.get("token"),
    uid: Cookie.get("uid"),
  };

  const options = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const response = await Axios.post(endpoints.auth.orgId, body, options);
  return response.data;
};
const getOrgData = async () => {
  const body = {
    idToken: Cookie.get("token"),
    orgId: Cookie.get("orgId"),
  };

  const options = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const response = await Axios.post(endpoints.users.getOrgData, body, options);
  return response.data;
};

export { getLogAndType, getAuthInformation, getOrgData };
