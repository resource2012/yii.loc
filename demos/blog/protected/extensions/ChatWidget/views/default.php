<?php
/* @param $this CWidget */

/**
 * @package    ChatWidget
 * @author     Vic Vl <resource@i.ua>
 * @copyright  seon.com.ua 2013
 * @license   http://www.gnu.org/licenses/gpl.html  GPL v.3 or later
 * @author e-mail: resource@i.ua
 *
 * Chat widget template.
 */



// add js controller object initialisation to the page heading
Yii::app()->clientScript->registerScript(
    'ChatScript',
    'jQuery(document).ready(function(e) {

        var chatController = new window.ChatWidget();
    });',
    CClientScript::POS_HEAD
);

?>
<!--layouts for script-->
<script type="layout/chatMessage">
    <div class="message-item" data-id="{{id}}">
        <span class="time">{{sended}}</span>
        <span class="user">{{username}}</span>:
        <span class="text">{{message}}</span>
    </div>
</script>

<script type="layout/chatError">
    <div class="error-item">
        We're sorry, but chat is not available at the moment.
    </div>
</script>
<!--/layouts for script-->



<div id="widgetChat">
    <div class="left-column" title="Chat">
        <div class="inner-trap">
            <div class="triangle">
                <div class="inner-triangle"></div>
            </div>
        </div>
    </div>
    <div class="right-column">
        <div class="messages"></div>
        <div class="bottom-bar">
            <?php echo CHtml::beginForm(); ?>

                <div class="column text">
                    <?php
                        echo CHtml::textField('chat[message]', '');
                    ?>
                </div>
                <div class="column submit">
                    <?php
                        echo CHtml::submitButton('Send', array('name' => 'chat[submit]'));
                    ?>
                </div>
            <?php echo CHtml::endForm(); ?>
        </div>
    </div>
</div>