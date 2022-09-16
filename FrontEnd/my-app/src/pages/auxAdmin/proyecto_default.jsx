import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@styles/styleUser.module.css";
/**
 * Pantalla principal del auxiliar administrativo - HU09-10
 * @returns {JSX.Element}
 */

export default function ProyectDefault() {
    return (
    <div>
      {/* <div className="text-center">
          <Link href={`/auxAdmin/create/proyects`}
            as={`CrearProyectos`}>
              <button className={styles.botonCrear}> Crear Proyecto
              </button>
            </Link>
      </div> */}
      <div className={styles.boxDefault}>
        <h1>Proyecto Default</h1>
      </div>
       <div className={styles.boxComentarios}>
        <p className={styles.textTime}>Hace 1 hora</p>
        <h5>Autor</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
       </div>

       <div className={styles.boxZonas}>
        <p className={styles.textTime}>Hace 1 hora</p>
        <h5>Zona x</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>

       <div className={styles.boxComentarios}>
        <p className={styles.textTime}>Hace 1 hora</p>
        <h5>Autor</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
       </div>
    </div>
    
    )};