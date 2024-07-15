import {
  RouterProvider,
} from "react-router-dom";
import router from "./router"
import AuthProvider from "./context/authContext"

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
