import { header } from "data/data.header";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Nav } from "./Nav/Nav";
import { navItem } from "data/data.header";
import { CartContext } from "pages/_app";
import { AuthContext } from "context/authProvider";

export const Header = () => {
    const { cart } = useContext(CartContext);
    const { auth } = useContext(AuthContext);
    const [fixedNav, setFixedNav] = useState(false);

    // For Fixed nav
    // useEffect(() => {
    //     window.addEventListener("scroll", isSticky);
    //     return () => {
    //         window.removeEventListener("scroll", isSticky);
    //     };
    // });

    // const isSticky = () => {
    //     const scrollTop = window.scrollY;
    //     if (scrollTop > 10) {
    //         setFixedNav(true);
    //     } else {
    //         setFixedNav(false);
    //     }
    // };
    return (
        <>
            {/* <!-- BEGIN HEADER --> */}
            <header className="header">
                <div className={`header-content ${fixedNav ? "fixed" : ""}`}>
                    <div className="header-logo">
                        <Link href="/">
                            <a>
                                <img
                                    src={header.logo}
                                    alt=""
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: "50%",
                                    }}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="header-box">
                        {/* Nav */}
                        <Nav navItem={navItem} />
                        {/* header options */}
                        <ul className="header-options">
                            {/* <li>
                                <Link href="/faq">
                                    <a>
                                        <i className="icon-search"></i>
                                    </a>
                                </Link>
                            </li> */}
                            {auth ? (
                                <li>
                                    <Link href="/profile">
                                        <a>
                                            <i className="icon-user"></i>
                                            <p
                                                style={{
                                                    color: "#FFF",
                                                    marginLeft: 5,
                                                }}
                                            >
                                                {auth.name}
                                            </p>
                                        </a>
                                    </Link>
                                </li>
                            ) : (
                                <li>
                                    <Link href="/login">
                                        <a>
                                            <i className="icon-user"></i>
                                        </a>
                                    </Link>
                                </li>
                            )}
                            {/* <li>
                                <Link href="/wishlist">
                                    <a>
                                        <i className="icon-heart"></i>
                                    </a>
                                </Link>
                            </li> */}
                            <li>
                                <Link href="/cart">
                                    <a>
                                        <i className="icon-cart"></i>
                                        <span>{cart.length ?? "0"}</span>
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="btn-menu js-btn-menu">
                        {[1, 2, 3].map((i) => (
                            <span key={i}>&nbsp;</span>
                        ))}
                    </div>
                </div>
            </header>

            {/* <!-- HEADER EOF   --> */}
        </>
    );
};
