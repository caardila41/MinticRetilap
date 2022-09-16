import Link from "next/link";
import styles from "@styles/styleUser.module.css";
import Swal from "sweetalert2";
import CustomAlert from "@components/CustomAlert";
import { deleteProfile } from "@services/users";
import TableZones from "@tables/TableZones";
import TableMeasures from "@tables/TableMeasures";
import TableListProyects from "@tables/TableListProyects";
import TableProyects from "@tables/TableProyects";
import TableClients from "@tables/TableClients";

export default function DynamicTable({ titles, fun, data, type }) {
  // Componente para renderizar la tabla de un usuarios
  const TableUsers = () => {
    return data.map((item, index) => {
      return (
        <tr key={index}>
          <th scope="row">{item.id}</th>
          <td>{item.type}</td>
          <td>{item.name}</td>
          <td>{item.position}</td>
          <td>{item.email}</td>
          <td>{item.cedula}</td>
          <td>
            <Link
              href={{
                pathname: `/admin/update/${"edit"}`,
                query: {
                  idProfile: item.id,
                },
              }}
            >
              <i
                id="clicky"
                onClick={() =>
                  localStorage.setItem("data", JSON.stringify(item))
                }
                className="bi-pencil"
              ></i>
            </Link>
            <i
              id="clicky"
              onClick={() => deleteItem(item.id, "profile", fun, item.docId)}
              className="bi-trash"
            ></i>
          </td>
        </tr>
      );
    });
  };

  // Seccion de los modelos de datos
  const ChooseTableData = () => {
    switch (type) {
      case "usuarios":
        return <TableUsers />;
      case "zonas":
        return <TableZones data={data} fun={fun} />;
      case "variables":
        return <TableMeasures data={data} fun={fun} />;
      case "proyectos":
        return <TableProyects data={data} fun={fun} />;
      case "clients":
        return <TableClients data={data} fun={fun} />;
      case "listProject":
        return <TableListProyects data={data} />;
    }
  };
  return (
    <>
      <div className={styles.boxLog}>
        <table className="table">
          <thead>
            <tr className={styles.tableTitles}>
              {titles.map((title, index) => (
                <th scope="col" key={index}>
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <ChooseTableData />
          </tbody>
        </table>
      </div>
    </>
  );
}

const deleteItem = async (id, module, fun, docId) => {
  Swal.fire({
    title: "Atención, estás seguro de realizar esta acción",
    text: "Se va a eliminar un perfil",
    icon: "warning",
    confirmButtonText: "Eliminar",
    confirmButtonColor: "#DC004E",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    reverseButtons: true,
    focusConfirm: false,
    focusCancel: false,
    scrollbarPadding: false,
  })
    .then((result) => {
      return result.isConfirmed;
    })
    .then((result) => {
      if (result) {
        console.log(result);
        switch (module) {
          case "profile":
            deleteAccountProfile(id, docId, fun);

            break;
          case "project":
            deleteProject(id, docId);

            break;
          default:
            console.log("No se encontro el tipo de tabla");
            break;
        }
      }
    });
};

const deleteAccountProfile = (id, docId, fun) => {
  deleteProfile(id, docId)
    .then((res) => {
      console.log(res);
      console.log("Estatus: ", res.success);
      if (res.success) {
        CustomAlert("confirm_msg", {
          icon: "success",
          title: "Alerta",
          text: "Perfil eliminado correctamente",
          confirmButtonText: "Aceptar",
          allowOutsideClick: false,
          executeFunction: () => fun(),
        });
      } else {
        CustomAlert("short_msg", {
          icon: "error",
          title: "Atención",
          text: "Ocurrió un error al eliminar el perfil, intente nuevamente.",
          confirmButtonColor: "#FFC954",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      CustomAlert("short_msg", {
        icon: "error",
        title: "Atención",
        text: "Ocurrió un error al eliminar el perfil, intente nuevamente.",
        confirmButtonColor: "#FFC954",
      });
    });
};

const deleteProject = (id) => {};
