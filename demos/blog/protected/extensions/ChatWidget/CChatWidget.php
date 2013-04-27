<?php
/**
 * @package    ChatWidget
 * @author     Vic Vl <resource@i.ua>
 * @copyright  seon.com.ua 2013
 * @license   http://www.gnu.org/licenses/gpl.html  GPL v.3 or later
 * @author e-mail: resource@i.ua
 *
 * Chat widget class.
*/


class CChatWidget extends CWidget {

    public function run() {

        // get path's aliases (for script and styles)
        $jsAlias = 'application.extensions.ChatWidget.js';
        $cssAlias = 'application.extensions.ChatWidget.css';

        // get files full names (scripts and styles)
        $jsPath = Yii::getPathOfAlias($jsAlias).DIRECTORY_SEPARATOR.'chatWidget.js';
        $cssPath = Yii::getPathOfAlias($cssAlias).DIRECTORY_SEPARATOR.'chatWidget.css';

        // publish these files
        $jsSource = Yii::app()->assetManager->publish($jsPath);
        $cssSource = Yii::app()->assetManager->publish($cssPath);

        // register files to page
        Yii::app()->clientScript->registerScriptFile($jsSource);
        Yii::app()->clientScript->registerCssFile($cssSource);

        // render template
        $this->render('default');
    }

}


?>