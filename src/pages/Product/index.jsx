import { useContext } from "react";
import useDebounce from "../../hooks/useDebounce";
import SearchBar from "./SearchBar";
import { products } from "../../data/products";
import ProductItems from "./ProductItems";
import { CartContext } from "../../contexts/ShopContext";

const ProductPage = () => {
    const { state, dispatch } = useContext(CartContext);

    const { category, keyword } = state.filter;

    const productValue = useDebounce(keyword, 500);

    const categories = [
        "Tất cả",
        ...new Set(products.map((product) => product.category)),
    ];

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name
            .toLowerCase()
            .includes(productValue.toLowerCase());

        const matchesCategory =
            category === "Tất cả" || product.category === category;

        return matchesSearch && matchesCategory;
    });

    const setFilter = (item) => {
        dispatch({
            type: "SET_FILTER",
            payload: {
                category: item
            }
        })
    }

    const setValue = (e) => {
        dispatch({
            type: "SET_FILTER",
            payload: {
                keyword: e.target.value,
            }
        });
    }

    const addToCart = (product) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: product,
        });
        alert(`Đã thêm ${product.name} vào giỏ hàng`);
    };

    return (
        <section className="space-y-8">
            <div className="flex flex-col gap-5 border-b border-slate-100 pb-8 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-600">
                        Curated essentials
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                        Sản phẩm nổi bật
                    </h1>
                    <p className="mt-3 max-w-xl text-slate-500">
                        Những thiết bị được chọn cho góc làm việc, giải trí và
                        cuộc sống hiện đại.
                    </p>
                </div>
                <div className="w-full lg:max-w-sm">
                    <SearchBar value={keyword} onChange={setValue} />
                </div>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div
                    className="flex flex-wrap gap-2"
                    aria-label="Lọc theo danh mục"
                >
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setFilter(item)}
                            className={`rounded-full px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                                category === item
                                    ? "bg-slate-900 text-white"
                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <p className="text-sm text-slate-500">
                    {filteredProducts.length} sản phẩm
                </p>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {filteredProducts.map((product) => (
                        <ProductItems
                            key={product.id}
                            product={product}
                            add={() => addToCart(product)}
                        />
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 px-6 py-16 text-center">
                    <h2 className="text-lg font-bold text-slate-900">
                        Không tìm thấy sản phẩm
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Hãy thử từ khóa khác hoặc chọn lại danh mục.
                    </p>
                </div>
            )}
        </section>
    );
};

export default ProductPage;
