import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/blog/Navbar";
import Signin from "./components/form/Signin";
import { Signup } from "./components/form/Signup";
import store from "./redux/Store";
function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
  ]);
  return (
    <div>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
