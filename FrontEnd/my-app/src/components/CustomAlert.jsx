import Swal from "sweetalert2";

/**
 * @description: if not data is passed to the variable alertData it will use the default data
 */
let datadefault = {
  icon: "error",
  title: "Título de ejemplo, porfavor actualizar",
  text: "Texto de ejemplo, porfavor actualizar",
  confirmButtonText: "Confirmar",
  allowOutsideClick: false,
  confirmButtonColor: null,
  executeFunction: () => alert("Cambia la función a ejecutar"),
};

/**
 * Hash table of alert types, depends on the type of alert that is going
 * to be displayed in the screen, you need to send the type of alert example:
 * short_msg, confirm_msg and the data that is going to be displayed
 */
const TYPE_OF_ALERT = {
  short_msg: ({ icon, title, confirmButtonColor, text }) => {
    return Swal.fire({
      icon,
      title,
      confirmButtonColor,
      text,
    });
  },
  confirm_msg: async ({
    icon,
    title,
    text,
    confirmButtonColor,
    confirmButtonText,
    allowOutsideClick,
    executeFunction,
  }) => {
    return await Swal.fire({
      icon,
      title,
      text,
      confirmButtonColor,
      confirmButtonText,
      allowOutsideClick,
    }).then((result) => {
      if (result.isConfirmed) {
        // you can send a console log to see if the user has clicked the button
        // example  executeFunction: () => console.log("Has aceptado")
        executeFunction();
      }
    });
  },
};

/**
 * Default alert data if the alert type is not in the hash table
 * @param {string} icon
 * @param {string} title
 * @param {string} text
 * @returns
 */
const DEFAULT_ALERT_DATA = (icon, title, text, confirmButtonColor) => {
  return Swal.fire({
    icon,
    title,
    text,
    confirmButtonColor,
  });
};

/**
 * Custom function to display different types of alerts
 * @param {string} alertType id of the alert type
 * @param {array} alertData data of the alert
 */
const CustomAlert = (alertType = "short_msg", alertData = datadefault) => {
  // if the alert type is not in the hash table, it will use the default alert
  TYPE_OF_ALERT[alertType]
    ? TYPE_OF_ALERT[alertType](alertData)
    : DEFAULT_ALERT_DATA(alertData);
};

export default CustomAlert;
