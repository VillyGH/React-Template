import React, {ReactElement, Suspense, useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ReactNotifications} from "react-notifications-component";
import {BASE_URL} from "../constants/Global";
import "../deps/css/index.css";
import "../deps/css/bootstrap.min.css";
import "../deps/css/mediaqueries.css";
import "react-notifications-component/dist/theme.css";
import 'animate.css';
import NavigationBar from "../components/NavigationBar";
import Index from "../pages/Index";
import About from "../pages/About";
import Footer from "../components/Footer";
import RouteNotFound from "../pages/RouteNotFound";
import {RoutesPath} from "../RoutesPath";
import {LoadingScreen} from "../components/LoadingScreen";
import {AnimatePresence} from "framer-motion";

export const Core: React.FC = (): ReactElement | null => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleDarkMode = (value: boolean): void => {
        setIsDarkMode(value);
    };

    return (
        <Suspense fallback={<LoadingScreen/>}>
            <Router future={{v7_relativeSplatPath: true}} basename={BASE_URL}>
                <NavigationBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
                <ReactNotifications/>
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route index element={<Index/>}/>
                        <Route path={RoutesPath.ABOUT} element={<About/>}/>
                        <Route path="*" element={<RouteNotFound/>}/>
                    </Routes>
                </AnimatePresence>
                <Footer/>
            </Router>
        </Suspense>
    );
};
