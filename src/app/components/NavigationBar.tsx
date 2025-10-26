import React, {ReactElement, useEffect, useState, useCallback} from "react";
import {Button, Container, Offcanvas} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {LinkContainer} from "react-router-bootstrap";
import Logo from "../deps/images/logo.png";
import LogoDark from "../deps/images/logoDark.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {RoutesPath} from "../RoutesPath";
import {ComponentNavItem as NavItem} from "./ComponentNavItem";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";

interface Props {
    isDarkMode: boolean;
    toggleDarkMode: (value: boolean) => void;
}

const NavigationBar: React.FC<Props> = ({isDarkMode, toggleDarkMode}): ReactElement | null => {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = useState<"fr" | "en">("fr");
    const [showModal, setShowModal] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        const init = async (): Promise<void> => {
            const userTheme = localStorage.getItem("theme");
            const dark = userTheme ? userTheme === "dark" : (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
            changeTheme(dark);

            const userLang = navigator.language ? navigator.language.slice(0, 2) : null;
            if (userLang === "fr" || userLang === "en") {
                await changeLanguage(userLang);
            }
        };
        init().catch((error) => console.error(t("translation_error"), error));
    }, []);

    useEffect(() => {
        setShowModal(false);
    }, [location]);

    const changeLanguage = useCallback(async (lang: "fr" | "en"): Promise<void> => {
        await i18n.changeLanguage(lang);
        setLanguage(lang);
    }, [i18n]);

    const changeTheme = useCallback((currentMode: boolean): void => {
        toggleDarkMode(currentMode);
        document.documentElement.setAttribute("data-bs-theme", currentMode ? "dark" : "light");
        localStorage.setItem("theme", currentMode ? "dark" : "light");
    }, [toggleDarkMode]);

    const generalLinks = (): ReactElement => (
        <Nav className="mx-auto" variant="underline">
            <NavItem link={RoutesPath.ABOUT} label={t("about")} onClick={() => setShowModal(false)}/>
        </Nav>
    );

    const otherButtons = (): ReactElement => (
        <>
            <Button className="me-3" onClick={async (): Promise<void> =>
                await changeLanguage(language === "fr" ? "en" : "fr")}>
                {language === "fr" ? "EN" : "FR"}
            </Button>
            <Button className="me-3" onClick={async (): Promise<void> =>
                changeTheme(!isDarkMode)}>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon}/>
            </Button>
        </>
    );

    return (
        <Navbar expand="xl" fixed="top">
            <Container fluid={true} className="d-flex align-items-center position-relative">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img className="me-3" src={isDarkMode ? Logo : LogoDark} alt="Logo" width={80} height={60}/>
                    </Navbar.Brand>
                </LinkContainer>
                <div className="d-none position-absolute start-50 translate-middle-x d-xl-flex">
                    {generalLinks()}
                </div>
                <div>
                    <div className="d-xl-none d-inline">
                        {otherButtons()}
                    </div>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShowModal(true)}/>
                </div>
                <Navbar.Offcanvas show={showModal} onHide={() => setShowModal(false)}
                                  id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            <LinkContainer to="/" onClick={() => setShowModal(false)}>
                                <img className="me-3" src={isDarkMode ? Logo : LogoDark} alt="Logo" width={80} height={60}/>
                            </LinkContainer>
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className="d-xl-none d-flex flex-column align-items-center w-100 gap-4">
                            {generalLinks()}
                        </div>
                        <div
                            className="ms-xl-auto flex-xl-row d-flex gap-4 gap-xl-3 justify-content-center align-items-center flex-column mt-xl-0 mt-4">
                            <div className="d-xl-flex d-none">
                                {otherButtons()}
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
