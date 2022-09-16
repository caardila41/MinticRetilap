import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import styles from "@styles/header.module.css";
import Cookie from "js-cookie";
import { useRouter } from "next/router";

const VALUE = {
  admin: "/admin",
  aux: "/auxAdmin",
  inspector: "/inspector",
};

export default function Header() {
  let typeUser = "";
  const router = useRouter();
  // let initialRoute = "";
  const [initialRoute, setInitialRouteState] = useState("");
  // console.log();
  // let initialRoute = VALUE[Cookie.get("typeUser")];

  useEffect(() => {
    setInitialRouteState(VALUE[Cookie.get("typeUser")]);
  }, []);
  const signOut = (e) => {
    e.preventDefault();
    Cookie.remove("token");
    Cookie.remove("typeUser");
    Cookie.remove("uid");
    Cookie.remove("orgId");
    Cookie.remove("cdPr");
    Cookie.remove("displayName");
    localStorage.clear();
    router.push("/");
  };

  let i = true;
  let refMenu = useRef(),
    refMenuBtn = useRef();

  const menuToggle = (e) => {
    if (i) {
      refMenu.current.style.opacity = 1;
      refMenu.current.style.visibility = "visible";
      refMenu.current.style.top = "80px";
      i = !i;
    } else {
      refMenu.current.style.opacity = 0;
      refMenu.current.style.visibility = "hidden";
      refMenu.current.style.top = "120px";
      i = !i;
    }
  };

  const displayOptions = () => {
    switch (Cookie.get("typeUser")) {
      case "admin":
        typeUser = "Administrador";
        return (
          <>
            <Link href="/admin/users">
              <a className={styles.textHeader}>Usuarios</a>
            </Link>
          </>
        );
      case "aux":
        typeUser = "Auxiliar";
        return (
          <>
            <Link href="/auxAdmin/clients">
              <a className={styles.textHeader}>Clientes</a>
            </Link>
            <Link href="/auxAdmin/proyects">
              <a className={styles.textHeader}>Proyectos</a>
            </Link>
          </>
        );
      case "inspector":
        typeUser = "Inspector";
        return (
          <>
            <Link href="/inspector/proyects">
              <a className={styles.textHeader}>Proyectos</a>
            </Link>
          </>
        );
      default:
        console.log("No hay nada");
        break;
    }
  };

  return (
    <form className={styles.header}>
      <img
        src="/topIco.png"
        alt="Imagen de perfil"
        className={styles.brandIco}
      />
      <Link href={initialRoute}>
        <a className={styles.textHeader}>Inicio</a>
      </Link>
      {displayOptions()}

      <img
        src="/btnOpciones.png"
        alt=" "
        className={styles.btnOpciones}
        ref={refMenuBtn}
        onClick={menuToggle}
      />

      <div className={styles.menu} ref={refMenu}>
        <h3>
          {typeUser}
          <div>{Cookie.get("displayName") || "No name"}</div>
        </h3>
        <ul>
          {/* <li className={styles.menuItem}>
            <Link href="/admin/information">
              <a>Gestión de organización</a>
            </Link>
          </li> */}
          <li className={styles.menuItem}>
            <Link href="/admin/information">
              <a onClick={signOut}>Cerrar sesión</a>
            </Link>
          </li>
        </ul>
      </div>
    </form>
  );
}
