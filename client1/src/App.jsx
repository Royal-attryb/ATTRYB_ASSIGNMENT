import Header  from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage";
import { Routes, Route } from 'react-router-dom';

export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage /> } />
            </Routes>
            {/* <Footer /> */}
        </>
    );
}