import { useEffect, useState } from "react";
import styles from "@styles/styleUser.module.css";
import { useRouter } from "next/router";
/**
 * Pantalla para crear información de la organización
 * @returns {JSX.Element}
 */
export default function DataOrganizacion(props) {
  const router = useRouter();
  const { title, type } = props;
  // Estado para guardar la información de la organización
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    nit: "",
  });
  console.log(props);
  // useEffect para realizar una petición antes de que renderice el componente
  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/1", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        // setea la información del formulario
        setFormData({
          name: data.name,
          number: data.id,
          nit: data.base_experience,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // TODO: Terminar la petición para crear una organización
  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "read") {
      router.push("/admin/update/information");
    } else {
      alert("Agregar lógica");
    }
  };

  const inputColor =
    type === "read" ? styles.contenedorDatosRead : styles.contenedorDatos;

  const isDisable = type === "read" ? true : false;

  return (
    <section className={styles.containerForm}>
      <form onSubmit={handleSubmit} className={styles.boxData}>
        <div className={styles.textHolder}>{title}</div>
        <input
          type="text"
          className={styles.positionData1}
          id={inputColor}
          defaultValue={formData.name}
          placeholder="Nombre de organizacion"
          disabled={isDisable}
        />
        <input
          type="text"
          className={styles.positionData2}
          id={inputColor}
          defaultValue={formData.number}
          placeholder="Numero de acreditacion"
          disabled={isDisable}
        />
        <input
          type="text"
          className={styles.positionData3}
          id={inputColor}
          defaultValue={formData.nit}
          placeholder="NIT"
          disabled={isDisable}
        />
        <button submit="submit" className={styles.botonEnviar}>
          Editar datos
        </button>
      </form>
    </section>
  );
}
