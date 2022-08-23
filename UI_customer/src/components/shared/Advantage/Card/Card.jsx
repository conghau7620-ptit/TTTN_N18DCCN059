export const Card = ({ advantage }) => {
    const { icon, title, body, logoSrc } = advantage;
    return (
        <div className="advantages-item">
            <div className="advantages-item__icon">
                <img
                    src={logoSrc}
                    className="js-img"
                    alt=""
                    style={{ width: 50, height: 50 }}
                />
            </div>
            <h4>{title}</h4>
        </div>
    );
};
