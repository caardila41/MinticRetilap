import Link from "next/link";
import DynamicTable from "@components/DynamicTable";
import styles from "@styles/styleUser.module.css";
import { useEffect, useState } from "react";
import { listarProyectos } from "@services/auxAPI";
/**
 * Pantalla principal del auxiliar administrativo - HU09-10
 * @returns {JSX.Element}
 */

const titlesTable = [
  "Proyecto No",
  "Inspector",
  "Nombre del Proyecto",
  "Número de Zonas",
  "Número de Iluminarias",
  "Id Oferta Comercial",
  "Dirección",
  "Teléfono",
  "Descripción",
  "Acciones",
];
export default function listProyectos() {
  const [listProjects, setList] = useState([]);
  //INSPECTOR---RENDERIZADO DE LA LISTA DE TODAS LAS ZONAS------------------------------------------------------------->
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    listarProyectos()
      .then((res) => {
        setTimeout(function () {
          setList(res);
        }, 1000);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="text-center">
        <Link
          href={`/auxAdmin/proyect/${"create"}`}
          as={`/auxAdmin/proyect/${"create"}`}
        >
          <button className={styles.botonCrear}> Crear Proyecto</button>
        </Link>
      </div>
      <DynamicTable
        titles={titlesTable}
        data={listProjects}
        type="proyectos"
        fun={getData}
      />
    </div>
  );
}
