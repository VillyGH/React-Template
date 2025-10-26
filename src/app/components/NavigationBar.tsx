import React, {ReactElement, useEffect, useState} from "react";
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
import {Application} from "../core/Application";
import {useTranslation} from "react-i18next";

interface Props {
    isDarkMode: boolean;
    toggleDarkMode: (value: boolean) => void;
}

const NavigationBar: React.FC<Props> = ({isDarkMode, toggleDarkMode}): ReactElement | null => {
    const {t, i18n} = useTranslation();
    const [language, setLanguage] = useState<"fr" | "en">("fr");
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        const init = async () => {
            const userTheme: string | null = localStorage.getItem("theme");
            const userLangage: string | null = navigator.language;
            let dark = false;

            if (userTheme) {
                dark = userTheme === "dark";
            } else {
                const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
                if (darkModeQuery !== undefined) {
                    dark = darkModeQuery.matches;
                }
            }
            await changeTheme(dark);
            if (userLangage === "fr" || userLangage === "en") {
                await changeLanguage(userLangage);
            }
        };
        init();
    }, []);

    const changeLanguage = async (lang: "fr" | "en"): Promise<void> => {
        setLanguage(lang);
        await i18n.changeLanguage(lang);
    };

    const changeTheme = async (currentMode: boolean): Promise<void> => {
        toggleDarkMode(currentMode);
        document.documentElement.setAttribute("data-bs-theme", currentMode ? "dark" : "light");
        localStorage.setItem("theme", currentMode ? "dark" : "light");
        toggleDarkMode(currentMode);
    };

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
                await changeTheme(!isDarkMode)}>
                <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon}/>
            </Button>
        </>
    );

    return (
        <Navbar expand="xl" fixed="top">
            <Container fluid={true} className="d-flex align-items-center position-relative">
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img className="me-3" src={Application.isDarkMode() ? Logo : LogoDark} alt="Logo"
                             width={80} height={60}/>
                    </Navbar.Brand>
                </LinkContainer>
                <div className="d-none position-absolute start-50 translate-middle-x d-xl-flex">
                    {generalLinks()}
                </div>
                <div>
                    <div className="d-xl-none d-inline">
                        {otherButtons()}
                    </div>
                    <Navbar.Toggle aria-controls="offcanvasNavbar"
                                   onClick={() => setShowModal(true)}/>
                </div>
                <Navbar.Offcanvas show={showModal} onHide={() => setShowModal(false)}
                                  id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            <LinkContainer to="/" onClick={() => setShowModal(false)}>
                                <img className="me-3" src={Application.isDarkMode() ? Logo : LogoDark} alt="Logo"
                                     width={80} height={60}/>
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
