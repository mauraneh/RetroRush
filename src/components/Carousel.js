import React, { useState } from 'react';

const Carousel = ({ children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = React.Children.count(children) - 2;
        } else if (newIndex >= React.Children.count(children)) {
            newIndex = 0;
        }

        setActiveIndex(newIndex);
    };

    return (
        <div className="carousel">
            <button className="carousel-button prev" onClick={() => updateIndex(activeIndex - 1)}>‹</button>
            <div className="carousel-inner" style={{ transform: `translateX(-${activeIndex * 50}%)` }}>
                {React.Children.map(children, (child, index) => {
                    return React.cloneElement(child, { style: { width: "50%" } });
                })}
            </div>
            <button className="carousel-button next" onClick={() => updateIndex(activeIndex + 1)}>›</button>
        </div>
    );
};

export default Carousel;

