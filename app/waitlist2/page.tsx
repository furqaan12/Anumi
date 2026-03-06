'use client';


import { useState, useTransition } from 'react';
import { joinWaitlist } from '../actions/subscribe';

import Video from 'next-video';

export default function Waitlist2() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);
    const [isPending, startTransition] = useTransition();

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
        <div className="relative w-full h-[100dvh] overflow-hidden bg-black">
            <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
                <Video
                    src="https://stream.mux.com/zC4AoesyzWjZMBolV12lwj9PmaWnCnYCP02IPP013HgG00.m3u8"
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

            <div
                className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            <div className="absolute top-8 left-0 w-full flex justify-center z-20">
                <h2 className="text-2xl text-white tracking-widest uppercase opacity-80" style={{ fontFamily: 'var(--font-booton)' }}>anumi</h2>
            </div>

            <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-xl leading-[1.2] tracking-tight text-white md:text-3xl lg:text-4xl xl:text-5xl" style={{ fontFamily: 'var(--font-gt-america), "GT America Mono Regular Placeholder", monospace' }}>
                        India, it’s time to regulate
                        <br />
                        <span className="text-white">
                            your nervous system.
                        </span>
                    </h1>

                    <p className="mt-8 text-xl leading-relaxed text-white/90 md:text-2xl" style={{ fontFamily: 'var(--font-gt-america), "GT America Mono Regular Placeholder", monospace' }}>
                        Modern breathwork and nervous system practices
                        <br />
                        for calmer, healthier living.
                    </p>

                    <div className="mt-12 w-full max-w-md mx-auto">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="relative group">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    style={{ fontFamily: 'var(--font-gt-america), "GT America Mono Regular Placeholder", monospace' }}
                                    className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-[#ff6e40] focus:bg-white/20 transition-all backdrop-blur-sm"
                                />
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff6e40] to-[#f89b3f] opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                            </div>

                            <button
                                disabled={isPending}
                                type="submit"
                                style={{ fontFamily: 'var(--font-gt-america), "GT America Mono Regular Placeholder", monospace' }}
                                className="group relative w-full overflow-hidden rounded-full bg-transparent px-8 py-4 text-base font-bold tracking-widest text-white transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                            >
                                <span className="relative z-10">
                                    {isPending ? 'JOINING...' : 'JOIN WAITLIST'}
                                </span>
                            </button>

                            {message && (
                                <p className={`text-base font-medium tracking-wide ${isError ? 'text-[#ff6e40]' : 'text-[#fab76a]'}`} style={{ fontFamily: 'var(--font-gt-america), "GT America Mono Regular Placeholder", monospace' }}>
                                    {message}
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
