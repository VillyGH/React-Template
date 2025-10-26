import React, {useEffect} from "react";
import {APP_NAME} from "../constants/Global";
import Logo from "../deps/images/logo.png";
import LogoDark from "../deps/images/logoDark.png";
import {useTranslation} from "react-i18next";
import {Page} from "../components/Page";
import {isDarkMode as appIsDarkMode} from "../core/Application";

const Index: React.FC = () => {
    const {t} = useTranslation();

    useEffect(() => {
        document.title = t("index") + ' - ' + APP_NAME;
    }, [t]);

    return (
        <Page>
            <div className="text-center">
                <img className="me-3" src={appIsDarkMode() ? Logo : LogoDark}
                     alt={`Logo ${APP_NAME}`} width={300} height={250}/>
                <h1>{t("index_title")}</h1>
                <div className="my-4">{t("index_subtitle")}</div>
            </div>
        </Page>
    );
};

export default Index;
