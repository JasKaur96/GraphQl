import {useQuery, gql} from "@apollo/client";
import { useState } from "react";
import TextField from '@material-ui/core/TextField';

// function ExchangeRates() {   
  // const { loading, error, data } = useQuery(gql`
  //   {
  //     rates(currency : "USD") {
  //       currency
  //       rate
  //     }
  //   }   
  // `);
  
const GET_CURRENCY = gql`
  query ($currency: String!) {
    rates(currency : $currency) {
      currency
      rate
    }
  }
`;


function ExchangeRates() {
  const [curr, setCurrency] = useState("");
  const [val, setCurrencyValue] = useState("");
  
  const {loading,error,data} = useQuery(GET_CURRENCY, {
    variables: {currency : curr},
  });

  const settingCurrrency = (e)=>{
    setCurrencyValue(e.target.value)
  }

  const submit = () => {
    setCurrency(val)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return(
    <>
      <div style={{display:"flex", flexDirection:"column", width:"250px"}}>
        <TextField onChange={(e)=>settingCurrrency(e)} id="outlined-basic" label="Currency Rate" variant="outlined" />
        <button style={{height : "52px", marginTop:"10px", textAlign:"center", fontSize:"15px"}} onClick={submit}>Check Rates</button>
      </div>    
      {curr != "" ?<>
       {data.rates.map(({ currency, rate }) => (
          <div key={currency}>    
            <p>{currency}: {rate}</p>
          </div>
        ))}</>
      : ""}
    </>
  ) 
}

export default ExchangeRates;