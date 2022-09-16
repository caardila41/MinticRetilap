import { useEffect, useState } from "react";
import styles from "@styles/styleUser.module.css";
import { getOrgData } from "@services/loginToken";
/**
 * Es la pantalla principal del administrador. Antes era menuLog
 * @returns {JSX.Element}
 */

export default function index() {
  const [organization, setOrganization] = useState([
    {
      orgId: "",
      companyName: "",
      uidAdmin: "",
      certficationId: "",
      nit: "",
    },
  ]);

  useEffect(() => {
    getInformation();
  }, []);

  const getInformation = () => {
    getOrgData()
      .then((res) => {
        setOrganization(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <section className={styles.boxLog}>
        <h1>Organización</h1>
        <h4>Nombre de la compañia:</h4>
        <p>{organization.companyName}</p>
        <h4>NIT:</h4>
        <p>{organization.nit}</p>
        <h4>Certfication Id:</h4>
        <p>{organization.certficationId}</p>
      </section>
    </div>
  );
}
