<?php

namespace App\Controller;

use App\Entity\Client;
use App\Entity\User;
use App\Service\UtilsService;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ClientController extends AbstractController
{
    private $utilsService;

    /**
     * ClientController constructor.
     * @param UtilsService $utilsService
     */
    public function __construct(UtilsService $utilsService)
    {
        $this->utilsService = $utilsService;
    }

    /**
     * @return JsonResponse
     */
    public function getAll()
    {
        $clients = $this->getDoctrine()->getRepository(Client::class)->findAll();
        if ($clients)
        {
            $response = new JsonResponse($clients, 200);
        }else
        {
            $response = new JsonResponse('Clients not found', 404);
        }

        return $this->addCORSToResponse($response);
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function addClient(Request $request)
    {
        // Get the posted data decoded and check parameters.
        /** @var Client $submittedEntity */
        $submittedEntity = $this->utilsService->deserializeAndValidate($request, Client::class);

        if (!$this->utilsService->isValidVariable($submittedEntity))
        {
            $response = new JsonResponse("The posted entity is not valid.", 400);
            return $this->addCORSToResponse($response);
        }

        // Detect missing parameters
        if (
            !$this->utilsService->isValidVariable($submittedEntity->getName())
            ||
            !$this->utilsService->isValidVariable($submittedEntity->getEmail())
        )
        {
            $response = new JsonResponse("Missing parameters in the posted body", 400);
            return $this->addCORSToResponse($response);
        }

        // Check if there's already an client with the purposed email
        $criteria = array('email' => $submittedEntity->getEmail());
        $tmpClientByEmail = $this->getDoctrine()->getRepository(Client::class)->findBy($criteria);
        if ($tmpClientByEmail)
        {
            $response = new JsonResponse("Email already in use", 400);
            return $this->addCORSToResponse($response);
        }

        // Try to create the client
        try
        {
            $em = $this->getDoctrine()->getManager();

            $client = new Client();
            $client->setName($submittedEntity->getName());
            $client->setEmail($submittedEntity->getEmail());

            $em->persist($client);
            $em->flush();

        } catch (Exception $ex)
        {
            $response = new JsonResponse("Some error occurred while creating the new client", 400);
            return $this->addCORSToResponse($response);
        }

        if ($this->utilsService->isValidVariable($client))
        {
            $response = new JsonResponse($client->jsonSerialize(), 200);
            return $this->addCORSToResponse($response);
        }else
        {
            $response = new JsonResponse("Some error occurred while creating the new client", 400);
            return $this->addCORSToResponse($response);
        }

    }

    public function removeClient(Request $request)
    {
        // Get the posted data decoded and check parameters.
        /** @var Client $submittedEntity */
        $submittedEntity = $this->utilsService->deserializeAndValidate($request, Client::class);

        if (!$this->utilsService->isValidVariable($submittedEntity))
        {
            $response = new JsonResponse("The posted entity is not valid.", 400);
            return $this->addCORSToResponse($response);
        }

        // Detect missing parameters
        if (
            !$this->utilsService->isValidVariable($submittedEntity->getName())
            ||
            !$this->utilsService->isValidVariable($submittedEntity->getEmail())
        )
        {
            $response = new JsonResponse("Missing parameters in the posted body", 400);
            return $this->addCORSToResponse($response);
        }

        // Check if there's already an client with the purposed email
        $criteria = array('email' => $submittedEntity->getEmail());
        $tmpClientByEmail = $this->getDoctrine()->getRepository(Client::class)->findBy($criteria);
        if (!$tmpClientByEmail)
        {
            $response = new JsonResponse("Client not found in the DB", 400);
            return $this->addCORSToResponse($response);
        }
        dump($tmpClientByEmail);

        $em = $this->getDoctrine()->getManager();

        // Try to remove the client
        try
        {
            $em->remove($tmpClientByEmail[0]);
            $em->flush();
            $response = new JsonResponse("Client successfully removed", 200);
            return $this->addCORSToResponse($response);

        }catch (Exception $ex)
        {
            dump($ex);
            $response = new JsonResponse("Some error occurred while removing the client", 400);
            return $this->addCORSToResponse($response);
        }

    }

    public function addCORSToResponse(JsonResponse $response)
    {
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }
}
