import { useState, useEffect } from "react";
import CustomAlert from "@components/CustomAlert";
import styles from "@styles/styleUser.module.css";
import Cookie from "js-cookie";
import { postUser, updateUser } from "@services/users";
import { useRouter } from "next/router";

export default function UserForm({ title, btnName, type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    uid: "",
    idToken: Cookie.get("token"),
    email: "",
    password: "",
    displayName: "",
    disable: true,
    orgId: Cookie.get("orgId"),
    type: "",
    profesionalID: "",
    cargo: "",
    nationalID: "",
    docId: "",
  });

  // get data from localstorage using useEffect
  useEffect(() => {
    if (btnName === "Actualizar") {
      // get data from localstorage
      const data = JSON.parse(localStorage.getItem("data"));
      // set data to formData
      setFormData({
        ...formData,
        uid: data.id,
        idToken: Cookie.get("token"),
        email: data.email,
        password: data.password,
        displayName: data.name,
        disable: data.disable,
        orgId: Cookie.get("orgId"),
        type: data.type,
        profesionalID: data.profesionalID,
        cargo: data.position,
        nationalID: data.cedula,
        docId: data.docId,
        disable: true,
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const TYPE_USER = {
      aux: "AUXILIAR",
      inspector: "INSPECTOR",
    };

    let newArray = {};

    switch (TYPE_USER[formData.type]) {
      case "AUXILIAR":
        newArray = {
          idToken: formData.idToken,
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
          disable: formData.disable,
          data: {
            orgId: Cookie.get("orgId"),
            type: formData.type,
            cargo: formData.cargo,
            nationalID: formData.nationalID,
          },
        };
        break;
      case "INSPECTOR":
        newArray = {
          idToken: formData.idToken,
          email: formData.email,
          password: formData.password,
          displayName: formData.displayName,
          disable: formData.disable,
          data: {
            orgId: Cookie.get("orgId"),
            type: formData.type,
            profesionalID: formData.profesionalID,
            nationalID: formData.nationalID,
          },
        };
        break;

      default:
        console.log("default");
        break;
    }

    switch (btnName) {
      case "Registrar":
        createNewProfile(newArray);
        break;
      case "Actualizar":
        if (TYPE_USER[formData.type] === "AUXILIAR") {
          newArray = {
            uid: formData.uid,
            idToken: formData.idToken,
            docId: formData.docId,
            data: {
              type: "aux",
              cargo: formData.cargo,
              nationalID: 543672834765,
              email: formData.email,
              password: formData.password,
              displayName: formData.displayName,
              nationalID: formData.nationalID,
              disable: true,
            },
          };
        } else {
          newArray = {
            uid: formData.uid,
            idToken: formData.idToken,
            docId: formData.docId,
            data: {
              type: "inspector",
              profesionalID: formData.profesionalID,
              nationalID: 543672834765,
              email: formData.email,
              password: formData.password,
              displayName: formData.displayName,
              nationalID: formData.nationalID,
              disable: true,
            },
          };
        }
        updateProfile(newArray);
        break;
      default:
        console.log("default");
        break;
    }
  };

  const updateProfile = (newArray) => {
    updateUser(newArray)
      .then((res) => {
        console.log(res);
        CustomAlert("confirm_msg", {
          icon: "success",
          title: "Creado",
          text: "Usuario actualiza correctamente",
          confirmButtonText: "Aceptar",
          allowOutsideClick: false,
          executeFunction: () => router.push("/admin/users"),
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.request.status === 400) {
          let msgErr = err.response.data.error || "Err";
          CustomAlert("short_msg", {
            icon: "error",
            title: "Atención",
            text: msgErr,
            confirmButtonColor: "#FFC954",
          });
        } else {
          CustomAlert("short_msg", {
            icon: "error",
            title: "Atención",
            text: "Ocurrió un error al actualizar el usuario, intente nuevamente.",
            confirmButtonColor: "#FFC954",
          });
        }
      });
  };

  const createNewProfile = (newArray) => {
    postUser(newArray)
      .then((res) => {
        console.log(res);
        CustomAlert("confirm_msg", {
          icon: "success",
          title: "Creado",
          text: "Usuario creado correctamente",
          confirmButtonText: "Aceptar",
          allowOutsideClick: false,
          executeFunction: () => router.push("/admin/users"),
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.request.status === 400) {
          let msgErr = err.response.data.error || "Err";
          CustomAlert("short_msg", {
            icon: "error",
            title: "Atención",
            text: msgErr,
            confirmButtonColor: "#FFC954",
          });
        } else {
          CustomAlert("short_msg", {
            icon: "error",
            title: "Atención",
            text: "Ocurrió un error al crear el usuario, intente nuevamente.",
            confirmButtonColor: "#FFC954",
          });
        }
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  return (
    <section className={styles.containerForm}>
      <form onSubmit={handleSubmit} className={styles.boxData}>
        <div className={styles.textHolder}>{title}</div>
        <select
          className={styles.positionData1}
          id={styles.contenedorDatos}
          name="type"
          onChange={handleChange}
          value={formData.type}
          required
        >
          <option value="">Selecciona el tipo de usuario</option>
          <option value="inspector">Inspector</option>
          <option value="aux">Auxiliar administrativo</option>
        </select>
        <input
          type="text"
          className={styles.positionData1}
          id={styles.contenedorDatos}
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
          placeholder="Nombre completo"
        />
        <input
          type="email"
          className={styles.positionData3}
          id={styles.contenedorDatos}
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
        />
        <input
          type="password"
          className={styles.positionData3}
          id={styles.contenedorDatos}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        {/* <input
          type="text"
          className={styles.positionData2}
          id={styles.contenedorDatos}
          name="orgId"
          value={Cookie.get("orgId")}
          onChange={handleChange}
          placeholder="Id de la organización"
        />
 */}
        {formData.type === "inspector" ? (
          <input
            type="text"
            className={styles.positionData2}
            id={styles.contenedorDatos}
            name="profesionalID"
            value={formData.profesionalID}
            onChange={(e) => handleChange(e)}
            placeholder="Tarjeta profesional"
          />
        ) : (
          <input
            type="text"
            className={styles.positionData2}
            id={styles.contenedorDatos}
            name="cargo"
            value={formData.cargo}
            onChange={(e) => handleChange(e)}
            placeholder="Cargo a desempeñar"
          />
        )}
        <input
          type="text"
          className={styles.positionData2}
          id={styles.contenedorDatos}
          name="nationalID"
          value={formData.nationalID}
          onChange={handleChange}
          placeholder="Número de identificación"
        />

        {type === "1" && (
          <button submit="submit" className={styles.botonEnviar}>
            {btnName}
          </button>
        )}
      </form>
    </section>
  );
}
