import React from "react";
import Navbar from "./NavBar";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col">
            <Navbar />
            <main className="flex-grow">{children}</main> {/* Adjusted padding-top */}
        </div>
    );
};

export default Layout;
