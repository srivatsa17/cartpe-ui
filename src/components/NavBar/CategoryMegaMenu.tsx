import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownSection,
    DropdownTrigger,
    NavbarItem
} from "@nextui-org/react";

import { ChevronDown } from "icons/ChevronDown";
import React from "react";
import { categoryDropDown } from "./CategoryMegaMenuData";

function CategoryMegaMenu() {
    return (
        <React.Fragment>
            {categoryDropDown.map((category) => {
                return (
                    <Dropdown key={category.key} placement="bottom-start">
                        <NavbarItem>
                            <DropdownTrigger>
                                <Button
                                    disableRipple
                                    className="p-0 bg-transparent data-[hover=true]:bg-transparent text-md"
                                    endContent={
                                        <ChevronDown
                                            fill="currentColor"
                                            size={16}
                                            height={16}
                                            width={16}
                                        />
                                    }
                                    radius="sm"
                                    variant="light"
                                >
                                    {category.label}
                                </Button>
                            </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu
                            aria-label={category.label}
                            classNames={{
                                base: "xs:max-h-[350px] md:max-h-fit overflow-auto scroll-smooth",
                                list: "grid sm:grid-flow-row md:grid-flow-col gap-3"
                            }}
                        >
                            {category.sections.map((section) => {
                                return (
                                    <DropdownSection
                                        key={section.label}
                                        title={section.label}
                                        classNames={{
                                            base: "text-center",
                                            heading: `text-md font-semibold text-sm ${category.color}`
                                        }}
                                    >
                                        {section.children.map((child) => {
                                            return (
                                                <DropdownItem
                                                    key={child.label}
                                                    classNames={{
                                                        base: "text-center"
                                                    }}
                                                    href={`/categories/${child.slug}`}
                                                >
                                                    {child.label}
                                                </DropdownItem>
                                            );
                                        })}
                                    </DropdownSection>
                                );
                            })}
                        </DropdownMenu>
                    </Dropdown>
                );
            })}
        </React.Fragment>
    );
}

export default CategoryMegaMenu;
