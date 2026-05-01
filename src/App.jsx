import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        toastStyle={{
          color: '#000000',
          fontSize: '16px',
        }}
      />
      <AppRoutes />
    </>
  );
}