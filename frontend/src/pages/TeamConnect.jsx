import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FaPaperPlane, FaComments } from 'react-icons/fa';

const ENDPOINT = 'http://localhost:5000'; // Make sure this matches your backend URL

const TeamConnect = () => {
    const { admin: user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);
    const messagesEndRef = useRef(null);

    // V2 State
    const [activeChat, setActiveChat] = useState('general'); // 'general' or userId
    const [activeChatUser, setActiveChatUser] = useState(null); // User object for header
    const [staffList, setStaffList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // 1. Fetch Staff List
    useEffect(() => {
        const fetchStaff = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get(`${ENDPOINT}/api/auth/staff/list`, config);
                // Filter out self
                setStaffList(data.filter(u => u._id !== user._id));
            } catch (error) {
                console.error("Error fetching staff:", error);
            }
        };
        if (user) fetchStaff();
    }, [user]);

    // 2. Setup Socket & Message Listener
    useEffect(() => {
        if (!user) return;

        const newSocket = io(ENDPOINT, {
            query: { userId: user._id, username: user.username }
        });

        newSocket.emit('join_chat'); // Join General
        newSocket.emit('join_user_room', user._id); // Join My Private Room

        newSocket.on('receive_message', (message) => {
            // Logic to decide if we show this message in CURRENT view
            // If in General, show General messages
            // If in DM with Bob, show messages from Bob OR sent by Me to Bob

            // Note: Since we need state 'activeChat' inside this callback, we might need a ref or functional update
            // Simplest: Check message type. 
            // Better: Just fetch latest or append if matches.
            // Let's rely on simple filtering for now:
            setMessages((prev) => {
                // If message is general (recipient is null)
                if (!message.recipient) {
                    return prev; // We will handle general in activeChat check below? 
                    // Actually, if we are in 'general', we want to see it.
                }
                return [...prev, message];
            });
            // Re-fetch is safer for consistency but 'append' is better for UX.
            // Implementing "Smart Append" in a separate effect or just triggering re-fetch for simplicity V1.
        });

        // Simplified Message Listener: Just append everything, we filter in Render? 
        // No, that's inefficient.
        // Let's use a "Fetch on Chat Change" approach + "Append if matches current chat".

        setSocket(newSocket);

        return () => newSocket.close();
    }, [user]);

    // 3. Smart Message Handler (Re-defined to capture activeChat)
    useEffect(() => {
        if (!socket) return;

        const handleMessage = (message) => {
            // If General Chat is active and message is general
            if (activeChat === 'general' && !message.recipient) {
                setMessages(prev => [...prev, message]);
                scrollToBottom();
            }
            // If DM is active
            else if (activeChat !== 'general') {
                // Determine if this message belongs to current chat
                // 1. I sent it to ActiveUser
                // 2. ActiveUser sent it to Me
                const isFromActive = message.sender === activeChat || message.sender._id === activeChat;
                const isToActive = message.recipient === activeChat;

                if (isFromActive || isToActive) {
                    setMessages(prev => [...prev, message]);
                    scrollToBottom();
                }
            }
        };

        socket.off('receive_message'); // Remove old listeners to avoid duplicates on strict mode
        socket.on('receive_message', handleMessage);

        return () => socket.off('receive_message');
    }, [socket, activeChat]);


    // 4. Fetch Messages when activeChat changes
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                let url = `${ENDPOINT}/api/messages`;

                if (activeChat === 'general') {
                    url += `?room=general`;
                } else {
                    url += `?userId=${activeChat}`;
                }

                const { data } = await axios.get(url, config);
                setMessages(data);
                scrollToBottom();
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        if (user) fetchMessages();
    }, [activeChat, user]);


    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !socket) return;

        const messageData = {
            sender: user._id,
            senderName: user.username || user.fullName,
            content: newMessage,
            timestamp: new Date(),
            recipient: activeChat === 'general' ? null : activeChat
        };

        socket.emit('send_message', messageData);
        setNewMessage('');
    };

    const handleChatSelect = (chatId, chatUser = null) => {
        setActiveChat(chatId);
        setActiveChatUser(chatUser);
    }

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200 bg-blue-600 text-white">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <FaComments /> Team Connect
                    </h2>
                    <p className="text-xs text-blue-100 mt-1">{user.fullName}</p>
                </div>

                <div className="p-3">
                    <div className="relative">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <span>{isDropdownOpen ? 'Close Staff List' : 'Select Staff to Chat...'}</span>
                            <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                <div className="sticky top-0 z-10 bg-white p-2 border-b">
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded text-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Search name..."
                                        value={searchTerm}
                                        onChange={e => setSearchTerm(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                {staffList
                                    .filter(u => u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || u.username.toLowerCase().includes(searchTerm.toLowerCase()))
                                    .map(staff => (
                                        <div
                                            key={staff._id}
                                            className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50 flex items-center gap-3"
                                            onClick={() => {
                                                handleChatSelect(staff._id, staff);
                                                setIsDropdownOpen(false);
                                            }}
                                        >
                                            {staff.profileImage ? (
                                                <img src={staff.profileImage} alt={staff.username} className="w-8 h-8 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                                    {staff.fullName ? staff.fullName.charAt(0) : staff.username.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <span className="block truncate font-medium text-gray-900">{staff.fullName || staff.username}</span>
                                                <span className="block truncate text-xs text-gray-500">{staff.role}</span>
                                            </div>
                                        </div>
                                    ))}
                                {staffList.length === 0 && <div className="p-4 text-center text-gray-500 text-sm">No staff found</div>}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    <div
                        onClick={() => handleChatSelect('general')}
                        className={`p-4 cursor-pointer hover:bg-blue-50 transition border-b border-gray-100 ${activeChat === 'general' ? 'bg-blue-100 border-l-4 border-blue-600' : ''}`}
                    >
                        <div className="font-bold text-gray-800"># General Chat</div>
                        <div className="text-xs text-gray-500">Public Company Channel</div>
                    </div>

                    <div className="p-2 text-xs font-bold text-gray-400 uppercase mt-2">Direct Messages</div>

                    {staffList
                        .filter(u => u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || u.username.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map(staff => (
                            <div
                                key={staff._id}
                                onClick={() => handleChatSelect(staff._id, staff)}
                                className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition rounded mx-2 ${activeChat === staff._id ? 'bg-white shadow-sm ring-1 ring-blue-200' : ''}`}
                            >
                                <div className="relative">
                                    {staff.profileImage ? (
                                        <img src={staff.profileImage} alt={staff.username} className="w-8 h-8 rounded-full object-cover" />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                            {staff.fullName ? staff.fullName.charAt(0) : staff.username.charAt(0)}
                                        </div>
                                    )}
                                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white"></span>
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-gray-700">{staff.fullName || staff.username}</div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50">
                {/* Header */}
                <div className="bg-white p-4 shadow-sm border-b border-gray-200 flex justify-between items-center h-16">
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg">
                            {activeChat === 'general' ? '# General Chat' : (activeChatUser?.fullName || 'Chat')}
                        </h3>
                        {activeChat !== 'general' && (
                            <p className="text-xs text-green-600 flex items-center gap-1">● Online</p>
                        )}
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg, index) => {
                        const isMyMessage = msg.sender === user?._id || msg.sender?._id === user?._id;
                        return (
                            <div key={index} className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] ${isMyMessage ? 'items-end' : 'items-start'} flex flex-col`}>

                                    {/* Sender Name in Group Chat */}
                                    {activeChat === 'general' && !isMyMessage && (
                                        <span className="text-xs text-gray-500 ml-1 mb-1 font-semibold">{msg.senderName}</span>
                                    )}

                                    <div className={`p-3 rounded-2xl shadow-sm ${isMyMessage
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                                        }`}>
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-200">
                    <form onSubmit={handleSendMessage} className="flex gap-3 max-w-5xl mx-auto">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={`Message ${activeChat === 'general' ? '#general' : (activeChatUser?.fullName || 'user')}...`}
                            className="flex-1 p-3 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none px-6"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-all shadow-md"
                        >
                            <FaPaperPlane className="-ml-1" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeamConnect;
