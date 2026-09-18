import { useContext, useState } from "react";
import { NavLink } from "react-router";
import CartModal from "../../pages/Product/CartModal";
import { CartContext } from "../../contexts/ShopContext";

const navItems = [
    { to: "/", label: "Product", end: true },
    { to: "/audio", label: "Audio" },
    { to: "/modal", label: "Modal" },
];

const Header = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const { state } = useContext(CartContext);

    const cartCount = state.items.length;

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <NavLink
                    to="/"
                    className="text-xl font-bold tracking-tight text-slate-900"
                >
                    Hooks Lab
                </NavLink>

                <div className="flex items-center gap-3">
                    <nav aria-label="Main navigation" className="flex gap-2">
                        {navItems.map(({ to, label, end }) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
                                        isActive
                                            ? "bg-slate-900 text-white"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`
                                }
                            >
                                {label}
                            </NavLink>
                        ))}
                    </nav>

                    <button
                        type="button"
                        aria-label={`Mở giỏ hàng, ${cartCount} sản phẩm`}
                        onClick={() => setIsCartOpen(true)}
                        className="relative cursor-pointer rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                        <svg
                            aria-hidden="true"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l.4 2m0 0h13.2l-1.6 8H7.1L5.4 5Zm2 8 1 5h9m-8 3h.01M17 18h.01"
                            />
                        </svg>
                        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-white">
                            {cartCount}
                        </span>
                    </button>
                </div>
            </div>
            <CartModal
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
            />
        </header>
    );
};

export default Header;
