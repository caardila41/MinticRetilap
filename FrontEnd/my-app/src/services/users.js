import Axios from "axios";
import endpoints from "./index";
import Cookie from "js-cookie";

const getAllUsers = async () => {
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

  const response = await Axios.post(endpoints.users.listUsers, body, options);
  return response.data.data;
};

const postUser = async (body) => {
  const options = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const response = await Axios.post(endpoints.users.addUser, body, options);
  return response.data;
};

const updateUser = async (body) => {
  const options = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };

  const response = await Axios.post(endpoints.users.updateUser, body, options);
  return response.data;
};

const deleteProfile = async (id, di) => {
  const options = {
    headers: {
      accept: "*/*",
      "Content-Type": "application/json",
    },
  };
  let body = {
    idToken: Cookie.get("token"),
    uid: id,
    docId: di,
  };

  const response = await Axios.post(
    endpoints.users.deleteProfile,
    body,
    options
  );
  return response.data;
};

export { getAllUsers, postUser, deleteProfile, updateUser };
