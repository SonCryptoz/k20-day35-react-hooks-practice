import { useRef, useState } from "react";
import { formatTime } from "./helpers/formatTime";

const AudioPage = () => {
    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false);

    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const isSeekingRef = useRef(false);
    const audioRef = useRef(null);

    // Khi audio tải xong metadata -> lấy tổng thời gian
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    // Audio đang chạy cập nhật thời gian hiện tại liên tục
    const handleTimeUpdate = () => {
        if (!isSeekingRef.current && audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleStartSeek = () => {
        isSeekingRef.current = true;
    };

    const handleEndSeek = (e) => {
        const seekTime = Number(e.target.value);
        if (audioRef.current) {
            audioRef.current.currentTime = seekTime;
        }
        isSeekingRef.current = false;
    };

    // Người dùng kéo thanh trượt để tua
    const handleSeeking = (e) => {
        setCurrentTime(Number(e.target.value));
    };

    // Hết bài hát reset
    const handleEnded = () => {
        setPlay(false);
        setCurrentTime(0);
        audioRef.current.currentTime = 0;
    };

    // Hàm Play/Pause
    const handleMusic = () => {
        if (!play) {
            audioRef.current.play();
            setPlay(true);
        } else {
            audioRef.current.pause();
            setPlay(false);
        }
    };

    // Mute/Unmute
    const handleMute = () => {
        audioRef.current.muted = !mute;
        setMute(!mute);
    };

    // Volume
    const handleVolume = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <section className="overflow-hidden rounded-2xl bg-[#17212b] text-white shadow-xl shadow-slate-200/60">
            <audio
                className="hidden"
                preload="metadata"
                ref={audioRef}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
            >
                <source src="/media/me.mp3" type="audio/mp3" />
                Trình duyệt của bạn không hỗ trợ thẻ audio.
            </audio>

            <div className="grid lg:grid-cols-[280px_1fr]">
                <div className="relative min-h-72 overflow-hidden bg-amber-500 p-6 sm:min-h-80">
                    <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border-24 border-white/15"></div>
                    <div className="absolute -bottom-20 -left-16 h-56 w-56 rounded-full border-32 border-slate-950/10"></div>
                    <div className="relative flex h-full flex-col justify-between">
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-950/60">
                            Now playing
                        </span>
                        <div className="flex items-center justify-center py-8">
                            <div className="flex h-40 w-40 items-center justify-center rounded-full border-14 border-slate-950/80 bg-slate-900 shadow-2xl">
                                <div className="h-12 w-12 rounded-full border-8 border-amber-400 bg-slate-950"></div>
                            </div>
                        </div>
                        <div>
                            <span className="text-sm font-semibold text-slate-950/60">
                                01 / 08
                            </span>
                            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-950/20">
                                <div className="h-full w-1/3 rounded-full bg-slate-950"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
                            Focus session
                        </p>
                        <h1 className="mt-3 max-w-lg text-3xl font-black tracking-tight sm:text-4xl">
                            hate that i made you love me - Ariana Grande
                        </h1>
                        <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
                            Một không gian nhỏ để luyện tập điều khiển audio
                            bằng React ref.
                        </p>
                    </div>

                    <div className="mt-10">
                        <div className="h-2 rounded-full">
                            <input
                                type="range"
                                min={0}
                                max={duration || 0}
                                value={currentTime}
                                onMouseDown={handleStartSeek}
                                onTouchStart={handleStartSeek}
                                onChange={handleSeeking}
                                onMouseUp={handleEndSeek}
                                onTouchEnd={handleEndSeek}
                                className="w-full cursor-pointer accent-orange-500"
                            />

                            <div className="flex justify-between text-xs text-slate-300">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        <div className="mt-8 flex items-center justify-between gap-4">
                            <button
                                type="button"
                                aria-label="Tắt âm thanh"
                                className="rounded-full cursor-pointer p-3 text-slate-300 transition hover:bg-white/10 hover:text-white"
                                onClick={handleMute}
                            >
                                {mute ? "Unmute" : "Mute"}
                            </button>
                            <button
                                type="button"
                                className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20 transition hover:scale-105 hover:bg-amber-300"
                                aria-label="Phát audio"
                                onClick={handleMusic}
                            >
                                {play ? "Pause" : "Play"}
                            </button>
                            <label className="flex items-center gap-3 text-xs text-slate-400">
                                <span className="sr-only">Âm lượng</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    value={volume}
                                    onChange={handleVolume}
                                    step="0.01"
                                    defaultValue="1"
                                    className="w-24 cursor-pointer accent-amber-400 sm:w-32"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AudioPage;
