import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChatBot.css";

let msgId = 0;

function ChatBot() {
    const [messages, setMessages] = useState([
        { id: msgId++, role: "bot", text: "Hey! I'm EventBot. Ask me about events, registration, or anything else!" }
    ]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Converts URLs in text into clickable links
    const renderMessage = (text) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, i) => {
            if (urlRegex.test(part)) {
                // Extract event ID from URL like localhost:5173/events/251
                const match = part.match(/\/events\/(\d+)/);
                if (match) {
                    return (
                        <span
                            key={i}
                            className="event-link"
                            onClick={() => {
                                setIsOpen(false);
                                navigate(`/events/${match[1]}`);
                            }}
                        >
                            View Event →
                        </span>
                    );
                }
                return <a key={i} href={part} target="_blank" rel="noreferrer">{part}</a>;
            }
            // Preserve line breaks
            return part.split("\n").map((line, j) => (
                <span key={`${i}-${j}`}>
                    {line}
                    {j < part.split("\n").length - 1 && <br />}
                </span>
            ));
        });
    };

    const handleSend = async () => {
        const text = input.trim();
        if (!text || loading) return;

        setInput("");
        setLoading(true); // ← was missing
        setMessages(prev => [...prev, { id: Date.now(), role: "user", text }]);

        try {
            // Get token from session/localStorage
            const token = localStorage.getItem("token") || "";

            const res = await fetch("http://localhost:4000/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                credentials: "include",
                body: JSON.stringify({
                    message: text,
                    history: messages.slice(-6).map(m => ({
                        role: m.role === "bot" ? "assistant" : "user",
                        content: m.text,
                    })),
                }),
            });

            const data = await res.json();
            setMessages(prev => [...prev, { id: msgId++, role: "bot", text: data.reply }]);

        } catch (err) {
            setMessages(prev => [...prev, { id: msgId++, role: "bot", text: "Something went wrong, try again!" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {!isOpen && (
                <button className="chat-bubble" onClick={() => setIsOpen(true)}>
                    💬
                </button>
            )}

            {isOpen && (
                <div className="chat-panel">
                    <div className="chat-header">
                        <span>EventBot AI</span>
                        <button onClick={() => setIsOpen(false)}>✕</button>
                    </div>

                    <div className="chat-messages">
                        {messages.map(m => (
                            <div key={m.id} className={`bubble ${m.role}`}>
                                {m.role === "bot" ? renderMessage(m.text) : m.text}
                            </div>
                        ))}

                        {/* Loading dots while waiting */}
                        {loading && (
                            <div className="bubble bot">
                                <span className="typing">...</span>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    <div className="chat-input-row">
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleSend()}
                            placeholder="Ask about events…"
                            disabled={loading}
                        />
                        <button onClick={handleSend} disabled={loading}>
                            {loading ? "..." : "Send"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default ChatBot;