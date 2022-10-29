const state = {
    player1: 0,
    player2: 0,
    currentQuestion: {},
    which: true
}
let questions = []

// Main DOM Element
const question = $("#question")
const $a = $("#a")
const $b = $("#b")
const $c = $("#c")
const $d = $("#d")
const $p1score = $("#player1 h4")
const $p2score = $("#player2 h4")

//Functions 

const chooseAnswer = (event, question) => {
    
    
    if(event.target.innerText === question.answer){
        
        if(state.which){
            state.player1++
            state.which = !state.which
            
        }else{ 
            state.player2++
            state.which = !state.which
        }
        setBoard(questions)
    }else{
        
        setBoard(questions)
        state.which = !state.which
        
    }
}

// function setBoard

const setBoard = (q) => {
    //Getting random questions
    const randomIndex = Math.floor(Math.random()*q.length)
    const randomQuestion = q[randomIndex]
    
//update questions
    question.text(randomQuestion.question)
    $a.text(randomQuestion.a)
    $b.text(randomQuestion.b)
    $c.text(randomQuestion.c)
    $d.text(randomQuestion.d)
}

//update players scores
$p1score.text(state.player1)
$p2score.text(state.player2)
$("li").off()
$("li").on("click",(event) =>{
    chooseAnswer(event, randomQuestion)
} )

//Ajax request the data from the URL .then run the code after the data arrive

const URL= "https://cdn.contentful.com/spaces/br4hkfviagfq/environments/master/entries?access_token=4DXOVpVXCaXPg2PbcTNzfOnN2Tk5GFsru8UUiG-xeM8&content_type=soccerg"
        $.ajax(URL)
        .then((data) => {
            questions = data.items.map((q) => q.fields)
            // console.log(data, "this is the data")
            // console.log(questions[0].answer,"<< this is the question answer")
            setBoard(questions)
            
        })
    
