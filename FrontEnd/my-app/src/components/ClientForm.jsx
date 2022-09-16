import styles from "@styles/styleUser.module.css";
import React, { useRef } from "react";
import { crearCliente, actualizarCliente } from "@services/auxAPI";
import Router from "next/router";

export default function ProyectoForm({ type, idClient }) {
  let nit = useRef(),
    nameCustomer = useRef(),
    nameOwner = useRef(),
    typeEnterpise = useRef();
  let textPrint = "errorUndefined";
  let btnPrint = "errorUndefined";
  type == "edit"
    ? ((textPrint = "Editar Cliente"), (btnPrint = "Actualizar"))
    : ((textPrint = "Crear Cliente"), (btnPrint = "Registrar"));

  const addCustomer = (e) => {
    e.preventDefault();
    let data = {
      nit: nit.current.value,
      nameCustomer: nameCustomer.current.value,
      nameOwner: nameOwner.current.value,
      typeEnterpise: typeEnterpise.current.value,
    };
    crearCliente(data)
      .then(() => {
        Router.push("../clients");
      })
      .catch((err) => console.log(err));
  };
  const editCustomer = (e) => {
    e.preventDefault();
    let data = {
      nit: nit.current.value,
      nameCustomer: nameCustomer.current.value,
      nameOwner: nameOwner.current.value,
      typeEnterpise: typeEnterpise.current.value,
      idCustomer: idClient,
    };
    actualizarCliente(data)
      .then(() => {
        Router.push("../clients");
      })
      .catch((err) => console.log(err));
  };
  const LogicAdd = ({ children }) => {
    return (
      <form onSubmit={addCustomer} className={styles.boxData}>
        {children}
      </form>
    );
  };
  const LogicEdit = ({ children }) => {
    return (
      <form onSubmit={editCustomer} className={styles.boxData}>
        {children}
      </form>
    );
  };
  const ChooseLogicCustomer = ({ children }) => {
    return type == "edit" ? LogicEdit({ children }) : LogicAdd({ children });
  };
  return (
    <section className={styles.containerForm}>
      <ChooseLogicCustomer>
        <div className={styles.textHolder}>{textPrint}</div>

        <input
          type="text"
          className={styles.positionData1}
          id={styles.contenedorDatos}
          placeholder="Nit Cliente"
          ref={nit}
        />
        <input
          type="text"
          className={styles.positionData2}
          id={styles.contenedorDatos}
          placeholder="Nombre Cliente"
          ref={nameCustomer}
        />
        <input
          type="text"
          className={styles.positionData3}
          id={styles.contenedorDatos}
          placeholder="Representante Legal"
          ref={nameOwner}
        />
        <input
          type="text"
          className={styles.positionData3}
          id={styles.contenedorDatos}
          placeholder="Tipo Empresa"
          ref={typeEnterpise}
        />
        <button submit="submit" className={styles.botonEnviar}>
          {btnPrint}
        </button>
      </ChooseLogicCustomer>
    </section>
  );
}
