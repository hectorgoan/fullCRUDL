<?php

namespace App\Controller;

use App\Entity\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ClientController extends AbstractController
{
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

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;

    }
}
