import { RazorPayFailureHandlerArgs, RazorpayInstance, RazorpayOptions } from "utils/types";

import React from "react";

export class Razorpay {
    private options: RazorpayOptions;
    private razorpayInstance!: RazorpayInstance;

    constructor(options: RazorpayOptions) {
        this.options = options;
        if (typeof window !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.razorpayInstance = new (window as any).Razorpay(this.options) as RazorpayInstance;
        }
    }

    // eslint-disable-next-line no-unused-vars
    on(event: string, callback: (args: RazorPayFailureHandlerArgs) => void) {
        this.razorpayInstance.on(event, callback);
    }

    open() {
        this.razorpayInstance.open();
    }
}

const useRazorpay = (): [typeof Razorpay] => {
    /* Constants */
    const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

    const isClient = React.useMemo(() => typeof window !== "undefined", []);

    const checkScriptLoaded = React.useCallback(() => {
        if (!isClient || !("Razorpay" in window)) return false;
        return true;
    }, [isClient]);

    const loadScript = React.useCallback(
        (scriptUrl: string) => {
            if (!isClient) return; // Don't execute this function if it's rendering on the server side
            return new Promise((resolve, reject) => {
                const scriptTag = document.createElement("script");
                scriptTag.src = scriptUrl;
                scriptTag.onload = (ev) => {
                    resolve(ev);
                };
                scriptTag.onerror = (err) => reject(err);
                document.body.appendChild(scriptTag);
            });
        },
        [isClient]
    );

    React.useEffect(() => {
        if (!checkScriptLoaded()) {
            (async () => {
                try {
                    await loadScript(RAZORPAY_SCRIPT);
                } catch (error) {
                    throw new Error(String(error));
                }
            })();
        }
    }, [checkScriptLoaded, loadScript]);

    return [Razorpay];
};

export default useRazorpay;
