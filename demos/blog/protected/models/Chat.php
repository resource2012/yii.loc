<?php

/**
 * This is the model class for table "tbl_chat".
 *
 * The followings are the available columns in table 'tbl_chat':
 * @property string $id
 * @property integer $id_sender
 * @property string $message
 * @property string $sended
 */
class Chat extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Chat the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_chat';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('id_sender, sended', 'required'),
			array('id_sender', 'numerical', 'integerOnly'=>true),
			array('message', 'length', 'max'=>100),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, id_sender, message, sended', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'id_sender' => 'Id Sender',
			'message' => 'Message',
			'sended' => 'Sended',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id,true);
		$criteria->compare('id_sender',$this->id_sender);
		$criteria->compare('message',$this->message,true);
		$criteria->compare('sended',$this->sended,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}


    /**
     * @param $idStart int
     * @return array
     *
     * Function for retrieving last stored in the chat messages.
     * $idStart specifies the last obtained by client message id, if
     * equal to 0 - client connected to the chat in the first time,
     * in this case number of returned messages fixed to 15
     *
     *
     *
     */
    public function getLastMessages($idStart) {

        // create database command object
        $command = Yii::app()->db->createCommand();

        // prepare query
        $command->select(
                    array(
                        "t1.*",
                        "t2.username",
                        "DATE_FORMAT(t1.sended, '%m/%e/%Y, %k:%i:%s') as sended"
                    )
                )
                ->from('{{chat}} as t1')
                ->leftJoin('{{users}} as t2', 't1.id_sender = t2.id')
                ->where(
                    array(
                        'AND',
                        't1.id > :id'
                    ),
                    array(
                        ':id' => $idStart
                    )
                )
                ->order(array('t1.id DESC'));

        if (!$idStart) {

            $command->limit(15);
        }

        // return query results
        return $command->queryAll();
    }

    public function storeMessage($messageData) {

        $this->setAttributes($messageData);
        $status = $this->insert();
        $attrs = $this->getAttributes();

        $result = $status ? $attrs : false;

        return $result;
    }
}