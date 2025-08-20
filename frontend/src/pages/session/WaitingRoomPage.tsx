// src/components/WaitingRoom.tsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { connectSocket, startGame } from '../../store/slices/socketSlice';
import type { RootState } from '../../store';

export default function WaitingRoom() {
    const { id } = useParams<{ id: string }>();
    const [username, setNickname] = useState('');
    const [showModal, setShowModal] = useState(true); // show nickname modal by default
    const [hasJoined, setHasJoined] = useState(false);
    const socket = useSelector((state: RootState) => state.socket.socket);
    const players = useSelector((state: RootState) => state.socket.players);
    const gameState = useSelector((state: RootState) => state.socket.gameState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (gameState === 'in_progress') {
            navigate(`/game/${id}`);
        }
    }, [gameState, navigate, id]);
    const handleJoin = () => {
        if (username.trim()) {
            setShowModal(false);
            setHasJoined(true);
            dispatch(connectSocket({ username, sessionId: id! }));
        }
    };

    return (
        <div className="p-4 border rounded relative">
            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-neutral-400">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-4">Enter your nickname</h2>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setNickname(e.target.value)}
                            className="border p-2 w-full rounded mb-4"
                            placeholder="Nickname"
                        />
                        <button
                            onClick={handleJoin}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Join Game
                        </button>
                    </div>
                </div>
            )}

            {hasJoined && (
                <div>
                    <h2>Waiting Room</h2>
                    <button
                        onClick={() => {
                            if (socket && id) {
                                dispatch(startGame());
                            }
                        }}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Start game
                    </button>
                    <p>You are: {username}</p>
                    <h3>Players:</h3>
                    <ul>
                        {players.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
