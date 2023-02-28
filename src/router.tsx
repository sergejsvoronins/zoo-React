import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { AnimalDetails } from "./components/animalDetails/AnimalDetails";
import { AnimalSmall } from "./components/animalSmall/AnimalSmall";



export const router = createBrowserRouter([
    {
        path: "/",
        element:<App />,
        children: [
            {
                path: "/:id",
                element: <AnimalDetails />,
            },
            {
                path: "/",
                element: <AnimalSmall />,
            }
        ]
    }
])