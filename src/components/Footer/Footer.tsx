import React from "react";

function Footer() {
    const today = new Date();
    const year = today.getFullYear();

    return (
        <footer>
            <div className="text-center my-10">Copyright &copy; CartPe {year}</div>
        </footer>
    );
}

export default Footer;
