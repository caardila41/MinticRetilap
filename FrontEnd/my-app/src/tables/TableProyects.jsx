import Link from "next/link";
import { borrarProyecto } from "@services/auxAPI";

export default function TableProyects({ data, fun }) {
  return data.map((item, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.nameInspector}</td>
        <td>{item.name}</td>
        <td>{item.numZones}</td>
        <td>{item.numLuminarias}</td>
        <td>{item.idCustomer}</td>
        <td>{item.adress}</td>
        <td>{item.telefono}</td>
        <td>{item.descripcion}</td>
        <td>
          <Link
            href={{
              pathname: `/auxAdmin/proyect/${"edit"}`,
              query: {
                idProject: item.id,
                nameQuery: item.name,
                numZonesQuery: item.numZones,
                numLuminariasQuery: item.numLuminarias,
                idCustomerQuery: item.idCustomer,
                adressQuery: item.adress,
                telefonoQuery: item.telefono,
                descripcionQuery: item.descripcion,
              },
            }}
          >
            <button className="btn">
              <i className="bi-pencil"></i>
            </button>
          </Link>
          <i
            id="clicky"
            onClick={() => {
              borrarProyecto(item.id).then(() => {
                fun();
              });
            }}
            className="bi-trash"
          ></i>
        </td>
      </tr>
    );
  });
}
