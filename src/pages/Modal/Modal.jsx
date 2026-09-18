import { useImperativeHandle, useState } from "react";

const Modal = ({ ref }) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => {
        return {
            open() {
                setOpen(true);
            },
            close() {
                setOpen(false);
            },
        };
    }, []);

    return (
        open && (
            <div
                className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/40 px-4 py-24 sm:items-center sm:py-8"
            >
                <div className="absolute inset-0 bg-slate-950/45"></div>

                <section
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="terms-title"
                    className="relative mx-auto w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
                >
                    <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                                    Terms & conditions
                                </p>
                                <h1
                                    id="terms-title"
                                    className="mt-2 text-2xl font-black tracking-tight text-slate-950"
                                >
                                    Điều khoản sử dụng
                                </h1>
                            </div>
                            <button
                                type="button"
                                aria-label="Đóng modal"
                                className="rounded-lg cursor-pointer p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                                onClick={() => setOpen(false)}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        d="m6 6 12 12M18 6 6 18"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="space-y-4 px-6 py-6 text-sm leading-6 text-slate-600 sm:px-8">
                        <p>
                            Vui lòng đọc và xác nhận các điều khoản trước khi
                            tiếp tục sử dụng dịch vụ.
                        </p>
                        <div className="rounded-xl bg-slate-50 p-4">
                            <ul className="list-disc space-y-2 pl-5">
                                <li>
                                    Thông tin bạn cung cấp cần chính xác và được
                                    bảo mật.
                                </li>
                                <li>
                                    Sản phẩm và dịch vụ chỉ được sử dụng cho mục
                                    đích hợp pháp.
                                </li>
                                <li>
                                    Bạn đồng ý tuân thủ các chính sách hiện hành
                                    của chúng tôi.
                                </li>
                            </ul>
                        </div>
                        <p className="text-xs text-slate-400">
                            Bằng cách chọn “Đồng ý”, bạn xác nhận đã đọc và hiểu
                            nội dung trên.
                        </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
                        <button
                            type="button"
                            className="rounded-xl cursor-pointer border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                            onClick={() => setOpen(false)}
                        >
                            Đóng
                        </button>
                        <button
                            type="button"
                            className="rounded-xl cursor-pointer bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-600/20"
                            onClick={() => setOpen(false)}
                        >
                            Đồng ý
                        </button>
                    </div>
                </section>
            </div>
        )
    );
};

export default Modal;
