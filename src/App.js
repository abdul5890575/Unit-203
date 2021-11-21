import './stye.css';
//Styling variables
const BLUE = "#172162"; //"rgb(23, 33, 98)";
const LIGHT_GREY = "#6e7484";
const BLACK = "#000000";


//First part given
const lineItems = [
  {
    id: 1,
    title: "Grey Sofa",
    price: 499.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_DARK_GREY_OFF_OFF_SLOPE_17f0f115-11f8-4a78-b412-e9a2fea4748d.png%3Fv%3D1629310667&w=1920&q=75",
    swatchColor: "#959392",
    swatchTitle: "Grey"
  },
  {
    id: 2,


    title: "Blue Sofa",
    price: 994.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F3_Seater_SofaSofa_Ottoman_Off_Arm_Configuration_Two_Arms_Arm_Design_Slope_Chaise_Off_Fabric_Navy_Blue2.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#191944",
    swatchTitle: "Blue"


  },
  {
    id: 3,
    title: "White Sofa",
    price: 599.99,
    quantity: 1,
    image:
      "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75",
    swatchColor: "#F8F1EC",
    swatchTitle: "White"
  },
];


const SUBTOTAL = 2094.97;
const HST = 272.3461;
const TOTAL = 2382.3161;
const ESTIMATED_DELIVERY = "Nov 24, 2021";


// I dont really have to update this so not sure you want it as state or not

function App() {

  let table = lineItems.map((lineItem) =>
    <tr key={lineItem.id}>
      <td className="tdDesign" width="20%"><img className="imgsize" src={lineItem.image}/></td>
      <td className="tdDesign" width="30%">
        <h2 className="headcolor">{lineItem.title}/Without Ottoman/3</h2>
        <div className="flexbox"><span className="dot" style={{backgroundColor: lineItem.swatchColor}}></span><p>{lineItem.swatchTitle}</p></div>
      </td>
      <td className="tdDesign" width="28%">
        <div className="flexbox2">
        <h3 className="price">${lineItem.price}</h3>
        <h3 className="est">Estimated Deleviery Date: {ESTIMATED_DELIVERY} </h3>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="container">
      <h1 className="headcolor header">Your cart</h1>
      <table>
        {table}
      </table>
      <hr className="hrcustom"/>
      <div className="footer">
        <h4>Subtotal: {SUBTOTAL}</h4>
        <h4>Taxes: {HST}</h4>
        <h4>Shipping:</h4>
        <h3 className="headcolor">Total: {TOTAL}</h3>
      </div>
    </div>
  )
}

export default App;
