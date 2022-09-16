import PropertyZones from "@components/PropertyZones";
import { useRouter } from "next/router";
export default function zonesInteract() {
  const router = useRouter();
  const { pushZone } = router.query;
  const { Nzn } = router.query;
  const { cdZn } = router.query;
  const { camp1 } = router.query;
  const { camp2 } = router.query;
  return (
    <PropertyZones
      type={pushZone}
      Nzn={Nzn}
      cdZn={cdZn}
      camp1={camp1}
      camp2={camp2}
    />
  );
}
