import $ from 'jquery';
import CLASSES from '~/public/game/controllers/constants/classes';
import EVENTS from '~/public/game/controllers/constants/events';
import UIBase from '~/public/game/components/interface/ui-base/ui-base';
import {eventEmitter} from '~/public/game/controllers/game/gameSetup.js';

export default class extends UIBase {
    constructor(options) {
        super();
        this.options = options;
        this.$el = $('#js-textbox-overlay'); // This should be a single element
        this.$textEl = this.$el.find('.Textbox__content');
        this.$buttons = this.$el.find('.TextboxButton');
        this.setContent = this.setContent.bind(this);
        this._mainContent = options.content || 'dummy text'; // TODO: change this to null
        this._responseContent = options.responses || ['Okay'];
        this.overlay = options.overlay || false; // TODO think about the overlay
        this.type = options.type || '';
        this.hasTooltip = options.hasTooltip;
        this.stageNumber = options.stageNumber;
        this.isRetry = options.isRetry || false;
        this.isLastMessage = options.isLastMessage;
        if (options.show) this.show();
        this.setContent(); // set content
        this._addEventListeners();
    }

    setContent() {
        if (!this.overlay) this.$el.addClass(CLASSES.IS_TRANSPARENT);
        this.$textEl.html(this._mainContent);
        this.$buttons.addClass(CLASSES.IS_INACTIVE);
        this._responseContent.forEach((response, index) => {
            const $responseButton = $(this.$buttons[index]);
            $responseButton.removeClass(CLASSES.IS_INACTIVE);
            $responseButton.find('.button__text').html(response);
        });
    }

    _mlStageButtonHandler(e) {
        this.$buttons.addClass(CLASSES.BUTTON_CLICKED);
        if (this.isLastMessage) {
            // whenever you want to log an event in Google Analytics, just call one of these functions with appropriate names
            gtag('event', 'test-game-completed', {
                'event_category': 'default',
                'event_label': 'how-far-do-ppl-get',
            });
            eventEmitter.emit(EVENTS.SHOW_ENDGAME_OVERLAY, {});
        } else if (this.hasTooltip) {
            eventEmitter.emit(EVENTS.SHOW_TOOLTIP, {});
        } else {
            eventEmitter.emit(EVENTS.RESUME_TIMELINE, {});
            eventEmitter.emit(EVENTS.HIDE_NEWS_FEED, {});
        }
        this.destroy();
    }

    _manualStageButtonHandler(e) {
        this.$buttons.addClass(CLASSES.BUTTON_CLICKED);
        if (this.isRetry) {
            eventEmitter.emit(EVENTS.RETRY_INSTRUCTION_ACKED, {
                stageNumber: this.stageNumber,
            });
        }
        else {
            eventEmitter.emit(EVENTS.INSTRUCTION_ACKED, {
                stageNumber: this.stageNumber,
            });
        }
        this.destroy();
    }

    _addEventListeners() {
        if (this.type === CLASSES.ML) {
            this.$buttons.click(this._mlStageButtonHandler.bind(this));
        } else {
            this.$buttons.click(this._manualStageButtonHandler.bind(this));
        }
    }

    _removeEventListeners() {
        // event listeners need to be removed explicitly because they are managed globally Jquery
        this.$buttons.off();
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
    }

    destroy() {
        this._removeEventListeners();
        super.dispose();
        this.hide();
        // this.$el.destroy();
    }
}