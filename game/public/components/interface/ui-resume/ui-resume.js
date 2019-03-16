import {TweenLite} from 'gsap/TweenMax';
import $ from 'jquery';
import CLASSES from '../../../controllers/constants/classes';
import EVENTS from '../../../controllers/constants/events';
import UIBase from '../ui-base/ui-base';
import {eventEmitter} from '../../../controllers/game/gameSetup.js';

export default class extends UIBase {
    constructor(options) {
        super();
        this._removeEventListeners();

        if (options.show) {
          //debugging, will move this elsewhere
          this.color = options.scores[options.candidateId].color;
          console.log(this.color);
          if (this.color == "yellow") {
            this.$el = $('#js-resume-y');
          }
          if (this.color == "blue") {
          this.$el = $('#js-resume-b');}
          ////////
        }
        // this.$el = $('#js-resume-y');
        this.$nameEl = this.$el.find('.Resume__title');
        this.$taglineEl = this.$el.find('.Resume__tagline');
        this.$scanline = this.$el.find('.Resume__scanline');
        this.$mask = this.$el.find('.Resume__mask');
        this.scanlineAnimDuration = 1.8;
        this._content = options ? options.content : 'dummy text'; // TODO: change this to null
        this._resumeFeatures = options ? options.features : undefined;
        this._resumes = options ? options.scores : undefined;
        this._candidateId = options.candidateId || 0;
        this.type = options.type || null;
        // this.setContent(); // set content




        if (this.type === 'ml') {
            this.$scanline.removeClass(CLASSES.IS_INACTIVE);
        }
        if (options && options.show) {
            this.show();
            this.newCV();
        }

    }


    newCV() {

        if (this._resumes === undefined || this._resumeFeatures === undefined) {
            throw new Error('You need to pass CV scores to the CV viewer upon instantiation');
        };
        if (this._candidateId === this._resumes.length) alert('we have no CVs left');
        else {

          this.showCV(this._resumes[this._candidateId]);
        //this._candidateId++;
    }
  }

    showCV(cv) {
        this.$nameEl.html(cv.name);
        this.$taglineEl.html('personal tagline comes here');
        this._resumeFeatures.forEach((feature, index) => {
            const skillScore = cv.qualifications[index]*10;
            const skillClass = `.${CLASSES.CV_CATEGORY}--${feature.class}`;
            const $skillEl = this.$el.find(skillClass);
            $skillEl.find(`.${CLASSES.CV_CATEGORY}__name`).html(feature.name);
            $skillEl.find(`.${CLASSES.CV_CATEGORY}__progress`).css('width', `${skillScore}%`);
        });

    }

    createScanTween() {
        return TweenMax.to('#js-resume > .Resume__scanline', this.scanlineAnimDuration, {top: '100%', ease: Power0.easeNone})
            .pause();
    }

    createMaskTween() {
        return TweenMax.to('#js-resume > .Resume__mask', this.scanlineAnimDuration, {height: '100%', ease: Power0.easeNone})
            .pause();
    }

    showScanline() {
        this.$scanline.removeClass(CLASSES.IS_INACTIVE);
        this.$mask.removeClass(CLASSES.IS_INACTIVE);
    }

    hideScanline() {
        this.$scanline.addClass(CLASSES.IS_INACTIVE);
        this.$scanline.css('top', '0');
        this.$mask.addClass(CLASSES.IS_INACTIVE);
        this.$mask.css('height', '0');
    }

    _addEventListeners() {
    }

    _removeEventListeners() {
    }

    show() {
        this.$el.removeClass(CLASSES.IS_INACTIVE)
            .removeClass(CLASSES.FADE_OUT)
            .addClass(CLASSES.FADE_IN);
    }

    hide() {
        this.$el.removeClass(CLASSES.FADE_IN)
            .addClass(CLASSES.FADE_OUT)
            .addClass(CLASSES.IS_INACTIVE);
        // TODO you might need a delayed call for this
    }

    destroy() {
        super.dispose();
        this.hide();
        this._removeEventListeners();
        // this.$el.destroy();
    }
}