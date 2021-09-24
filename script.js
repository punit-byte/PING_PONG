

let ball = document.querySelector(".ball");
let board = document.querySelector('.board');
let boardcord = board.getBoundingClientRect();

let leftpaddle = document.querySelector(".left");
let rightpaddle = document.querySelector(".right");

let leftlife = 3;
let rightlife = 3;
let x = true;
let y = true;

function setcolor(index){
    let seticon=document.querySelectorAll(".fas.fa-circle");
    seticon[index].style.color="#FF0000";
}
function moveball() {
    let ballcord = ball.getBoundingClientRect();
    let balltop = ballcord.top;
    let ballleft = ballcord.left;
    let ballbottom = ballcord.bottom;
    let ballright = ballcord.right;

    let touchleft=ballleft<boardcord.left;
    let touchright=ballright>boardcord.right;
    if(touchleft||touchright){
        if(touchleft){
             leftlife--;
             setcolor(leftlife);
             if(leftlife==0){
                 alert("Game Over!!!!  \n Right Player Won");
                 document.location.reload();
             }
             else{
                 return resetgame();
             }
        }else{
              rightlife--;
              setcolor(3+rightlife);
              if(rightlife==0){
              alert("Game Over!!!!      Left PlayerWon");
              document.location.reload();
              }
              else{
                return  resetgame();
              }
        }
    }
    function resetgame(){
        ball.style.top=window.innerHeight*0.45+"px";
        ball.style.left=window.innerWidth*0.5+"px";
        requestAnimationFrame(moveball);
    }
    //is ball in bound
    //handle vertical bound
    //handle horizontal bound

    //---------------collision with top----------------------------//
    if (balltop <= boardcord.top || ballbottom >= boardcord.bottom) {
        y = !y;
    }
    // if (ballleft <= boardcord.left || ballright >= boardcord.right) {
    //     x = !x;
    // }


    let leftpaddlebound = leftpaddle.getBoundingClientRect();
    let rightpaddlebound = rightpaddle.getBoundingClientRect();
    //---------------collision with leftpaddle---------------------------//
    if (ballleft <= leftpaddlebound.right && ballright >= leftpaddlebound.left &&
        balltop + 30 >= leftpaddlebound.top && ballbottom -30< leftpaddlebound.bottom ) {
        x = !x;
    }
    //---------------collision with rightpaddle----------------------------//
    if (ballleft <= rightpaddlebound.right && ballright >= rightpaddlebound.left &&
        balltop + 30 >= rightpaddlebound.top && ballbottom -30< rightpaddlebound.bottom) {
        x = !x;
    }

    ball.style.top = y == true ? balltop + 5 + "px" : balltop - 5 + "px";
    ball.style.left = x == true ? ballleft + 5 + "px" : ballleft - 5 + "px";
    requestAnimationFrame(moveball);

}

document.addEventListener("keydown", function (e) {
    if (e.key == "w") {
        movepaddle(leftpaddle, -window.innerHeight * 0.05);
    } else if (e.key == "s") {
        movepaddle(leftpaddle, window.innerHeight * 0.05)
    }
    else if (e.key == "ArrowUp") {
        movepaddle(rightpaddle, -window.innerHeight * 0.05)
    } else if (e.key == "ArrowDown") {
        movepaddle(rightpaddle, window.innerHeight * 0.05)
    }
})
function movepaddle(cpaddle, change) {
    let cpaddlebound = cpaddle.getBoundingClientRect();
    if (cpaddlebound.top + change >= boardcord.top && cpaddlebound.bottom + change <= boardcord.bottom) {
        cpaddle.style.top = cpaddlebound.top + change + "px";
    }

}
requestAnimationFrame(moveball);