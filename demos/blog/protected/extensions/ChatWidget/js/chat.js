var ChatWidget = function() {

    var self = this;

    this.URL_GET = '/index.php?r=chat/getMessages';
    this.URL_SEND = '/index.php?r=chat/sendMessage';
    this.TIMEOUT = '';

    this.container = null;
    this.buttonExpand = null;
    this.messagesContainer = null;

    this.lastMessageId = 0;

    this.getMessages = function() {


    };

    this.processMessages = function(response) {

    };

    this.drawMessage = function(messageData) {


    };

    this.sendMessage = function() {


    };

    this.init = function() {


    }

    this.init();
}
