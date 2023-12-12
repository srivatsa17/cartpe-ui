import {
    Badge,
    Image,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    Tooltip
} from "@nextui-org/react";
import { CART_SCREEN, HOME_SCREEN, WISHLIST_SCREEN } from "constants/routes";

import { CARTPE_LOGO_BLACK } from "constants/images";
import { CartIcon } from "icons/CartIcon";
import CategoryMegaMenu from "./CategoryMegaMenu";
import { HeartIcon } from "icons/HeartIcon";
import Profile from "./Profile";
import React from "react";
import SearchBar from "./SearchBar";

function NavBar() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent justify="start">
                {/* Hide the menu toggle switch for lg and bigger screens */}
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="lg:hidden"
                />
                <Link href={HOME_SCREEN}>
                    <NavbarBrand>
                        <Image src={CARTPE_LOGO_BLACK} height="36" width="100" />
                    </NavbarBrand>
                </Link>
            </NavbarContent>

            {/* Show Category menu only for large screen. Else it will be part of sidebar. */}
            <NavbarContent justify="center" className="hidden lg:flex gap-4">
                <CategoryMegaMenu />
            </NavbarContent>

            {/* Don't show searchbar for xs screens. */}
            <NavbarContent justify="center" className="hidden sm:flex ml-4">
                <SearchBar />
            </NavbarContent>

            <NavbarContent justify="end">
                <Profile />

                <Tooltip content="Wishlist" color="foreground">
                    <Link
                        href={WISHLIST_SCREEN}
                        underline="none"
                        color="foreground"
                        className="ml-2"
                    >
                        <HeartIcon size={25} width={0} height={0} />
                    </Link>
                </Tooltip>

                <Tooltip content="Cart" color="foreground">
                    <Link href={CART_SCREEN} underline="none" color="foreground">
                        <Badge color="danger" content={0} isInvisible={false} shape="circle">
                            <CartIcon size={25} width={25} height={25} />
                        </Badge>
                    </Link>
                </Tooltip>
            </NavbarContent>

            <NavbarMenu>
                <CategoryMegaMenu />
            </NavbarMenu>
        </Navbar>
    );
}

export default NavBar;
