<?php
namespace App\Service;

use App\Entity\User;
use Exception;
use JMS\Serializer\scalar;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use JMS\Serializer\SerializerBuilder;


class UtilsService
{
    private $serializer;
    private $validator;

    /**
     * UserController constructor.
     * @param ValidatorInterface $validator
     */
    public function __construct(ValidatorInterface $validator)
    {
        /** @var SerializerBuilder $serializer */
        $this->serializer = SerializerBuilder::create()->build();
        /** @var ValidatorInterface $validator */
        $this->validator = $validator;
    }

    /**
     * @param Request $request
     * @param $entityClass
     * @return array|mixed|object|null
     */
    public function deserializeAndValidate(Request $request, $entityClass)
    {
        // Get content from the request
        $content = $request->getContent();
        try
        {
            $entity = $this->serializer->deserialize($content, $entityClass, 'json');
        }catch (Exception $e) {
            return null;
        }


        // Validate the received entity
        $errors = $this->validator->validate($entity);
        if (count($errors) > 0) {
            return null;
        }

        return $entity;
    }


    /**
     * @param $var
     * @return bool
     */
    public function isValidVariable($var)
    {
        if (isset($var) && $var != null)
        {
            return true;
        }else
        {
            return false;
        }
    }
}

