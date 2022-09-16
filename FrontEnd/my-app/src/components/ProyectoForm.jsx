import styles from "@styles/styleUser.module.css";
import React, { useRef } from "react";
import { crearProyecto, actualizarProyecto } from "@services/auxAPI";
import Router, { useRouter } from "next/router";

export default function ProyectoForm({ type, data, idProject }) {
  const router = useRouter();
  const {
    nameQuery,
    numZonesQuery,
    numLuminariasQuery,
    idCustomerQuery,
    adressQuery,
    telefonoQuery,
    descripcionQuery,
  } = router.query;
  let nameProyect = useRef(),
    numZones = useRef(),
    numLuminarias = useRef(),
    idOferta = useRef(),
    direccion = useRef(),
    telefono = useRef(),
    descripcion = useRef();
  let textPrint = "errorUndefined";
  let btnPrint = "errorUndefined";

  type == "edit"
    ? ((textPrint = "Editar Proyecto"), (btnPrint = "Actualizar"))
    : ((textPrint = "Crear Proyecto"), (btnPrint = "Registrar"));

  // TODO: Terminar la petición para crear un usuario
  const addProject = (e) => {
    e.preventDefault();
    let data = {
      idInspector: e.target[0].value,
      direccion: direccion.current.value,
      name: nameProyect.current.value,
      telefono: telefono.current.value,
      descripcion: descripcion.current.value,
      idCustomer: idOferta.current.value,
      numZones: numZones.current.value,
      numLuminarias: numLuminarias.current.value,
    };
    crearProyecto(data).then(() => {
      Router.push("../proyects");
    });
  };
  const editProject = (e) => {
    e.preventDefault();
    let data = {
      idProject: idProject,
      idInspector: e.target[0].value,
      direccion: direccion.current.value,
      name: nameProyect.current.value,
      telefono: telefono.current.value,
      descripcion: descripcion.current.value,
      idCustomer: idOferta.current.value,
      numZones: numZones.current.value,
      numLuminarias: numLuminarias.current.value,
    };
    actualizarProyecto(data).then(() => {
      Router.push("../proyects");
    });
  };

  const LogicAdd = ({ children }) => {
    return (
      <form onSubmit={addProject} className={styles.boxData}>
        {children}
      </form>
    );
  };
  const LogicEdit = ({ children }) => {
    return (
      <form onSubmit={editProject} className={styles.boxData}>
        {children}
      </form>
    );
  };
  //AUXILIAR---ELECCION SEGUN LOS PARAMETROS ENVIADOS------------------------------------------------------------->
  const ChooseLogicProject = ({ children }) => {
    return type == "create" ? LogicAdd({ children }) : LogicEdit({ children });
  };

  return (
    <section className={styles.containerForm}>
      <ChooseLogicProject>
        <div className={styles.textHolder}>{textPrint}</div>
        <select className={styles.positionData1} id={styles.contenedorDatos}>
          {data.map((item, index) => {
            return (
              <option key={index} value={item.uid}>
                {item.name}
              </option>
            );
          })}
        </select>
        <input
          type="text"
          className={styles.positionData1}
          id={styles.contenedorDatos}
          placeholder="Nombre del Proyecto"
          ref={nameProyect}
          defaultValue={nameQuery || ""}
        />

        <input
          type="text"
          className={styles.positionData2}
          id={styles.contenedorDatos}
          placeholder="Número de zonas"
          ref={numZones}
          defaultValue={numZonesQuery || ""}
        />

        <input
          type="text"
          className={styles.positionData3}
          id={styles.contenedorDatos}
          placeholder="Numero de luminarias"
          ref={numLuminarias}
          defaultValue={numLuminariasQuery || ""}
        />

        <input
          type="text"
          className={styles.positionData3}
          id={styles.contenedorDatos}
          placeholder="Id oferta comercial"
          ref={idOferta}
          defaultValue={idCustomerQuery || ""}
        />

        <input
          type="text"
          className={styles.positionData3}
          id={styles.contenedorDatos}
          placeholder="Dirección del Proyecto"
          ref={direccion}
          defaultValue={adressQuery || ""}
        />

        <input
          type="text"
          className={styles.positionData3}
          id={styles.contenedorDatos}
          placeholder="Teléfono"
          ref={telefono}
          defaultValue={telefonoQuery || ""}
        />

        <textarea
          type="text"
          className={styles.positionData3}
          id={styles.contenedorDatos}
          placeholder="Descripción"
          rows="3"
          ref={descripcion}
          defaultValue={descripcionQuery || ""}
        ></textarea>

        <button submit="submit" className={styles.botonEnviar}>
          {btnPrint}
        </button>
      </ChooseLogicProject>
    </section>
  );
}
