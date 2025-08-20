import { useEffect } from 'react';

const GamePage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        socket?.emit();
    }, []);
    return <div>GamePage</div>;
};

export default GamePage;
