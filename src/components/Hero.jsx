import { motion } from "framer-motion";
import bg from "./assets/bg.png";
import iq from "./assets/iq.png";
import ds from "./assets/icons/ds.gif";
import discord from "./assets/icons/discord.png";
import linkedin from "./assets/icons/linkedin.png";
import telegram from "./assets/icons/tg.png";
import x from "./assets/icons/x.png";
import noise from "./assets/noise.png";
import logo from "./assets/logo.png";
import building from "./assets/building.png";
import { useEffect, useState } from "react";

export default function Hero({ onOpenForm }) {
    const targetDate = "2025-12-31T23:59:59"; // Set your target date here
    const [time, setTime] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const end = new Date(targetDate).getTime();
            const now = Date.now();
            const diff = end - now;

            if (diff <= 0) {
                clearInterval(interval);
                setTime({
                    days: "00",
                    hours: "00",
                    minutes: "00",
                    seconds: "00",
                });
                return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTime({
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    console.log(time);
    return (
        <div className="relative min-h-screen w-full overflow-hidden text-white font-[Inter]">

            {/* --- NEON PAGE BORDER --- */}
            <div className="pointer-events-none absolute inset-0 border-[3px] border-cyan-300/60 rounded-xl mix-blend-screen" />

            {/* --- BACKGROUND IMAGE --- */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-[1]"
                style={{ backgroundImage: `url(${bg})` }}
            />
            <div
                className="absolute inset-0 z-40 bg-cover bg-center "
                style={{ backgroundImage: `url(${noise})` }}
            />


            {/* --- DARK OVERLAY FOR DEPTH --- */}

            {/* --- TOP YELLOW RIBBON --- */}
            <div style={{ fontFamily: '"Fragment Mono", monospace' }} className="absolute -top-80 -right-200 lg:top-2 lg:-right-100 rotate-[35deg] lg:rotate-[15deg] bg-[#f5d415] text-black px-32 py-2 text-[14px] font-semibold tracking-wide shadow-[0_8px_20px_rgba(0,0,0,0.45)] whitespace-nowrap"
            >
                Ezzstar + Spica + Your Coin + Digital Identity + Metaverse + Social + Virtual + Web3 + Ezzstar + Spica + Your Coin + Digital Identity + Metaverse + Social + Virtual + Web3 Ezzstar + Spica + Your Coin + Digital Identity + Metaverse + Social + Virtual + Web3 + Ezzstar + Spica + Your Coin + Digital Identity + Metaverse + Social + Virtual + Web3
            </div>

            {/* ==== MAIN CENTER CONTENT ==== */}
            <div className="flex lg:flex-row z-50 justify-around lg:col-auto flex-col-reverse items-center min-h-screen px-6">
                <div className="flex flex-col right-13 bottom-6 lg:right-28 lg:bottom-5 relative justify-center items-center text-center px-6">
                    {/* Float-left Neon Logo */}
                    <motion.img
                        src={logo}
                        initial={{ opacity: 0, scale: 0.85, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-44 w-42 opacity-90 drop-shadow-0_0_40px_rgba 255,0,255,0.35)]"
                    />

                    {/* STACK EVERYTHING HERE */}
                    <div className="flex flex-col z-50 items-center gap-0">

                        <img src={ds} alt="" className="w-[400px] lg:w-[350px]" />

                        <div className="flex z-50">
                            <a target="_blank" href="https://discord.gg/sY3gsZVyeg">
                                <img src={discord} alt="" />
                            </a>
                            <a target="_blank" href="https://t.me/EzzstarSPCA">
                                <img src={telegram} alt="" />
                            </a>
                            <a target="_blank" href="https://x.com/ezzstarx?s=21">
                                <img src={x} alt="" />
                            </a>
                            <a target="_blank" href="https://www.linkedin.com/company/ezzstar/">
                                <img src={linkedin} alt="" />
                            </a>
                        </div>

                        <a href="/whitepaper.pdf" className="z-50 cursor-pointer" target="_blank" rel="noopener noreferrer">
                            <button
                                style={{ fontFamily: "'Tektur', sans-serif" }}
                                className="px-8 magic cursor-pointer py-2 text-xl border z-30 border-white/15 rounded-xl bg-white/5 backdrop-blur-md text-white/90 hover:bg-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.45)]"
                            >
                                Whitepaper
                            </button>
                        </a>
                        <div>
                            <p className="z-50 mt-6 text-xl" style={{ fontFamily: "'Tektur', monospace" }}>Featured On</p>
                            <a className="z-50" target="_blank" href="https://iq.wiki/">
                                <button
                                    className="px-4 magic2 cursor-pointer py-2 text-xl border z-30 border-white/15 rounded-xl bg-white/5 backdrop-blur-md text-white/90 hover:bg-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.45)] flex items-center justify-center"
                                >
                                    <img src={iq} alt="" className="w-20" />
                                </button>
                            </a>
                        </div>

                    </div>
                </div>


                {/* ==== RIGHT COUNTDOWN BOX ==== */}
                <div className="flex lg:right-20 absolute top-[3%] right-[5%] lg:relative lg:-top-60 flex-col justify-center items-center">
                    <div
                        style={{ fontFamily: "'Tektur', monospace" }}
                        className="magic border border-white/15 z-30 px-8 py-3 rounded-xl flex items-center gap-2"
                    >
                        <span className="text-white lg:text-2xl text-sm">{time.days}d</span> :
                        <span className="text-white lg:text-2xl text-sm">{time.hours}h</span> :
                        <span className="text-white lg:text-2xl text-sm">{time.minutes}m</span> :
                        <span className="text-white lg:text-2xl text-sm">{time.seconds}s</span>
                    </div>

                    <button style={{ fontFamily: "'Tektur', sans-serif" }} onClick={onOpenForm} className="lg:px-10  px-6 lg:text-xl text-md py-1 lg:py-2 z-40 mt-4 rounded-full text-white  tracking-wide opacity-95 hover:opacity-100 bg-gradient-to-r from-[#b04bff] via-[#c86bff] to-[#ff7bff] shadow-[0_0_40px_15px_rgba(200,80,255,0.45)] backdrop-blur-[2px]">
                        Join Whitelist
                    </button>
                </div>
            </div>
            {/* --- CYAN RIBBON BOTTOM RIGHT --- */}
            <div style={{ fontFamily: '"Fragment Mono", monospace' }} className="absolute z-40 bg-[#43d6ff] -bottom-60 -right-200 rotate-[-40deg] lg:bottom-10 lg:-right-70 lg:rotate-[-20deg]  text-black px-32 py-2 text-[14px] font-semibold tracking-wide whitespace-nowrap shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
                Social App + Metaverse + Ezzstar + Web3 Identity + Coin + Virtual World + Social App + Metaverse + Ezzstar + Web3 Identity + Coin + Virtual World + Social App + Metaverse + Ezzstar + Web3 Identity + Coin + Virtual World + Social App + Metaverse + Ezzstar + Web3 Identity + Coin + Virtual World +
            </div>

            {/* ==== BUILDING RIGHT ARTWORK ==== */}
            <motion.img src={building} alt="Cyber Building" className="z-30 absolute bottom-0 -right-20 w-[460px] md:w-[600px] lg:w-[630px] opacity-90 drop-shadow-[0_0_65px_#00eaff]" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} />
        </div>
    );
}
