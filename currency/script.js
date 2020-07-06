let exchangeUsdToVnd = 23208
let exchangeVndToUsd = 0.0000431236

// 1 USD=22300VND
function Exchange(money, exchangeValue) {
    return money / exchangeValue
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


let yourMoney = prompt("Vnd or Usd");
let amountUrMoney = prompt("How much your money?");


let vndToUsd = Math.round(Exchange(amountUrMoney, exchangeUsdToVnd))
console.log(vndToUsd)
let usdToVnd = Math.round(Exchange(amountUrMoney, exchangeVndToUsd))
console.log(usdToVnd)

const formattedUSD = numberWithCommas(vndToUsd)
const foramttedVND = numberWithCommas(usdToVnd)

if(isNaN(amountUrMoney)) {
    alert("number pls")
} else{

    if (yourMoney == "vnd") {
        alert(`${amountUrMoney} VND to USD is  ${formattedUSD} USD `)
        // console.log(`${amountVND} VND to USD is  ${vndToUsd} USD `) 
    //    console.log(amountVND + 'la vchung nay tien' + vndToUsd)
    } else (yourMoney == "usd") 
    {
        alert(`${amountUrMoney} USD to VND is ${foramttedVND} VND`)
    }
}



