var ChatWidget = function() {

    var self = this;

    this.URL_GET = '/index.php?r=chat/getMessages';
    this.URL_SEND = '/index.php?r=chat/sendMessage';
    this.TIMEOUT = '';

    this.container = null;
    this.buttonExpand = null;
    this.messagesContainer = null;
    this.formContainer = null;

    this.lastMessageId = 0;

    this.getMessages = function() {

        var data = this.formContainer.serialize();

        jQuery.post(
            this.URL_GET,
            data,
            function(response) {

                self.processMessages(response);
            },
            'json'
        );
    };

    this.processMessages = function(response) {

        var length = null;
        var counter = null;

        if (response.status) {

            length = response.records.length;
            this.lastMessageId = response.records[length-1].id;

            for (counter = 0; counter < length; counter++) {

                this.drawMessage(response.records[counter]);
            }
        }

    };

    this.drawMessage = function(messageData) {


    };


    this.drawServiceError = function() {


    };

    this.sendMessage = function() {


    };


    this.slideContainer = function() {

        var marginRight = this.container.css('margin-right');
        marginRight = marginRight.replace(/px/g, '');

        if (marginRight < 0) {

            this.showContainer();
        } else {

            this.hideContainer();
        }

    };

    this.showContainer = function() {

        this.container.animate({
            'margin-right': 0
        },
        1500,
        function() {

            self.container.addClass('visible');
        });
    };

    this.hideContainer = function() {

        this.container.animate({
                'margin-right': -404
            },
            1500,
            function() {

                self.container.removeClass('visible');
        });
    };

    this.addEventListeners = function() {

        this.formContainer.submit(function(e) {

            e.preventDefault();
            self.sendMessage();
        });

        this.buttonExpand.click(function(e) {

            e.preventDefault();
            self.slideContainer();
        });

    };

    this.init = function() {

        this.container = jQuery('#widgetChat');
        this.buttonExpand = jQuery('.left-column', this.container);
        this.messagesContainer = jQuery('.right-column .messages', this.container);
        this.formContainer = jQuery('.right-column form', this.container);

        this.addEventListeners();
    };

    this.init();
}
