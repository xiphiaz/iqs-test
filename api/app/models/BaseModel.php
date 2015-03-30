<?php

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class BaseModel extends \Eloquent
{

    /**
     * @param $id
     * @param array $columns
     */
    public static function findOrFail($id, $columns = array('*'))
    {
        if ( ! is_null($model = static::find($id, $columns))){
            return $model;
        }

        throw new NotFoundHttpException(get_class(static::getModel()) . ' not found');
    }

}