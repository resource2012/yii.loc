var ChatWidget = function() {

    var self = this;

    this.URL_GET = '/index.php?r=chat/getMessages';
    this.URL_SEND = '/index.php?r=chat/sendMessage';
    this.TIMEOUT = '';

    this.container = null;
    this.buttonExpand = null;
    this.messagesContainer = null;
    this.formContainer = null;
    this.formText = null;

    this.lastMessageId = 0;

    this.layoutMessage = null;
    this.layoutError = null;

    this.getMessages = function() {

        jQuery.post(
            this.URL_GET,
            {
                'lastMessageId' : this.lastMessageId
            },
            function(response) {

                self.processMessages(response);
            },
            'json'
        );
    };

    this.processMessages = function(response) {

        var length = null,
            counter = null,
            data = '';

        if (response.status) {

            length = response.records.length;
            this.lastMessageId = response.records[length-1].id;

            for (counter = 0; counter < length; counter++) {

                data += this.drawMessage(response.records[counter]);
            }

            setTimeout(function() {

               self.getMessages();
            });

        } else {

            data += this.drawServiceError();
        }

        this.messagesContainer.append(data);
    };

    this.drawMessage = function(messageData) {


    };


    this.drawServiceError = function() {


    };

    this.sendMessage = function() {

        var data = this.formContainer.serialize();
        this.formText.val('');

        jQuery.post(
            this.URL_SEND,
            data,
            function(response) {},
            'json'
        );
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

    this.loadLayouts = function() {

        this.layoutError = jQuery('script[type="layout/chatError"]').html();
        this.layoutMessage = jQuery('script[type="layout/chatMessage"]').html();

        console.log(this.layoutError);
        console.log(this.layoutMessage);
    };

    this.init = function() {

        this.container = jQuery('#widgetChat');
        this.buttonExpand = jQuery('.left-column', this.container);
        this.messagesContainer = jQuery('.right-column .messages', this.container);
        this.formContainer = jQuery('.right-column form', this.container);
        this.formText = jQuery('input[name="chat[message]"]', this.formContainer);

        this.loadLayouts();
        this.addEventListeners();
        this.getMessages();
    };

    this.init();
};