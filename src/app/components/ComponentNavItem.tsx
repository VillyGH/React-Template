import React, {ReactElement} from "react";

import Nav from "react-bootstrap/Nav";
import {LinkContainer} from "react-router-bootstrap";

interface ComponentNavItemProps {
    label: string;
    link: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const ComponentNavItemInner: React.FC<ComponentNavItemProps> = (props): ReactElement => {
    const {label, link, onClick} = props;
    return (
        <LinkContainer to={link}>
            <Nav.Link onClick={onClick}>
                <div className="navItem">
                    {label}
                </div>
            </Nav.Link>
        </LinkContainer>
    );
};

export const ComponentNavItem = React.memo(ComponentNavItemInner) as React.FC<ComponentNavItemProps>;
