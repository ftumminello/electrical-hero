import { APP_NAME } from "@electrical-hero/shared";
import { HealthStatus } from "./HealthStatus";

export default function Home() {
  return (
    <main>
      <h1>{APP_NAME}</h1>
      <HealthStatus />
    </main>
  );
}
