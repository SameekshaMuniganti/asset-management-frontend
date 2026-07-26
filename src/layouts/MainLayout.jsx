import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../styles/Layout.css";

function MainLayout({ children }) {

    return (
        <div className="app-layout">

            <Sidebar />

            <div className="main-area">

                <Navbar />

                <div className="page-content">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default MainLayout;