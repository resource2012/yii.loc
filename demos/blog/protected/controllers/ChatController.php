<?php

class ChatController extends Controller
{
	public function actionGetMessages() {
        $response = array(
            'status' => true,
            'records' => array()
        );

		$id = (int)Yii::app()->request->getPost('id', 0);
        $messages = Chat::model()->getLastMessages($id);

        $response['records'] = $messages;

        echo json_encode($response);
	}

	public function actionSendMessage() {

        $data = Yii::app()->request->getPost('chat', array());
        $store = array();

        // prepare data for saving
        $store['message'] = htmlspecialchars($data['text']);
        $store['id_sender'] = (int)Yii::app()->user->id;
        $store['sended'] = date('d-m-Y H:i:s');

        // try to store message
        $result = Chat::model()->storeMessage($store);

        $response = array(
            'status' => (bool)$result,
            'records' => $result
        );

        echo json_encode($response);
	}


}