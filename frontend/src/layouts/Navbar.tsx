import { NavLink } from 'react-router';

const Navbar = () => {
    return (
        <nav className="bg-white text-black font-bold text-lg shadow-md w-full flex items-center">
            <div className="flex justify-center w-full px-6 py-4 space-x-7 ">
                <NavLink to={'/quizzes'}>Quizzes</NavLink>
                <NavLink to={'/quizzes/create'}>New Quiz</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
