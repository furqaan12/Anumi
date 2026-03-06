'use client';

import { useState, useTransition } from 'react';
import { joinWaitlist } from '../actions/subscribe';
import Video from 'next-video';
import { Cormorant_Garamond, Playfair_Display, Spectral } from 'next/font/google';

import localFont from 'next/font/local';

// Initialize the fonts
const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700'],
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    display: 'swap',
});

const spectral = Spectral({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
    display: 'swap',
});

const gtAmerica = localFont({
    src: '../../public/fonts/GT-America-Mono-Regular.ttf',
    variable: '--font-gt-america',
});

const justBreathe = localFont({
    src: '../../public/fonts/JustBreathe.otf',
    variable: '--font-just-breathe',
});

const mabryPro = localFont({
    src: '../../public/fonts/MabryPro-Regular.ttf',
    variable: '--font-mabry-pro',
});

const fonts = [
    { name: 'Cormorant Garamond', font: cormorant },
    { name: 'Playfair Display', font: playfair },
    { name: 'Spectral', font: spectral },
    { name: 'GT America Mono', font: gtAmerica },
    { name: 'Just Breathe', font: justBreathe },
    { name: 'Mabry Pro', font: mabryPro },
];

export default function Home() {
    const [fontIndex, setFontIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(true);
    const [fontColor, setFontColor] = useState('#ffffff');
    const [isSideBySide, setIsSideBySide] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(true);
    const [showSubtext, setShowSubtext] = useState(true);
    const currentFont = fonts[fontIndex];

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isPending, startTransition] = useTransition();

    const cycleFont = () => {
        setFontIndex((prev) => (prev + 1) % fonts.length);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setIsError(false);

        startTransition(async () => {
            const formData = new FormData();
            formData.append('email', email);

            const result = await joinWaitlist(formData);

            if (result.error) {
                setMessage(result.error);
                setIsError(true);
            } else {
                setMessage(result.message || 'You are on the list!');
                setIsError(false);
                setEmail('');
            }
        });
    };

    return (
        <div className={`relative w-full min-h-[100dvh] overflow-x-hidden bg-black ${currentFont.font.className}`}>

            {/* Controls */}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-2">
                <button
                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                    className="mb-2 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-xs uppercase tracking-wider hover:bg-white/20 transition-all font-sans shadow-lg"
                >
                    {isPanelOpen ? 'Hide Controls' : 'Show Controls'}
                </button>

                {isPanelOpen && (
                    <div className="flex flex-col items-end gap-2 p-4 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300">
                        {/* Layout Toggle */}
                        <button
                            onClick={() => setIsSideBySide(!isSideBySide)}
                            className="w-full flex justify-between items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all font-sans tracking-wide"
                        >
                            <span className="text-white/60 text-xs uppercase">Layout</span>
                            <span className="font-bold">{isSideBySide ? 'Side-by-Side' : 'Stacked'}</span>
                        </button>

                        <div className="w-full h-px bg-white/10 my-1" />

                        {/* Color Input */}
                        <div className="w-full flex justify-between items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
                            <span className="text-xs text-white/60 font-sans uppercase tracking-wider">Color</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={fontColor}
                                    onChange={(e) => setFontColor(e.target.value)}
                                    className="w-16 bg-transparent text-white text-right text-sm font-mono border-none focus:outline-none uppercase"
                                    placeholder="#ffffff"
                                />
                                <div className="w-4 h-4 rounded-full border border-white/20 shrink-0 shadow-[0_0_10px_rgba(255,255,255,0.2)]" style={{ backgroundColor: fontColor }} />
                            </div>
                        </div>

                        {/* Video Toggle */}
                        <button
                            onClick={() => setShowVideo(!showVideo)}
                            className="w-full flex justify-between items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all font-sans tracking-wide"
                        >
                            <span className="text-white/60 text-xs uppercase">Video</span>
                            <span className="font-bold">{showVideo ? 'ON' : 'OFF'}</span>
                        </button>

                        {/* Font Toggle */}
                        <button
                            onClick={cycleFont}
                            className="w-full flex justify-between items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all font-sans tracking-wide text-left"
                        >
                            <span className="text-white/60 text-xs uppercase whitespace-nowrap">Font</span>
                            <span className="font-bold truncate">{currentFont.name}</span>
                        </button>

                        <div className="w-full h-px bg-white/10 my-1" />

                        {/* Subtext Toggle */}
                        <button
                            onClick={() => setShowSubtext(!showSubtext)}
                            className="w-full flex justify-between items-center gap-4 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm hover:bg-white/10 transition-all font-sans tracking-wide"
                        >
                            <span className="text-white/60 text-xs uppercase">Subtext</span>
                            <span className="font-bold">{showSubtext ? 'Show' : 'Hide'}</span>
                        </button>
                    </div>
                )}
            </div>

            {showVideo && (
                <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                    <Video
                        src="https://stream.mux.com/t8Vw1Z02glTxEv900XDjCc2TZwpfhSzDd402blMmMbjZHs.m3u8"
                        autoPlay
                        loop
                        muted
                        playsInline
                        // @ts-ignore
                        controls={false}
                        className="w-full h-full object-cover"
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'cover',
                            '--media-object-fit': 'cover',
                            '--media-loading-indicator': 'none',
                            '--media-play-button-display': 'none',
                            '--media-center-play-button-display': 'none',
                        } as any}
                    />
                </div>
            )}

            <div
                className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="absolute top-8 left-0 w-full flex justify-center z-20">
                <h2 className="text-2xl tracking-widest uppercase opacity-80" style={{ fontFamily: 'var(--font-booton)', color: fontColor }}>anumi</h2>
            </div>

            <div className={`relative z-10 min-h-[100dvh] flex flex-col items-center justify-center px-6 py-32 transition-all duration-500 ${isSideBySide ? 'max-w-[1400px] mx-auto' : ''}`}>
                <div className={`w-full max-w-5xl mx-auto transition-all duration-500 ease-in-out ${isSideBySide ? 'flex flex-col lg:flex-row items-center justify-between text-left gap-12 lg:gap-16' : 'flex flex-col items-center text-center'}`}>

                    <div className={`transition-all duration-500 ${isSideBySide ? 'w-full lg:flex-1' : 'w-full'}`}>
                        <h1
                            className="text-xl leading-[1.2] tracking-tight md:text-3xl lg:text-4xl xl:text-5xl"
                            style={{ color: fontColor }}
                        >
                            India, it’s time to regulate
                            <br />
                            <span>
                                your nervous system.
                            </span>
                        </h1>
                    </div>

                    <div className={`transition-all duration-500 ${isSideBySide ? 'w-full lg:flex-1 lg:border-l lg:pl-12 lg:border-white/10 mt-8 lg:mt-0' : 'w-full mt-8'}`}>
                        <p
                            className={`text-xl leading-relaxed md:text-2xl transition-all duration-500 ${isSideBySide ? '' : 'text-center'}`}
                            style={{ color: fontColor }}
                        >
                            Science-based. Not spiritual.
                            {isSideBySide ? <span className="hidden lg:inline"> </span> : <br />}
                            {isSideBySide ? <span className="lg:hidden"><br /></span> : null}
                            Anumi is a modern recovery space for people who take their mental and nervous system health seriously. We bring together a small, intentional community around evidence-backed breathwork and regulation practices, designed to help you reset your body, reduce chronic stress, and build real emotional resilience. This isn’t mass wellness. It’s a space for people who want to do the work properly.
                        </p>
                    </div>
                </div>

                <div className="mt-12 w-full max-w-md mx-auto">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#ff6e40] focus:bg-white/20 transition-all backdrop-blur-sm"
                            />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff6e40] to-[#f89b3f] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                        </div>

                        <button
                            disabled={isPending}
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-full bg-transparent px-8 py-3 text-base transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                            style={{ color: fontColor, borderColor: fontColor }}
                        >
                            <span className="relative z-10 flex flex-col items-center justify-center">
                                <span className="font-bold tracking-widest leading-tight">
                                    {isPending ? 'JOINING...' : 'JOIN THE CLUB'}
                                </span>
                                {showSubtext && (
                                    <span className="text-[10px] italic font-normal opacity-80 lowercase tracking-wide mt-0.5">
                                        early members only
                                    </span>
                                )}
                            </span>
                        </button>

                        {message && (
                            <p className={`text-base font-medium tracking-wide ${isError ? 'text-[#ff6e40]' : 'text-[#fab76a]'}`}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
