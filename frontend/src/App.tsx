import { Outlet } from 'react-router';

function App() {
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold underline">Hello world!</h1>
                <Outlet />
            </div>
        </>
    );
}

export default App;
