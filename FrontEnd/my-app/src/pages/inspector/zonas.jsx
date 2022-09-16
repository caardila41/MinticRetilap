import DynamicTable from "@components/DynamicTable";
import Link from "next/link";
import styles from "@styles/styleLogin.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { listarZonas } from "@services/inspectorAPI";
/**
 * Pantalla para lista información de las zonas HU 20
 * @returns {JSX.Element}
 */

const titlesTable = ["Nombre Zona", "Area", "Luminarias", "Acciones"];

export default function listZone() {
  const router = useRouter();
  const [zonasData, setData] = useState([]);
  const { cdPr } = router.query;
  //INSPECTOR---RENDERIZADO DE LA LISTA DE TODAS LAS ZONAS------------------------------------------------------------->
  useEffect(() => {
    if (!router.isReady) return;
    getData();
  }, [router.isReady]);

  const getData = () => {
    Cookie.set("cdPr", cdPr);
    listarZonas()
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Link
        href={`/inspector/zones/${"create"}`}
        as={`/inspector/zones/${"create"}`}
      >
        <button type="submit" className={styles.botonZonas}>
          Registrar zonas
        </button>
      </Link>
      <DynamicTable
        titles={titlesTable}
        data={zonasData}
        type="zonas"
        fun={getData}
      />
    </>
  );
}
