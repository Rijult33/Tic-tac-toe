const boxes = document.querySelectorAll(".box");
const gameInfo= document.querySelector(".game-info");
const gameBtn= document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningpositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function initGame()
{
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
   
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //intial css to remove win color
        box.classList=`box box${index+1}`;
    });
    gameBtn.classList.remove("active");
    gameInfo.innerText= `current player - ${currentPlayer}`;

}
initGame();

function swapTurn(){
    if(currentPlayer==="X")
    {
        currentPlayer= "O";
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`current player - ${currentPlayer}`;
}
function checkGameOver(){
    let ans="";
    winningpositions.forEach( (position) => {
        if((gameGrid[position[0]] !=="" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[0]] === gameGrid[position[2]]))
     {
        if(gameGrid[position[0]]==="X")
        {
            ans="X";
        }
        else{
            ans="O";
        }
        boxes.forEach((box)=>
        {
            box.style.pointerEvents="none";
        }
        )

        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    }
    }); 
    if(ans !== "")
    {
        gameInfo.innerText = `winner is - ${ans}`;
        gameBtn.classList.add( "active");
        return;
    }
    let fillcnt = 0 ;
    gameGrid.forEach((box)=>
    {
        if(box !== "")
        {
            fillcnt++;
        }
    });
    if( fillcnt === 9)
    {
        gameInfo.innerText= "game tied! ";
        gameBtn.classList.add('active');
    }
    

}


function handleClick(index)
{
    if(gameGrid[index]==="")
    {
         boxes[index].innerText = currentPlayer;
         gameGrid[index]=currentPlayer;
         boxes[index].style.pointerEvents="none";

         swapTurn();

         checkGameOver();
    }
};

boxes.forEach((box,index)=> {
    box.addEventListener('click',() =>{ 
        handleClick(index);
    })
});

gameBtn.addEventListener("click",initGame);