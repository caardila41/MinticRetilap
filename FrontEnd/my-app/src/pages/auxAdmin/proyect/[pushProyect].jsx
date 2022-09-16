import ProyectoForm from "@components/ProyectoForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { listarInspectores } from "@services/auxAPI";

/**
 * Pantalla principal del auxiliar administrativo - HU07
 * @returns {JSX.Element}
 */
export default function pushProyect() {
  const router = useRouter();
  const { pushProyect } = router.query;
  const { idProject } = router.query;
  const [listInspector, setListInspector] = useState([]);
  useEffect(() => {
    listarInspectores()
      .then((res) => {
        setListInspector(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ProyectoForm
      type={pushProyect}
      data={listInspector}
      idProject={idProject}
    />
  );
}
