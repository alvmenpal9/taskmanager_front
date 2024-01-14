import { Outlet } from "react-router-dom";

const LayoutHome = () => {

    return(
        <main className="main">
            <Outlet />
        </main>
    )
}

export default LayoutHome;