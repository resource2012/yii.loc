<?php
/**
    Copyright (c) seon.com.ua 2013
    E-mail: info@seon.com.ua
    Author: Vic Vl
    Author e-mail: resource@i.ua
*/


class CChatWidget extends CWidget {

    public function run() {

        $jsAlias = 'application.extensions.ChatWidget.js';
        $cssAlias = 'application.extensions.ChatWidget.css';

        $jsPath = Yii::getPathOfAlias($jsAlias).DIRECTORY_SEPARATOR.'chatWidget.js';
        $cssPath = Yii::getPathOfAlias($cssAlias).DIRECTORY_SEPARATOR.'chatWidget.css';

        $jsSource = Yii::app()->assetManager->publish($jsPath);
        $cssSource = Yii::app()->assetManager->publish($cssPath);

        Yii::app()->clientScript->registerScriptFile($jsSource);
        Yii::app()->clientScript->registerCssFile($cssSource);

        $this->render('default');
    }

}


?>