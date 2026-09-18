import { useRef } from "react";
import Modal from "./Modal";

const ModalPage = () => {
    const modalRef = useRef(null);

    const handleOpenModal = () => {
        modalRef.current.open();
    };

    return (
        <section className="relative overflow-hidden rounded-2xl bg-[#17212b] text-white shadow-xl shadow-slate-200/60">
            <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border-40 border-amber-400/15"></div>
            <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border-48 border-white/5"></div>

            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-14">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-amber-300">
                        <span className="h-2 w-2 rounded-full bg-amber-400" />
                        React patterns
                    </div>
                    <h1 className="mt-6 max-w-2xl text-4xl font-black tracking-tight sm:text-5xl">
                        Modal rõ ràng,
                        <span className="block text-amber-400">kiểm soát chủ động.</span>
                    </h1>
                    <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                        Thực hành useImperativeHandle để component cha chỉ gọi
                        đúng những hành động mà modal cho phép expose.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                            type="button"
                            onClick={handleOpenModal}
                            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300 focus:outline-none focus:ring-4 focus:ring-amber-400/30"
                        >
                            Mở điều khoản
                        </button>
                        <span className="inline-flex items-center justify-center rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-slate-300">
                            Ref-powered dialog
                        </span>
                    </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur-sm sm:p-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-5">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                                Component status
                            </p>
                            <h2 className="mt-2 text-xl font-bold">Terms modal</h2>
                        </div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
                            ✓
                        </span>
                    </div>
                    <div className="space-y-4 py-5">
                        <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/15 text-sm text-amber-300">01</span>
                            <div>
                                <p className="text-sm font-semibold">Controlled visibility</p>
                                <p className="text-xs text-slate-400">Open and close from the parent</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/15 text-sm text-amber-300">02</span>
                            <div>
                                <p className="text-sm font-semibold">Minimal public API</p>
                                <p className="text-xs text-slate-400">Only expose the actions you need</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400/15 text-sm text-amber-300">03</span>
                            <div>
                                <p className="text-sm font-semibold">Accessible structure</p>
                                <p className="text-xs text-slate-400">Dialog labels and clear actions</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-slate-950/30 px-4 py-3 text-xs leading-5 text-slate-400">
                        Ready to review. Open the modal to inspect the terms.
                    </div>
                </div>
            </div>
            <Modal ref={modalRef} />
        </section>
    );
};

export default ModalPage;
