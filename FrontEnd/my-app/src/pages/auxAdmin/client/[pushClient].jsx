import ClientForm from "@components/ClientForm";
import { useRouter } from "next/router";
/**
 * Pantalla principal del auxiliar administrativo - HU11
 * @returns {JSX.Element}
 */
export default function updateClient() {
  const router = useRouter();
  const { pushClient } = router.query;
  const { idClient } = router.query;
  return <ClientForm type={pushClient} idClient={idClient} />;
}
