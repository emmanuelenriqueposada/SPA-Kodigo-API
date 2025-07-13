import { Routes, Route, Outlet} from "react-router-dom";
import Aside from "../components/Aside";



export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      <Aside />
      <main className="flex-1 p-4 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
