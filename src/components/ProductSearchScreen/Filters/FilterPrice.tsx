import React from "react";
import { Slider } from "@nextui-org/react";
import { useSearchParams } from "react-router-dom";

interface FilterPrice {
    priceRange: { maxPrice: number; minPrice: number };
}

function FilterPrice({ priceRange }: FilterPrice) {
    const [queryParams, setQueryParams] = useSearchParams();
    const filteredPriceRangeString = queryParams.get("priceRange");
    let filteredPriceRange: number | number[];

    if (filteredPriceRangeString) {
        filteredPriceRange = JSON.parse(filteredPriceRangeString);
    } else {
        filteredPriceRange = [priceRange.minPrice, priceRange.maxPrice];
    }

    const handleSlider = (priceRange: number | number[]) => {
        const priceRangeString = Array.isArray(priceRange)
            ? JSON.stringify(priceRange)
            : String(priceRange);
        queryParams.set("priceRange", priceRangeString);
        setQueryParams(queryParams);
    };

    return (
        <Slider
            label="Price Range"
            step={100}
            maxValue={priceRange.maxPrice}
            minValue={0}
            defaultValue={filteredPriceRange}
            onChangeEnd={handleSlider}
            showTooltip={true}
            showOutline={true}
            disableThumbScale={true}
            formatOptions={{ style: "currency", currency: "INR" }}
            tooltipValueFormatOptions={{
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2
            }}
            classNames={{
                base: "w-11/12 xs:w-full",
                filler: "bg-gradient-to-r from-primary-500 to-secondary-400",
                labelWrapper: "mb-2",
                label: "uppercase font-semibold text-purple-800 text-medium",
                value: "font-medium text-default-500 text-small",
                thumb: [
                    "transition-size",
                    "bg-gradient-to-r from-secondary-400 to-primary-500",
                    "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                    "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6"
                ]
            }}
            tooltipProps={{
                offset: 10,
                placement: "bottom",
                classNames: {
                    base: [
                        // arrow color
                        "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500"
                    ],
                    content: [
                        "py-2 shadow-xl",
                        "text-white bg-gradient-to-r from-secondary-400 to-primary-500"
                    ]
                }
            }}
        />
    );
}

export default FilterPrice;
