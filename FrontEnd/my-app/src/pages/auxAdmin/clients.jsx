import DynamicTable from "@components/DynamicTable";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { listarClientes } from "@services/auxAPI";
import styles from "@styles/styleUser.module.css";
import Link from "next/link";
/**
 * Pantalla principal del auxiliar administrativo - HU13-14
 * @returns {JSX.Element}
 */

const titlesTable = [
  "Nit",
  "Nombre Cliente",
  "Representante Legal",
  "Tipo empresa",
  "Acciones",
];
export default function listClients() {
  const [listClients, setList] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    listarClientes()
      .then((res) => {
        setList(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div className="text-center">
        <Link href={`/auxAdmin/client/${"create"}`}>
          <button className={styles.botonCrear}> Crear Cliente</button>
        </Link>
      </div>
      <DynamicTable
        titles={titlesTable}
        data={listClients}
        type="clients"
        fun={getData}
      />
    </div>
  );
}
