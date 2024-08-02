"use client";
import axios from "axios";
import { routeModule } from "next/dist/build/templates/app-page";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Overview() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/overview");
    } catch (error) {}
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Overview Page</h1>
      <div>
        <Link href="/signup">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Signup
          </button>
        </Link>
      </div>
      <div>
        <Link href="/login">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Login
          </button>
        </Link>
      </div>
      {/* <div>
        <Link href="/logout">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Logout
          </button>
        </Link>
      </div> */}
      <div>
        <button
          style={{ margin: "10px", padding: "10px 20px" }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div>
        <Link href="/trial">
          <button style={{ margin: "10px", padding: "10px 20px" }}>
            Trial Page
          </button>
        </Link>
      </div>
    </div>
  );
}
