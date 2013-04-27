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

    this.init = function() {


    }

    this.init();
}
