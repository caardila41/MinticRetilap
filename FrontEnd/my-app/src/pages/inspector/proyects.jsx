import DynamicTable from "@components/DynamicTable";
import { useEffect, useState } from "react";
import { listarProyectos } from "@services/inspectorAPI";
/**
 * Pantalla para lista información de las zonas HU 20
 * @returns {JSX.Element}
 */

const titlesTable = ["Nombre proyecto"];

export default function proyects() {
  const [listProject, setList] = useState([]);
  //INSPECTOR---RENDERIZADO DE LA LISTA DE TODAS LAS ZONAS------------------------------------------------------------->
  useEffect(() => {
    listarProyectos()
      .then((res) => {
        setList(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <DynamicTable
        titles={titlesTable}
        data={listProject}
        type="listProject"
      />
    </>
  );
}
