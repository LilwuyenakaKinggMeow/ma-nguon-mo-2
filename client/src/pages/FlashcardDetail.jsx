import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import flashcardData from "../data/flashcardData";

import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

export default function FlashcardDetail() {
    const { id } = useParams();
    const category = flashcardData[id];

    if (!category) return <h2>Không tìm thấy dữ liệu</h2>;

    const bannerImages = [banner1, banner2, banner3];

    const [activePart, setActivePart] = useState(0);
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [voices, setVoices] = useState([]);

    const parts = category.parts;
    const cards = category.data[activePart] || [];
    const currentCard = cards[cardIndex];

    useEffect(() => {
        const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }, []);

    const playAudio = () => {
        if (!currentCard) return;

        let text = currentCard.word;
        let speak = new SpeechSynthesisUtterance(text);

        const isKorean = /[\uac00-\ud7af]/.test(text);    
        const isChinese = /[\u4e00-\u9fff]/.test(text); 

        if (isKorean) {
            speak.lang = "ko-KR";
            const koreanVoice = voices.find(v => v.lang === "ko-KR");
            if (koreanVoice) speak.voice = koreanVoice;
        }
        else if (isChinese) {
            speak.lang = "zh-CN";
            const chineseVoice = voices.find(
                v => v.lang === "zh-CN" || v.lang === "zh-HK" || v.lang === "zh-TW"
            );
            if (chineseVoice) speak.voice = chineseVoice;
        }
        else {
            speak.lang = "en-US";

            const femaleVoice = voices.find(
                v =>
                    v.lang === "en-US" &&
                    /female|woman|girl|Female|Zira|Jenny/i.test(v.name)
            );
            speak.voice = femaleVoice || voices.find(v => v.lang === "en-US");
        }

        speechSynthesis.speak(speak);
    };

    const nextCard = () => {
        if (cardIndex < cards.length - 1) {
            setCardIndex(cardIndex + 1);
            setIsFlipped(false);
        }
    };

    const prevCard = () => {
        if (cardIndex > 0) {
            setCardIndex(cardIndex - 1);
            setIsFlipped(false);
        }
    };

    return (
        <div className="flashcard-detail-page">

            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                navigation
                pagination={{ clickable: true }}
                loop
                className="banner-swiper"
            >
                {bannerImages.map((src, i) => (
                    <SwiperSlide key={i}>
                        <img src={src} alt="Banner" className="banner-img" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="breadcrumb">
                <Link to="/flashcard">Flashcard</Link> » {category.title}
            </div>

            <div className="detail-wrapper">

                <div className="sidebar">
                    {parts.map((name, index) => (
                        <div
                            key={index}
                            className={`sidebar-item ${activePart === index ? "active" : ""}`}
                            onClick={() => {
                                setActivePart(index);
                                setCardIndex(0);
                                setIsFlipped(false);
                            }}
                        >
                            {name}
                        </div>
                    ))}
                </div>

                <div className="card-area">
                    {cards.length > 0 ? (
                        <>
                            <div className="flashcard-box">

                                {!isFlipped ? (
                                    <>
                                        {currentCard.img && (
                                            <img src={currentCard.img} alt="" className="flashcard-img" />
                                        )}

                                        <button className="audio-btn" onClick={playAudio}>
                                            🔊
                                        </button>

                                        <h2 className="word">{currentCard.word}</h2>
                                        {currentCard.ipa && <p className="ipa">{currentCard.ipa}</p>}
                                    </>
                                ) : (
                                    <div className="meaning-box">
                                        <h2>{currentCard.meaning}</h2>
                                    </div>
                                )}

                                <button
                                    className="turn-btn"
                                    onClick={() => setIsFlipped(!isFlipped)}
                                >
                                    🔄 Turn
                                </button>
                            </div>

                            <div className="nav-card">
                                <button className="nav-btn" disabled={cardIndex === 0} onClick={prevCard}>
                                    ⬅
                                </button>

                                <span>Card {cardIndex + 1} / {cards.length}</span>

                                <button
                                    className="nav-btn"
                                    disabled={cardIndex === cards.length - 1}
                                    onClick={nextCard}
                                >
                                    ➡
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="no-card">Part này chưa có flashcard.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
