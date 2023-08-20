import "./TextWidget.css"

const TextWidget = (props) => {
    const { titleText, titleValue, bodyValue } = props;
    //console.log("widgets stuff",titleText,titleValue,bodyValue)
    return (
        <div className="widget">
            <p key={titleText} className="text">{  titleText + ": " + titleValue}</p>
            <p key="resultingBonus" className="text">Resulting bonus payment: </p>
            <p key="rewardValue" className="text">{bodyValue}</p>

        </div>
    )  
};

export default TextWidget;