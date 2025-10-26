import React, {ReactElement, useEffect} from "react";
import {APP_NAME} from "../constants/Global";
import {useTranslation} from "react-i18next";
import {Page} from "../components/Page";

const About: React.FC = (): ReactElement => {
    const {t} = useTranslation();

    useEffect(() => {
        document.title = t("apropos") + " - " + APP_NAME;
    }, [t]);

    return (
        <Page>
            <h2 className="mb-5">{t("about_title")}</h2>
            {(t("about_texts", {returnObjects: true}) as string[]).map((text: string, index: number) => (
                <p key={index} className="text-justify">{text}</p>
            ))}
        </Page>
    );
};

export default About;
