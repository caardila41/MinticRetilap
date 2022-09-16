import DataOrganizacion from "@components/DataOrganizacion";
/**
 * Pantalla para ver información de la organización - HU01
 * @returns {JSX.Element}
 */
export default function readInformation() {
  return (
    <DataOrganizacion
      title="Datos de la organización"
      type="read"
      btnName="experimento"
    />
  );
}
