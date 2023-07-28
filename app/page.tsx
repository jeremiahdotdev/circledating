import { NewProfile } from "@/views/OptimizedNewProfile";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NewProfile communityName={"r/ChristianDating"} />
    </main>
  );
}
