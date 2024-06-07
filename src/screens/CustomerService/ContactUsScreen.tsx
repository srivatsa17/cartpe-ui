import { BreadcrumbItem, Breadcrumbs, Divider, Image, Spacer } from "@nextui-org/react";

import { CONTACT_US_IMAGE } from "constants/images";
import ContactUsDetails from "components/ContactUsScreen/ContactUsDetails";
import { HOME_SCREEN } from "constants/routes";
import React from "react";

function ContactUsScreen() {
    return (
        <div className="container mx-auto px-6 py-7">
            <Breadcrumbs className="mb-3" size="lg">
                <BreadcrumbItem href={HOME_SCREEN}>Home</BreadcrumbItem>
                <BreadcrumbItem isCurrent isLast>
                    Contact Us
                </BreadcrumbItem>
            </Breadcrumbs>
            <Spacer y={5} />
            <div className="text-3xl">Contact Us</div>
            <Spacer y={5} />
            <Divider />
            <div className="grid grid-cols-2">
                <div>
                    <ContactUsDetails />
                </div>
                <div>
                    <Image src={CONTACT_US_IMAGE} />
                </div>
            </div>
        </div>
    );
}

export default ContactUsScreen;
