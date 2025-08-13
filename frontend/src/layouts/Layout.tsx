import { Outlet } from 'react-router';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div className="bg-neutral-100 min-h-screen">
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
