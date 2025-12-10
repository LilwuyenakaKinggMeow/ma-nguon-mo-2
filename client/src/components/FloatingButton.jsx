import React from "react";


export default function FloatingButton({ onClick }) {
    return (
        <button className="floating-btn" onClick={onClick}>
            <svg width="28" height="28" viewBox="0 0 50 50">
                <defs>
                    <linearGradient id="messengerPurple" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#C084FC" />
                        <stop offset="100%" stopColor="#D8B4FE" />
                    </linearGradient>
                </defs>
                <path
                    fill="url(#messengerPurple)"
                    d="M25 2C12.3 2 2 11.5 2 23.7c0 6.8 3.3 12.7 8.5 16.5V48l7.8-4.2c2.2.6 4.5.9 6.7.9 12.7 0 23-9.5 23-21.7C48 11.5 37.7 2 25 2zm13.7 16.5l-8.3 8.8c-.9.9-2.3 1-3.3.1l-5.2-4.3-7.8 8.1c-.6.6-1.6.6-2.2-.1-.6-.6-.6-1.6.1-2.2l8.3-8.8c.9-.9 2.3-1 3.3-.1l5.2 4.3 7.8-8.1c.6-.6 1.6-.6 2.2.1.5.6.5 1.6-.1 2.2z"
                />
            </svg>
        </button>
    );
}
