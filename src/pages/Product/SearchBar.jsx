const SearchBar = ({ value, onChange }) => {
    return (
        <label className="relative block w-full">
            <span className="sr-only">Tìm kiếm sản phẩm</span>
            <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.8"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.35-5.4a6.75 6.75 0 1 1-13.5 0 6.75 6.75 0 0 1 13.5 0Z" />
                </svg>
            </span>
            <input
                type="search"
                value={value}
                onChange={onChange}
                placeholder="Tìm theo tên sản phẩm..."
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10"
            />
        </label>
    );
};

export default SearchBar;
