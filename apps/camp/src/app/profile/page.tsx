import { CAMP_DASHBOARD_PATHNAME } from "@packages/constants";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  redirect(CAMP_DASHBOARD_PATHNAME + "/1");
}
