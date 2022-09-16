import Head from "@layout/head";
import styles from "@styles/styleLogin.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import { getLogAndType } from "@services/loginToken";
import CustomAlert from "@components/CustomAlert";

export default function Index() {
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const router = useRouter();

  const clickForm = (e) => {
    e.preventDefault();
    getLogAndType(pswd, email)
      .then((res) => {
        router.push(res);
      })
      .catch((err) => {
        console.log(err);
        CustomAlert("short_msg", {
          icon: "error",
          title: "Atención",
          text: "Contraseña incorrecta, intente de nuevo",
          confirmButtonColor: "#FFC954",
        });
      });
  };

  return (
    <>
      <Head />
      <div className={styles.cuerpo}>
        <section className={styles.boxLeft}>
          <img src="base.png" alt="decorate" className={styles.boxLeft} />
        </section>
        <form className={styles.boxLogin} onSubmit={clickForm}>
          <div className={styles.brand}>Certificate</div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className={styles.positionMail}
            id={styles.emailSesion}
            placeholder="Ingresa tu email"
          />
          <input
            onChange={(e) => setPswd(e.target.value)}
            type="password"
            className={styles.positionPass}
            id={styles.passwordSesion}
            placeholder="Contraseña"
          />
          <button type="submit" className={styles.botonEnviar}>
            Iniciar sesion
          </button>
        </form>
      </div>
    </>
  );
}
Index.authPage = true;
