import React, {ReactElement} from "react";

import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";

interface ComponentNavItemProps {
    label: string;
    link: string;
    onClick: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export const ComponentNavItem: React.FC<ComponentNavItemProps> = (props): ReactElement => {
    return (
        <LinkContainer to={props.link}>
            <Nav.Link onClick={props.onClick}>
                <div className="navItem">
                    {props.label}
                </div>
            </Nav.Link>
        </LinkContainer>
    );
};
