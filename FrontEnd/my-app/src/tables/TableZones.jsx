import Link from "next/link";
import PopUp from "@components/PopUp";
import { useState } from "react";
import styles2 from "@styles/Home.module.css";
import { eliminarZona } from "@services/inspectorAPI";

export default function TableZones({ data, fun }) {
  const [varDelete, setvarDelete] = useState("");
  const [code, setCode] = useState("");
  const [estado, cambiarEstado] = useState(false);

  const PopUpEliminarZona = () => {
    return (
      <div className={styles2.Contenido}>
        <h2> ¿Eliminar la zona {varDelete} ?</h2>
        <button
          className={styles2.Boton}
          type="submit"
          onClick={() => {
            eliminarZona(code).then(() => {
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
  const Printable = (data) => {
    return data.data.map((item, index) => {
      return (
        <tr key={index}>
          <Link
            href={{
              pathname: `/inspector/variables/${item.nameZone}`,
              query: {
                cdZn: item.codeZone,
                nmZn: item.nameZone,
              },
            }}
          >
            <th className="clicky" scope="row">
              {item.nameZone}
            </th>
          </Link>
          <td>{item.camp1} m^2</td>
          <td>{item.camp2} Luminarias </td>
          <td>
            <Link
              href={{
                pathname: `/inspector/zones/${"edit"}`,
                query: {
                  Nzn: item.nameZone,
                  cdZn: item.codeZone,
                  camp1: item.camp1,
                  camp2: item.camp2,
                },
              }}
            >
              <i className="bi-pencil" id="clicky"></i>
            </Link>
            <i
              id="clicky"
              onClick={() => {
                //deleteItemZone(item.codeZone)
                cambiarEstado(!estado);
                setCode(item.codeZone);
                setvarDelete(item.nameZone);
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
        <PopUpEliminarZona />
      </PopUp>
    </>
  );
}
