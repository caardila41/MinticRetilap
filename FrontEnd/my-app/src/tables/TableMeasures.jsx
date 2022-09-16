import PopUp from "@components/PopUp";
import { useRouter } from "next/router";
import { useState, useRef } from "react";
import styles2 from "@styles/Home.module.css";
import { eliminarMedida, editarMedida } from "@services/inspectorAPI";

export default function TableMeasures({ data, fun }) {
  const inputMedida = useRef();
  const [varDelete, setvarDelete] = useState("");
  const [code, setCode] = useState("");
  const [estado, cambiarEstado] = useState(false);
  const [popUp, setpopUp] = useState("");
  const router = useRouter();
  const { cdZn } = router.query;

  const PopUpEditar = () => {
    return (
      <div className={styles2.Contenido}>
        <h2> Editar Medida</h2>
        <input
          type="text"
          className={styles2.inputPrimary}
          placeholder={"Medida"}
          ref={inputMedida}
        />
        <button
          className={styles2.Boton}
          type="submit"
          onClick={() => {
            editarMedida(cdZn, code, inputMedida.current.value).then(() => {
              fun();
              cambiarEstado(!estado);
            });
          }}
        >
          Editar
        </button>
      </div>
    );
  };
  //POP UP ELIMINAR MEDIDA------------------------------------------------------------->
  const PopUpEliminarMedida = () => {
    return (
      <div className={styles2.Contenido}>
        <h2> ¿Eliminar la medida {varDelete + 1} ?</h2>
        <button
          className={styles2.Boton}
          type="submit"
          onClick={() => {
            eliminarMedida(code, cdZn).then(() => {
              fun();
              cambiarEstado(!estado);
            });
          }}
        >
          Eliminar
        </button>
      </div>
    );
  };
  const ChooseLogicPopUp = () => {
    switch (popUp) {
      case "editarMedida":
        return <PopUpEditar />;
      case "eliminarMedida":
        return <PopUpEliminarMedida />;
    }
  };
  const Printable = (data) => {
    return data.data.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{item.timeMeasure}</td>
          <td>{item.value} Lux</td>
          <td>
            <i
              onClick={() => {
                cambiarEstado(!estado);
                setCode(item.id);
                setpopUp("editarMedida");
              }}
              id="clicky"
              className="bi-pencil"
            ></i>
            <i
              id="clicky"
              onClick={() => {
                cambiarEstado(!estado);
                setCode(item.id);
                setvarDelete(index);
                setpopUp("eliminarMedida");
              }}
              className="bi-trash"
            ></i>
          </td>
        </tr>
      );
    });
  };
  return (
    <>
      <Printable data={data} />
      <PopUp estado={estado} cambiarEstado={cambiarEstado}>
        <ChooseLogicPopUp />
      </PopUp>
    </>
  );
}
