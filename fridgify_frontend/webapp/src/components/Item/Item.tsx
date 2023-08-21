import "./Item.css"

type ItemProps = {
    name: string,
    raw: string,
    quantity: number,
    uom: string,
    measurement: number,
    expiration_date: Date,
    purchase_date: Date,
    origin?: string,
    store?: string
}

const Item = (props:ItemProps) => {
    const { name, measurement, uom, expiration_date } = props;
    console.log("name", name, measurement)
    return (
        <div className="item">
            <p key={name} className="text"> { name }</p>
            <p key="measurement" className="text"> Amount: {measurement} {uom} </p>
            <p key="expDate" className="text"> Expiration Date: {uom} </p>
        </div>
    )  
};

export default Item;