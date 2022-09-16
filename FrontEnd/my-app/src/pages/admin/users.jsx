import { useEffect, useState } from "react";
import DynamicTable from "@components/DynamicTable";
import { getAllUsers } from "@services/users";
import Link from "next/link";
import styles from "@styles/styleLogin.module.css";

/**
 * Pantalla para lista información de los usuarios - HU05-HU06
 * @returns {JSX.Element}
 */

const titlesTable = [
  "#",
  "Tipo",
  "Nombre completo",
  "Cargo",
  "Correo electrónico",
  "Cédula",
  "Acciones",
];
export default function usersInformation() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllUsers()
      .then((res) => {
        console.log(res);
        let newArray = [];
        res.map((item) => {
          newArray.push({
            id: item.uid,
            type: item.type,
            name: item.displayName,
            position: item.cargo || "No tiene cargo asociado",
            email: item.email,
            cedula: item.nationalID,
            docId: item.docId,
            profesionalID: item.profesionalID,
          });
        });
        setData(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={styles.containerTable}>
      <Link href={`/admin/create/user`} as={`/admin/create/user`}>
        <button type="submit" className={styles.botonZonas}>
          Crear usuario
        </button>
      </Link>
      <DynamicTable
        titles={titlesTable}
        data={data}
        fun={getData}
        type="usuarios"
      />
    </section>
  );
}
