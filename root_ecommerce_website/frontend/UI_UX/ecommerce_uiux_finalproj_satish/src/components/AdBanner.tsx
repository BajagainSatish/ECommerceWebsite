import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ChevronDown } from "lucide-react";
import "./AdBanner.css";

interface AdBannerProps {
    imageUrls: string[];
    id?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ imageUrls, id }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Automatically cycle through images every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [imageUrls.length]);

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            (prevIndex - 1 + imageUrls.length) % imageUrls.length
        );
    };

    const handleClose = () => {
        if (id === "heading-banner") {
            const adBanner = document.querySelector(`#${id}`) as HTMLElement;
            if (adBanner) {
                adBanner.classList.add("hide"); // Animate slide/opacity
                setTimeout(() => setIsVisible(false), 500); // Wait for animation
            }
        } else {
            setIsVisible(false); // For other banners, simply hide
        }
    };

    const handleExpand = () => {
        setIsVisible(true);
        // Remove the hide class if it's the heading-banner
        if (id === "heading-banner") {
            const adBanner = document.querySelector(`#${id}`) as HTMLElement;
            if (adBanner) {
                adBanner.classList.remove("hide");
            }
        }
    };

    // Conditionally render the expand button only for heading-banner
    if (!isVisible) {
        return id === "heading-banner" ? (
            <button onClick={handleExpand} className="expand-button">
                <span className="icon-wrapper">
                    <ChevronDown size={20} color="#fff" />
                </span>
            </button>

        ) : null;
    }

    return (
        <div
            id={id}
            className={`ad-banner relative ${id === "heading-banner" ? "heading-banner" : ""}`}
        >
            <img
                src={imageUrls[currentIndex]}
                alt={`Ad Banner ${currentIndex + 1}`}
                className="ad-image"
            />

            {/* Close Button */}
            <button onClick={handleClose} className="close-button">
                <X size={20} />
            </button>

            {/* Navigation Buttons */}
            <button
                onClick={goToPrev}
                className="prev-button absolute left-2 top-1/2 transform -translate-y-1/2"
            >
                <ChevronLeft size={20} />
            </button>

            <button
                onClick={goToNext}
                className="next-button absolute right-2 top-1/2 transform -translate-y-1/2"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="dots-container absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {imageUrls.map((_, index) => (
                    <span
                        key={index}
                        className={`dot w-2 h-2 rounded-full ${index === currentIndex ? "bg-gray-800" : "bg-gray-400"
                            }`}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default AdBanner;
