<?php
/**
    Copyright (c) seon.com.ua 2013
    E-mail: info@seon.com.ua
    Author: Vic Vl
    Author e-mail: resource@i.ua
*/

?>
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

                <?php
                    echo CHtml::hiddenField('chat[uid]', (int)Yii::app()->user->id);
                ?>

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