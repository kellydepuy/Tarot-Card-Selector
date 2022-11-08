import cards from "./data/tarot-images.json" assert {type: 'json'}

const formEl = document.getElementById("form")
let cardNum = 0 

formEl.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
    e.preventDefault()
    
    const formData = new FormData(formEl)
    const todaysDate = formData.get("todays-date")
    const firstName = formData.get("first-name")
    const color = formData.get("color")
    const year = formData.get("year")
    const breakfast = formData.get("breakfast")
    const slider = formData.get("slider")
    let checkedRadio;

    for (let i = 6; i < 10; i++) {
        e.target[i].checked ? checkedRadio = e.target[i].id : ""
    }

    const dateNum = handleDate(todaysDate)
    const firstNameNum = firstName.length
    const colorNum = handleColor(color)
    const yearNum = year / dateNum
    const breakfastNum = handleBreakfast(breakfast)
    const sliderNum = slider * slider
    const checkedRadioNum = checkedRadio[3]
    const number = (dateNum + breakfastNum + sliderNum * checkedRadioNum) - firstNameNum - colorNum - yearNum
    let finalNum = number / 78

    while (cardNum === 0) {
        if (finalNum < 78) {
            cardNum = Math.floor(finalNum)
        } else {
            finalNum = finalNum / (Math.random() * 9)        
    }
    document.getElementById("main").style.display = "none"
    resultsHTML(cardNum)
 }
 
}

function handleDate(date) {
    let numArr = []

    for (let char of date) {
        if (char != "-") {
            numArr.push(Number(char))
        } 
    }
    return numArr.reduce((acc, curr) => acc + curr, 0)
}

function handleColor(color) {
    const colorArr = color.split("")
    return colorArr.filter((el) => el !== "#" && el == /\d/)

}

function handleBreakfast(trueOrFalse) {
    if (trueOrFalse) {
        return 1000
    } else {
        return 500
    }
}

function resultsHTML(num) {
    let imgName = ""
    let cardName = ""
    let cardInfo = ""

    for (let i = 1; i <= num; i++) {

        if (num == cards.cards[i].number) {
            imgName = cards.cards[i].img
            cardName = cards.cards[i].name
            const tempCardInfo = cards.cards[i].meanings.light
            for (let i = 0; i < tempCardInfo.length; i++) {
                cardInfo += `<p class="card-info-item">${tempCardInfo[i]}</p>
                                <hr></hr>`
            }
        }
    }
    console.log(imgName)
    console.log(cardName)
    console.log(cardInfo)
    document.getElementById("results-div").innerHTML = `<img class="card-img" src="./images/cards/${imgName}" />
                                                <p class="card-name">${cardName}</p>
                                                <div class="card-info">${cardInfo}</div>`
}

