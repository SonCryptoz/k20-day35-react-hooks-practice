import { useContext } from "react";
import { formatPrice } from "../../utils/formatPrice";
import { CartContext } from "../../contexts/ShopContext";

const CartModal = ({ isOpen, onClose }) => {
    const { state, dispatch } = useContext(CartContext);
    const cartItems = state.items;

    const countTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            total += item.product.price * item.quantity;
            return total;
        }, 0);
    };

    const removeFromCart = (product) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: product,
        });
    };

    const updateQuantity = (product, amount) => {
        dispatch({
            type: "UPDATE_QUANTITY",
            payload: {
                id: product.id,
                amount,
            },
        });
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/40 px-4 py-24 sm:items-center sm:py-8"
            role="presentation"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <section
                role="dialog"
                aria-modal="true"
                aria-labelledby="cart-modal-title"
                className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3h2l.4 2m0 0h13.2l-1.6 8H7.1L5.4 5Zm2 8 1 5h9m-8 3h.01M17 18h.01"
                                />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">
                                Shopping bag
                            </p>
                            <h2
                                id="cart-modal-title"
                                className="mt-1 text-2xl font-black text-slate-950"
                            >
                                Giỏ hàng
                            </h2>
                        </div>
                    </div>
                    <button
                        type="button"
                        aria-label="Đóng giỏ hàng"
                        onClick={onClose}
                        className="rounded-lg cursor-pointer p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
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

                {cartItems.length > 0 ? (
                    <div className="grid lg:grid-cols-[1fr_260px]">
                        <div className="space-y-4 px-6 py-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-900">
                                    Sản phẩm đã chọn
                                </p>
                                <span className="text-sm text-slate-500">
                                    {cartItems.length}
                                </span>
                            </div>

                            <div className="divide-y divide-slate-100 max-h-105 overflow-y-scroll rounded-xl border border-slate-200">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="flex gap-4 p-4"
                                    >
                                        <img
                                            src={item.product.thumbnail}
                                            alt={item.product.name}
                                            className="h-20 w-20 rounded-lg object-cover"
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-bold uppercase tracking-wider text-amber-600">
                                                {item.product.category}
                                            </p>
                                            <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-5 text-slate-900">
                                                {item.product.name}
                                            </h3>
                                            <div className="mt-3 flex items-center justify-between gap-3">
                                                <span className="font-bold text-slate-900">
                                                    {formatPrice(
                                                        item.product.price * item.quantity,
                                                    )}
                                                </span>
                                                <div className="flex items-center rounded-lg border border-slate-200">
                                                    <button
                                                        type="button"
                                                        aria-label={`Giảm số lượng ${item.product.name}`}
                                                        className="px-2.5 py-1 text-slate-500 hover:bg-slate-50 cursor-pointer"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product,
                                                                -1,
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                    <span className="min-w-8 text-center text-sm font-semibold">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        aria-label={`Tăng số lượng ${item.product.name}`}
                                                        className="px-2.5 py-1 text-slate-500 hover:bg-slate-50 cursor-pointer"
                                                        onClick={() =>
                                                            updateQuantity(
                                                                item.product,
                                                                1,
                                                            )
                                                        }
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            aria-label={`Xóa ${item.product.name}`}
                                            className="self-start rounded-md cursor-pointer p-1 text-slate-400 hover:bg-red-50 hover:text-red-500"
                                            onClick={() =>
                                                removeFromCart(item.product)
                                            }
                                        >
                                            <svg
                                                aria-hidden="true"
                                                className="h-4 w-4"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 7h12m-9 0V5h6v2m-7 4v5m4-5v5m4-7-1 12H9L8 7"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside className="border-t border-slate-100 bg-slate-50 px-6 py-6 lg:border-l lg:border-t-0">
                            <p className="text-sm font-semibold text-slate-900">
                                Tóm tắt đơn hàng
                            </p>
                            <div className="mt-5 space-y-3 text-sm">
                                <div className="flex justify-between text-slate-500">
                                    <span>Tạm tính</span>
                                    <span>
                                        {formatPrice(countTotalPrice())}
                                    </span>
                                </div>
                                <div className="flex justify-between text-slate-500">
                                    <span>Phí vận chuyển</span>
                                    <span>Miễn phí</span>
                                </div>
                                <div className="flex justify-between border-t border-slate-200 pt-4 text-base font-bold text-slate-900">
                                    <span>Tổng cộng</span>
                                    <span>
                                        {formatPrice(countTotalPrice())}
                                    </span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="mt-6 w-full cursor-pointer rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-amber-600"
                            >
                                Tiến hành thanh toán
                            </button>
                            <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                                Bạn có thể kiểm tra lại đơn hàng ở bước tiếp
                                theo.
                            </p>
                        </aside>
                    </div>
                ) : (
                    <div className="flex flex-col items-center px-6 py-14 text-center sm:py-20">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                            <svg
                                aria-hidden="true"
                                className="h-10 w-10"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 3h2l.4 2m0 0h13.2l-1.6 8H7.1L5.4 5Zm2 8 1 5h9m-8 3h.01M17 18h.01"
                                />
                            </svg>
                        </div>
                        <h3 className="mt-6 text-xl font-black text-slate-950">
                            Giỏ hàng đang trống
                        </h3>
                        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                            Bạn chưa thêm sản phẩm nào. Hãy khám phá bộ sưu tập
                            và chọn món đồ phù hợp với mình.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="mt-7 rounded-xl cursor-pointer bg-slate-900 px-5 py-3 text-sm font-bold text-white transition hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-600/20"
                        >
                            Tiếp tục mua sắm
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default CartModal;
