import { eventEmitter } from './gameSetup.js';
import "@babel/polyfill";
import { pixiApp, startTweenManager } from './gameSetup.js';
import { gameFSM } from './stateManager.js';
import {trainSVM } from '../../js/svm.js';

import ResumeUI from '../../components/ui/ui-resume/ui-resume';

console.log(txt.stageZero.welcome);
console.log('hellooo!');

/* -- JUST TESTING -- */
// new Resume({content: 'this is my CV', show: true}); 
// new TaskTimer({show: true});



document.getElementById("gameCanvas").appendChild(pixiApp.view);
var a = 0;
gameFSM.startGame();

startTweenManager();