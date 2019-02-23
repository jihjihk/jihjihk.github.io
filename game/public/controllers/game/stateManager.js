import * as machina from 'machina';
import {pixiApp, eventEmitter, beltContainer} from './gameSetup.js';
import {createPerson} from '../../components/pixi/person.js';
import {Office} from '../../components/pixi/office.js';
import {MLOffice} from '../../components/pixi/mloffice.js';

import {incubator} from '../common/textures.js';
import {TextBox} from '../../components/interface/old-pixi-components-demise/instructionBubble.js';
import TextBoxUI from '../../components/interface/ui-instruction/ui-instruction';
import {startTaskTimer} from '../../components/interface/old-pixi-components-demise/taskTimer.js';
import {CVViewer} from '../../components/interface/old-pixi-components-demise/cvViewer.js';
import {cvCollection} from '../../assets/text/cvCollection.js';
import {uv2px, animateTo} from '../common/utils.js';

import {xIcon} from '../common/textures.js';
import {beltTexture, doorTexture, cvTexture} from '../common/textures.js';

let office;
let personList;
let personList2;
let cvViewerML;

let cvList;

const gameFSM = new machina.Fsm( {

    namespace: 'game-fsm',
    initialState: 'stageOne',

    states: {
        uninitialized: {
            startGame: function() {
                this.transition( 'stageZero' );
            },
        },

        /* ///////////////////
        // Welcome image
        */// /////////////////
        stageZero: {
            _onEnter: function() {
                this.timer = setTimeout( function() {
                    this.handle( 'timeout' );
                }.bind( this ), 300 );

                this.image = new PIXI.Sprite(incubator);
                pixiApp.stage.addChild(this.image);
                this.image.scale.set(0.7);
            },

            timeout: 'stageOne',

            _onExit: function() {
                clearTimeout( this.timer );
                this.image.parent.removeChild(this.image);
            },
        },

        /* ///////////////////
        // Small office, hiring from the street
        */// /////////////////
        stageOne: {
            _onEnter: function() {
                const stageOneText = new TextBoxUI({content: txt.stageOne.messageFromVc, show: true});
                office = new Office();
                personList = [];

                eventEmitter.on('instructionAcked', (data) => {
                    // create People in the office
                    let x = uv2px(0.12, 'w');
                    const xOffset = uv2px(0.05, 'w');
                    const y = uv2px(0.88, 'h');

                    for (let i = 0; i < 12; i++) {
                        const person = createPerson(x, y, office);
                        personList.push(person);
                        x += xOffset;
                    }

                    startTaskTimer(uv2px(0.7, 'w'), uv2px(0.1, 'h'), uv2px(0.22, 'w'), uv2px(0.16, 'h'), txt.stageOne.taskDescription, 140, 5);
                    const cvViewer = new CVViewer(uv2px(0.8, 'w'), uv2px(0.62, 'h'), uv2px(0.13, 'w'), uv2px(0.32, 'h'), cvCollection.cvFeatures, cvCollection.stageOne);
                });
            },

            nextStage: 'stageTwo',

            _onExit: function() {

            },
        },

        /* ///////////////////
        // Big office, city level view
        */// /////////////////
        stageTwo: {
            _onEnter: function() {
                const stageOneOver = new TextBox(uv2px(0.5, 'w'), uv2px(0.5, 'h'), txt.stageTwo.messageFromVc);
                // const stageTwoText = new TextBoxUI({content: txt.stageTwo.messageFromVc, show: true});

                eventEmitter.on('instructionAcked', (data) => {
                    const unassignedPeople = [];
                    for (let i = 0; i < personList.length; i++) {
                        if (!personList[i].controller.isSeated()) {
                            unassignedPeople.push(personList[i]);
                        }
                    }
                    office.growOffice(unassignedPeople);

                    startTaskTimer(uv2px(0.7, 'w'), uv2px(0.1, 'h'), uv2px(0.22, 'w'), uv2px(0.16, 'h'), txt.stageTwo.taskDescription, 140, 10);
                });
            },

            nextStage: 'stageThree',

            _onExit: function() {

            },
        },

        /* ///////////////////
        // Huge office, ccountry level view
        */// /////////////////
        stageThree: {
            _onEnter: function() {
                const unassignedPeople = [];
                for (let i = 0; i < personList.length; i++) {
                    if (!personList[i].controller.isSeated()) {
                        unassignedPeople.push(personList[i]);
                    }
                }
                office.growOffice(unassignedPeople);
            },

            nextStage: 'stageFour',

            _onExit: function() {

            },
        },

        stageFour: {

            _onEnter: function() {
                // var messagebox2 = new TextBox();
                // messagebox2.drawBox(70,-150,"machine learning stage",false);

                // conveyorBelt

                // ////
                // will organize this code later


                // create People in the office


                const office2 = new MLOffice();

                personList2 = [];

                // create People in the office
                var x = uv2px(0.12, 'w');
                const xOffset = uv2px(0.05, 'w');
                const y = uv2px(0.85, 'h');

                for (let i = 0; i < 16; i++) {
                    const person = createPerson(x, y, office);
                    person.interactive = false;
                    person.button = false;
                    personList2.push(person);
                    x += xOffset;
                }

                // door
                const door = new PIXI.Sprite(doorTexture);
                door.x = uv2px(0.03, 'w');
                door.y = uv2px(0.69, 'h');
                door.scale.set(.55);
                pixiApp.stage.addChild(door);


                //  var belt_y =  (pixiApp.screen.height)/2 - (pixiApp.screen.height/8);
                const belt_y = uv2px(.38, 'h');
                //  var belt_x = (pixiApp.screen.width)/4);

                const belt_x = uv2px(0., 'w');
                const belt_xOffset = uv2px(0.165, 'w');


                for (let j = 0; j<6; j++) {
                    const belt = new PIXI.Sprite(beltTexture);
                    belt.scale.set(.4);
                    belt.y = belt_y;
                    belt.x = belt_x + (belt_xOffset* j);
                    // beltList.push(belt);
                    pixiApp.stage.addChild(belt);
                }

                cvList = [];

                const cv_xOffset = uv2px(0.165, 'w');

                // cvs on belt
                for (var x = 0; x<12; x++) {
                    const cv = new PIXI.Sprite(cvTexture);
                    cv.scale.set(.4);
                    cv.y = belt_y;
                    cv.x = belt_x + (cv_xOffset* x)/2;

                    cvList[x] = cv;

                    // beltList.push(belt);
                    pixiApp.stage.addChild(cv);
                }

                cvViewerML = new CVViewer(uv2px(0.8, 'w'), uv2px(0.05, 'h'), uv2px(0.13, 'w'), uv2px(0.32, 'h'), cvCollection.cvFeatures, cvCollection.stageOne);
            },


        },


    },


    startGame: function() {
        this.handle('startGame');
    },
    nextStage: function() {
        this.handle('nextStage');
    },
} );

export {gameFSM};
