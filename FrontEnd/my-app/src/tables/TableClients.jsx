import Link from "next/link";
import { borrarCliente } from "@services/auxAPI";

export default function TableClients({ data, fun }) {
  return data.map((item, index) => {
    return (
      <tr key={index}>
        <th scope="row">{item.nit}</th>
        <td>{item.nameCustomer}</td>
        <td>{item.nameOwner}</td>
        <td>{item.type}</td>
        <td>
          <Link
            href={{
              pathname: `/auxAdmin/client/${"edit"}`,
              query: {
                idClient: item.id,
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
              borrarCliente(item.id).then(() => {
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
