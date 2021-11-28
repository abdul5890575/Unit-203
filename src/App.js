import './stye.css';
import { useState, useEffect } from "react";
import axios from 'axios'

//Styling variables
const BLUE = "#172162"; //"rgb(23, 33, 98)";
const LIGHT_GREY = "#6e7484";
const BLACK = "#000000";


//First part given
const SUBTOTAL = 2094.97;
const HST = 272.3461;
const TOTAL = 2382.3161;
const ESTIMATED_DELIVERY = "Nov 24, 2021";

const TestObject = {
  id: 4,
  title: "Sofa HHH",
  price: 988.99,
  quantity: 1,
  image:
    "https://www.cozey.ca/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0277%2F3057%2F5462%2Fproducts%2F2_Single_shot_IVORY_OFF_OFF_SLOPE_5379af1f-9318-4e37-b514-962d33d1ce64.png%3Fv%3D1629231450&w=1920&q=75",
  swatchColor: "#F8F1EC",
  swatchTitle: "White"
}

function App() {

  const [state,setState] = useState([])
  const [cartitems,setCartitems] = useState() //assumed state for cart
  const [totalPrice,setTotalPrice] = useState() //assumed state for cart
  const [isLoading, setLoading] = useState(true);
  const [postalCode, setpostalCode] = useState('');
  const [delDates, setDelDates] = useState();

  // we dont have the actual add to cart functionality on this page and the assessment does not seem to ask us to create one so for now I am assuming that cart added items are added to cartitem state
  //runs once when the page loads and renders if the client has pre-saved items in the cart
  useEffect (() =>{
    if(cartitems) {
      const totalAmount = calculateFees(priceArray)
      setTotalPrice(totalAmount)
    }
  }, [] )

  //runs everytime person adds or remove items from cartitems
  useEffect (() =>{
    if(cartitems) {
      const totalAmount = calculateFees(priceArray)
      setTotalPrice(totalAmount)
    }
  }, [cartitems] )
  // You can render total price in the htm my using {totalPrice}

  useEffect (() =>{
    axios.get(`http://localhost:3001/getAppData`)
    .then(res => {
      setState(res.data)
      setLoading(false)
    })
  }, [] )

  const setDeleverydate = (value) => {
    axios.post(`http://localhost:3001/giveDeleveryData`, value, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      setDelDates(res.data)
    });
  };

  const removeItem = (itemId) => {
    const newState = [...state]
    const updateState = newState.filter(items => items.id !== itemId)
    setState(updateState)
  }

  // this will append the  item at the bottom of table
  const addItem = (itemobject) => {
    const updateState = [...state, itemobject]
    setState(updateState)
  }

  const priceArray = [4,66,34,77]
  //assuming we get an array of price of all items in the cart
  const calculateFees = (CartItemsPriceArray) => {
    let total = 0

    for (const price of CartItemsPriceArray ){
      total += price
    }

    total = (total * 1.13) + 15
    return total
  }

  function handleSubmit (e) {
    e.preventDefault()
    setDeleverydate(postalCode)
  }

  // if (delDates) {
  //   Deldates = <h3 className="est">Estimated Deleviery Date: {delDates[lineItem.id]} </h3>
  // } else {
  //   Deldates = <h3 className="est">Estimated Deleviery Date: {'delDates'} </h3>
  // }


    let table = state.map((lineItem) =>
    <tr key={lineItem.id}>
      <td className="tdDesign" width="20%"><img className="imgsize" src={lineItem.image}/></td>
      <td className="tdDesign" width="30%">
        <h2 className="headcolor">{lineItem.title}/Without Ottoman/3</h2>
        <div className="flexbox"><span className="dot" style={{backgroundColor: lineItem.swatchColor}}></span><p>{lineItem.swatchTitle}</p></div>
      </td>
      <td className="tdDesign" width="20%">
        <div className="flexbox2">
        <h3 className="price">${lineItem.price}</h3>
        {delDates &&  <h3 className="est">Estimated Deleviery Date: {delDates[lineItem.id]} </h3>}
        {!delDates &&  <h3 className="est">Estimated Deleviery Date: Enter Postal code </h3>}
        </div>
      </td>
      <td className="tdDesign">
        <button onClick={()=>removeItem(lineItem.id)}>Delete</button>
        <br/>
        <br/>
        <button onClick={()=>addItem(TestObject)}>Add/Test</button>
      </td>
    </tr>
  )


  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

  return (
      <div className="container">
      <h1 className="headcolor header">Your cart</h1>
      <table>
        <tbody>
          {table}
        </tbody>
      </table>
      <hr className="hrcustom"/>
      <div className="footer">
        <h4>Subtotal: {SUBTOTAL}</h4>
        <h4>Taxes: {HST}</h4>
        <h4>Shipping:</h4>
        <h3 className="headcolor">Total: {TOTAL}</h3>
        <form className="form" onSubmit={handleSubmit}>
        <label>Enter Postal code</label>
        <input
          type="text"
          value= {postalCode}
          onChange={(e)=>setpostalCode(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App;
