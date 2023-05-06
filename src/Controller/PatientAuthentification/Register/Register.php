<?php

namespace App\Controller\PatientAuthentification\Register;

use App\Entity\PatientTableEntity;

use Doctrine\Persistence\ManagerRegistry;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Register
{
    private $entityManager;
    private $database;

    public function __construct(ManagerRegistry $doctrine, PatientTableEntity $database)
    {
        $this->entityManager = $doctrine->getManager();
        $this->database = $database;
    }

    function requestParametersValid($body): Response
    {
        if (!is_array($body)) {
            return new Response("Invalid JSON");
        }

        $expectedParams = ['firstName', 'lastName', 'email', 'password'];

        foreach ($expectedParams as $param) {
            if (!isset($body[$param])) {
                return new Response("Missing parameter: $param");
            }
        }
    }

    function userAlreadyExists(string $email): bool
    {
        $userData = $this->entityManager->getRepository(PatientTableEntity::class)->findBy(['email' => $email['email']]);
        if ($userData) {
            return true;
        }
        return false;
    }

    public function register(Request $request)
    {
        $body = json_decode($request->getContent(), true);

        $this->requestParametersValid($body);

        if ($this->userAlreadyExists($body['email'])) {
            return new Response("User already exists");
        }

        $this->database->setFirstName($request->get('firstName'));
        $this->database->setLastName($request->get('lastName'));
        $this->database->setEmail($request->get('email'));
        $this->database->setPassword($request->get('password'));
        $this->database->setAdmin(false);
        $this->database->setCreatedAt(new \DateTime());
        $this->entityManager->persist($this->database);
        $this->entityManager->flush();
        return new Response("Patient created");
    }
}
