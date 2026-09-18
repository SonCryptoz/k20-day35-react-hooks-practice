import { useContext } from "react";
import { formatPrice } from "../../utils/formatPrice";
import { CartContext } from "../../contexts/ShopContext";

const ProductItems = ({ product, add }) => {
    const { state } = useContext(CartContext);
    
    const isInCart = state.items.some(
        (item) => item.product.id === product.id,
    );

    return (
        <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/70">
            <div className="aspect-4/3 overflow-hidden bg-slate-100">
                <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="space-y-4 p-5">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                        {product.category}
                    </span>
                    <h2 className="mt-2 min-h-14 text-lg font-bold leading-7 text-slate-900">
                        {product.name}
                    </h2>
                </div>
                <p className="line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                    {product.description}
                </p>
                <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                    <strong className="text-lg text-slate-900">
                        {formatPrice(product.price)}
                    </strong>
                    <button
                        type="button"
                        disabled={isInCart}
                        className={`rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-amber-600/20 ${
                            isInCart
                                ? "cursor-not-allowed bg-slate-200 text-slate-500"
                                : "cursor-pointer bg-slate-900 text-white hover:bg-amber-600"
                        }`}
                        onClick={add}
                    >
                        {isInCart ? "Đã thêm" : "Thêm vào giỏ"}
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ProductItems;
