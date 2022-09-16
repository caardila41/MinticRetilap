import Link from "next/link";

export default function TableListProyects({ data }) {
  return data.map((item, index) => {
    return (
      <tr key={index}>
        <Link
          href={{
            pathname: `/inspector/zonas`,
            query: {
              cdPr: item.codeProject,
            },
          }}
        >
          <th className="clicky" scope="row">
            <td>{item.nameProject}</td>
          </th>
        </Link>
      </tr>
    );
  });
}
