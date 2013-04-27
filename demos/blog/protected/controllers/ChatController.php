<?php
/**
 * @author     Vic Vl <resource@i.ua>
 * @copyright  seon.com.ua 2013
 * @license   http://www.gnu.org/licenses/gpl.html  GPL v.3 or later
 * @author e-mail: resource@i.ua
 *
 * Class ChatController
 */


class ChatController extends Controller
{

    /**
     * Ajax action. Used to return json-encoded messages list
     * to the client script
     *
     * @return string
     */
    public function actionGetMessages() {

        // prepare response array
        $response = array(
            'status' => true,
            'records' => array()
        );

        // get last message id from client, 0 by default
		$id = (int)Yii::app()->request->getPost('lastMessageId', 0);

        // get messages list from model
        $messages = Chat::model()->getLastMessages($id);

        // add messages list to return array
        $response['records'] = $messages;

        // encode return arra to JSON
        echo json_encode($response);

        // force app to end
        Yii::app()->end();
	}


    /**
     * Store new message function.
     * Returns json encoded result (bool) of the new message stope operation.
     *
     * @return string
     */
    public function actionSendMessage() {

        // get data, sent by client
        $data = Yii::app()->request->getPost('chat', array());

         // try to store message
        $model = new Chat();
        $result = $model->storeMessage($data);

        // prepare return array, set status
        $response = array(
            'status' => (bool)$result
        );

        // encode return array
        echo json_encode($response);

        // force app to end
        Yii::app()->end();
	}


    /**
     * @return array action filters
     */
    public function filters()
    {
        return array(
            'accessControl', // perform access control for CRUD operations
        );
    }

    /**
     * Specifies the access control rules.
     * This method is used by the 'accessControl' filter.
     * @return array access control rules
     */
    public function accessRules()
    {
        return array(
            array('allow',  // allow all users to send and retrieve messages.
                'actions'=>array('sendMessage','getMessages'),
                'users'=>array('*'),
            ),
            array('deny',  // deny all users
                'users'=>array('*'),
            ),
        );
    }
}