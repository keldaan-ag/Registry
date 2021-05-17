import GameContainer from './game-container';

let numberOfBox = 3;
let testValues = [1,2,3,4,5];
let rule = (a)=>{return a * 2};
window.gameContainer = new GameContainer(numberOfBox, testValues, rule);