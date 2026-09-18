import { Route, Routes } from "react-router";
import DefaultLayout from "./layouts/DefaultLayout";
import AudioPage from "./pages/Audio";
import ModalPage from "./pages/Modal";
import ProductPage from "./pages/Product";
import CartProvider from "./contexts/ShopContext";

function App() {
    return (
        <CartProvider>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<ProductPage />} />
                    <Route path="audio" element={<AudioPage />} />
                    <Route path="modal" element={<ModalPage />} />
                </Route>
            </Routes>
        </CartProvider>
    );
}

export default App;
