import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Home() {
    const [gameId, setGameId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (gameId) {
            navigate(`/game/waiting-room/${gameId}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Join a Game</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-64">
                <input
                    type="text"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    placeholder="Enter Game ID"
                    className="border border-gray-300 rounded px-3 py-2"
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                    Join Game
                </button>
            </form>
        </div>
    );
}
