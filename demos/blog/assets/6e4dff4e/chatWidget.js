/**
 * @package    ChatWidget
 * @author     Vic Vl <resource@i.ua>
 * @copyright  seon.com.ua 2013
 * @license   http://www.gnu.org/licenses/gpl.html  GPL v.3 or later
 *
 *
 * Constructor function for the ChatWidget.
 *
 * Provides loading and send from/to server text messages.
 */


var ChatWidget = function() {

    var self = this;

    this.URL_GET = '/index.php/chat/getMessages';   // url for retrieving messages
    this.URL_SEND = '/index.php/chat/sendMessage';  // orf for sending messages
    this.TIMEOUT = 5000;    // asking server for a new messages period

    // cached DOM elements pointers
    this.container = null;          // main widget controller
    this.buttonExpand = null;       // messages container slide button (left side)
    this.messagesContainer = null;  // contains all retrieved messages or error
    this.formContainer = null;      // <form> tag (contains text field and send button)
    this.formText = null;           // text input in the form

    this.lastMessageId = 0; // id of the last obtained message

    this.layoutMessage = null;  // layout for message
    this.layoutError = null;    // layout for error

    /**
     * @param cyclic Boolean
     *
     * Function send request to server to get new messages list.
     * cyclic variable optional, if set to true - new request will
     * be sent after timeout, specified in the this.TIMEOUT.
     *
     * NOTE: cyclic is passed to the response function.
     */
    this.getMessages = function(cyclic) {

        // validate cyclic parameter, if not set
        var cycle = cyclic || false;

        // send request to server, main parameter - last message id
        jQuery.post(
            this.URL_GET,
            {
                'lastMessageId' : this.lastMessageId
            },
            function(response) {

                self.processMessages(response, cycle);
            },
            'json'
        );
    };

    /**
     * @param response Object
     * @param cycle Boolean
     *
     * Callback function for the get new messages from server request.
     * Retrieves extra parameter - cycle (passed as cyclic in this.getMessages),
     * if true - will be sent new get messages request.
     */
    this.processMessages = function(response, cycle) {

        var length = null,// number of elements in the response.records array
            counter = null,// used in for( ... ) loop
            data = '';  // text representation to be displayed on the page

        // if response success
        if (response.status) {

            length = response.records.length; // get number of retrieved records
            response.records.reverse(); // records are in the reverse position, so reverse it

            // if there are any records
            if (length) {

                this.lastMessageId = response.records[length-1].id; // save last obtained id

                // generate html for each record
                for (counter = 0; counter < length; counter++) {

                    data += this.drawMessage(response.records[counter]);
                }

            }

            // if cycle set to true - send new request after timeuot
            if (cycle) {

                setTimeout(function() {

                        self.getMessages(true);
                    },
                    this.TIMEOUT);
            }

        } else {    // if response have errors

            // display error
            data += this.drawServiceError();
        }

        // draw html to page
        this.appendMessages(data)
    };

    /**
     * @param messageData Object
     * @returns String
     *
     * Generate single message html from layout.
     * Message data (object) passed as an parameter to function.
     */
    this.drawMessage = function(messageData) {

        // validate user name - if null, than it's guest
        messageData['username'] = messageData['username'] || 'Guest';

        // get empty layout html
        var text = this.layoutMessage;

        // replace specified in layout tags with message data
        text = text.replace(
            /\{\{(\w+)\}\}/g,
            function(a){

                a = a.replace(/{/g,'');
                a = a.replace(/}/g,'');

                return messageData[a];
            }
        );

        return text;
    };

    /**
     * @param data String
     *
     * Function draws html with message (or error) to the message container,
     * plus scrolls message container to the bottom position.
     */
    this.appendMessages = function(data) {

        this.messagesContainer.append(data);

        // soft scroll, using animation
        this.messagesContainer.animate(
            {
                 'scrollTop': this.messagesContainer.height()
            },
            300
        );
    }

    /**
     * @returns String
     *
     * Returns error message html from layout.
     */
    this.drawServiceError = function() {

        return this.layoutError;
    };


    /**
     * Send new message to server.
     * First - serialize sending form, then clear text field, and
     * then send request. On response send request to retrieve new messages.
     */
    this.sendMessage = function() {

        var data = this.formContainer.serialize();

        if (this.formText.val().length) {

            this.formText.val('');

            jQuery.post(
                this.URL_SEND,
                data,
                function(response) {

                    self.getMessages(false);
                },
                'json'
            );
        }
    };


    /**
     * Slide container left and right.
     * If container has class "visible" - slide it
     * right, else - slide it left.
     */
    this.slideContainer = function() {

        var visible = this.container.is('.visible');

        if (visible) {

            this.hideContainer();

        } else {

            this.showContainer();
        }

    };

    /**
     * Slide container left, add extra class.
     */
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
    };

    this.init = function() {

        this.container = jQuery('#widgetChat');
        this.buttonExpand = jQuery('.left-column', this.container);
        this.messagesContainer = jQuery('.right-column .messages', this.container);
        this.formContainer = jQuery('.right-column form', this.container);
        this.formText = jQuery('input[name="chat[message]"]', this.formContainer);

        this.loadLayouts();
        this.addEventListeners();
        this.getMessages(true);
    };

    this.init();
};
