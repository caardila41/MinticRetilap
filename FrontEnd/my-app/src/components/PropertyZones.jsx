import styles from "@styles/Home.module.css";
import React, { useRef } from "react";
import Router from "next/router";
import { agregarZona, editarZona } from "@services/inspectorAPI";
import Cookie from "js-cookie";

export default function PropertyZones({ type, Nzn, cdZn, camp1, camp2 }) {
  let nameZone = useRef(),
    campo1 = useRef(),
    campo2 = useRef();
  let booleanCdzn = false;
  let textPrint = "errorUndefined";
  let btnPrint = "errorUndefined";
  type == "edit"
    ? ((textPrint = "Editar Zonas"), (btnPrint = "Actualizar"))
    : ((textPrint = "Crear Zonas"), (btnPrint = "Registrar"));

  //INSPECTOR---CREAR ZONA------------------------------------------------------------->
  const addZone = (e) => {
    e.preventDefault();
    agregarZona(
      nameZone.current.value,
      campo2.current.value,
      campo1.current.value
    ).then(() => {
      Router.push(`../zonas?cdPr=${Cookie.get("cdPr")}`);
    });
  };
  //INSPECTOR---EDITAR ZONA------------------------------------------------------------->
  const editZone = (e) => {
    e.preventDefault();
    editarZona(
      cdZn,
      nameZone.current.value,
      campo2.current.value,
      campo1.current.value
    ).then(() => {
      Router.push(`../zonas?cdPr=${Cookie.get("cdPr")}`);
    });
  };
  //INSPECTOR---RENDER DE CREAR ZONA------------------------------------------------------------->
  const LogicAdd = ({ children }) => {
    return (
      <>
        <form onSubmit={addZone} className={styles.containerInput}>
          {children}
        </form>
      </>
    );
  };
  //INSPECTOR---RENDER DE EDITAR ZONA------------------------------------------------------------->
  const LogicEdit = ({ children }) => {
    return (
      <form onSubmit={editZone} className={styles.containerInput}>
        {children}
      </form>
    );
  };
  //INSPECTOR---ELECCION SEGUN LOS PARAMETROS ENVIADOS------------------------------------------------------------->
  const ChooseLogicInspector = ({ children }) => {
    return type == "create" ? LogicAdd({ children }) : LogicEdit({ children });
  };
  return (
    <div className={styles.containerCard}>
      <ChooseLogicInspector>
        <h1>{textPrint}</h1>
        {booleanCdzn && (
          <input
            type="text"
            className={styles.inputPrimary}
            defaultValue={cdZn || ""}
            disabled={true}
          />
        )}
        <input
          type="text"
          className={styles.inputPrimary}
          defaultValue={Nzn || ""}
          ref={nameZone}
          placeholder="Nombre de la zona"
        />
        <input
          type="text"
          className={styles.inputPrimary}
          defaultValue={camp1 || ""}
          ref={campo1}
          placeholder="Area en m^2"
        />
        <input
          type="text"
          className={styles.inputPrimary}
          defaultValue={camp2 || ""}
          ref={campo2}
          placeholder="Luminarias"
        />

        <button type="submit" className={styles.btnPrimary}>
          {btnPrint}
        </button>
      </ChooseLogicInspector>
    </div>
  );
}
