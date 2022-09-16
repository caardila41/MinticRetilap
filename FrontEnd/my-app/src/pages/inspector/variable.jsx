import DynamicTable from "@components/DynamicTable";
import styles from "@styles/styleLogin.module.css";
import styles2 from "@styles/Home.module.css";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import PopUp from "@components/PopUp";
import { listarMedidas, agregarMedida } from "@services/inspectorAPI";

/**
 * Pantalla para lista de Variables Inspector HU 21-22-23-24
 * @returns {JSX.Element}
 */

const titlesTable = ["Medicion", "Variable de tiempo", "Valor", "Acciones"];
export default function listVariablebyZone({ nameZone }) {
  const router = useRouter();
  const { cdZn } = router.query;
  const { nmZn } = router.query;
  const [listData, setData] = useState([]);
  const [estado, cambiarEstado] = useState(false);
  let valorMedida = useRef();
  //INSPECTOR---RENDERIZADO DE LA LISTA DE LAS MEDIDAS DE LA ZONA ESPECIFICA--------------------------------->
  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  const getData = () => {
    listarMedidas(cdZn)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  };
  //INSPECTOR---CREAR MEDIDA DENTRO DE LA ZONA------------------------------------------------------------->
  const addMeasure = (e) => {
    agregarMedida(cdZn, valorMedida.current.value, listData.length + 1).then(
      () => {
        getData();
        cambiarEstado(!estado);
      }
    );
  };
  return (
    <>
      <input className={styles.nameZone} defaultValue={nmZn} disabled={true} />
      <button
        className={styles.botonMedicion}
        onClick={() => cambiarEstado(!estado)}
      >
        Registrar medicion
      </button>
      <PopUp estado={estado} cambiarEstado={cambiarEstado}>
        <div className={styles2.Contenido}>
          <h2> Crear Medida</h2>

          <input
            type="text"
            className={styles2.inputPrimary}
            placeholder={"Medida"}
            ref={valorMedida}
          />
          <button
            className={styles2.Boton}
            type="submit"
            onClick={() => addMeasure()}
          >
            Registrar
          </button>
        </div>
      </PopUp>

      <DynamicTable
        titles={titlesTable}
        data={listData}
        type="variables"
        fun={getData}
      />
    </>
  );
}
