// AdBanner.tsx
import React, { useState } from "react";
import { X } from "lucide-react";
import './AdBanner.css';

interface AdBannerProps {
    imageUrl: string;
}

const AdBanner: React.FC<AdBannerProps> = ({ imageUrl }) => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="ad-banner relative"> {/* Keep relative for z-index context */}
            <img src={imageUrl} alt="Ad Banner" className="ad-image" />
            <button
                onClick={() => setIsVisible(false)}
                className="close-button"
            >
                <X size={20} />
            </button>
        </div>
    );
};

export default AdBanner;