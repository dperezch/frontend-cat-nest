"use client";
import { useSession } from "next-auth/react";

const Dashboard = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }
  console.log(session);

  const getCats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cats`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${session?.user?.token}`
      }
    })

    const data = await res.json();
    console.log(data);
    
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h3>Bienvenido {session?.user?.email}</h3>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
      <button className="btn btn-primary" onClick={getCats}>Get Cats</button>
    </div>
  );
};
export default Dashboard;
