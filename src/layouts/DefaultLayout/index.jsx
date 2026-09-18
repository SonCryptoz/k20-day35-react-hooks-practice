import { Outlet } from "react-router";
import Header from "./Header";

const DefaultLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DefaultLayout;
