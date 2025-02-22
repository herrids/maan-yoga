import './Logo.scss';

const getRandomYogaEmoji = () => {
    const yogaEmojis = [
        '🧘', '🧘🏻', '🧘🏼', '🧘🏽', '🧘🏾', '🧘🏿',
        '🧘‍♀️', '🧘🏻‍♀️', '🧘🏼‍♀️', '🧘🏽‍♀️', '🧘🏾‍♀️', '🧘🏿‍♀️',
        '🧘‍♂️', '🧘🏻‍♂️', '🧘🏼‍♂️', '🧘🏽‍♂️', '🧘🏾‍♂️', '🧘🏿‍♂️'
    ];
    
    return yogaEmojis[Math.floor(Math.random() * yogaEmojis.length)];
};

const Logo = () => {
    return (
        <div className="logo">
            <span className="logo-emoji">{getRandomYogaEmoji()}</span>
            <span className="logo-text">Yoga Flow App</span>
        </div>
    );
};

export default Logo; 