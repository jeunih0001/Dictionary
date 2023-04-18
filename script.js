const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const result = document.querySelector(".results")
const sound = document.querySelector("#sound")
const speak = document.querySelector("#speak")
const btn = document.querySelector('#search')

btn.addEventListener('click', ()=>{
    result.innerHTML = `
    <div class="loading">
                
    </div>`
    let input = document.querySelector('#text').value
    fetch(`${url}${input}`)
    .then((response) => response.json())
    .then((data) => {
        console.log(Object.keys(data[0]["meanings"][0]["definitions"]).length)
        console.log(data[0]["meanings"][0]["definitions"])
        result.innerHTML = ""
        for (let i = 0; i< Object.keys(data[0]["meanings"][0]["definitions"]).length;i++){
            let def = data[0]["meanings"][0]["definitions"][i]["definition"]
            let phoe = data[0].phonetic
            if (!phoe){
                phoe=""
            }
            let ex = data[0]["meanings"][0]["definitions"][i]["example"]
            if (!ex){
                ex = ""
            }else{
                ex = '<p><strong>Example: </strong>'+ex+"</p>"
            }
            result.innerHTML = result.innerHTML+ `
            <h2 id="word" class="word">${i+1}. ${input}</h2>
            `
            if (i==0)
                result.innerHTML = result.innerHTML+`
                <button id="speak" onClick = play() class="btn"><img src="mic.png" alt=""></button>
                <h3 id="pronounciation">${phoe}</h3>`
            result.innerHTML = result.innerHTML+
            `<p id="def">${def}</p>`
            if (ex){
                result.innerHTML = result.innerHTML + 
                `<div id="ex">${ex}</div>`
            }
        }
        sound.setAttribute('src', `${data[0]["phonetics"][0]["audio"]}`)
        
    })
    .catch( () => {
        result.innerHTML = "Word not found!"
    })
})
function play(){
    
    sound.play()
}