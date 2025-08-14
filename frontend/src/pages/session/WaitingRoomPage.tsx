// src/components/WaitingRoom.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { io, Socket } from 'socket.io-client';

export default function WaitingRoom() {
    const { id } = useParams<{ id: string }>();
    const [players, setPlayers] = useState<string[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [username, setNickname] = useState('');
    const [showModal, setShowModal] = useState(true); // show nickname modal by default
    const [hasJoined, setHasJoined] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (!id || !hasJoined) return;
        const newSocket = io('http://localhost:5000'); // backend URL
        setSocket(newSocket);

        // Join the session room
        newSocket.emit('joinSession', { sessionId: id, username: username });
        // Listen for player list updates
        newSocket.on('playersUpdate', (playerList: string[]) => {
            setPlayers(playerList);
        });
        newSocket.on('game_started', ({ sessionId }) => {
            newSocket.off('game_started'); // cleanup
            navigate(`/game/${sessionId}`);
        });
        return () => {
            // Remove listeners to prevent duplicates
            newSocket.off('playersUpdate');
            newSocket.off('game_started');
            newSocket.disconnect();
        };
    }, [id, hasJoined]);
    const handleJoin = () => {
        if (username.trim()) {
            setShowModal(false);
            setHasJoined(true);
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
                                socket.emit('start_game', { sessionId: id });
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
