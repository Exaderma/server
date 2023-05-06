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

    function requestParametersValid($body): void
    {
        if (!is_array($body)) {
            throw new \Exception("Invalid JSON");
        }

        $expectedParams = ['firstName', 'lastName', 'email', 'password'];

        foreach ($expectedParams as $param) {
            if (!isset($body[$param])) {
                throw new \Exception("Missing parameter: $param");
            }
        }
    }

    function userAlreadyExists(string $email): bool
    {
        $userData = $this->entityManager->getRepository(PatientTableEntity::class)->findBy(['email' => $email]);
        if ($userData) {
            return true;
        }
        return false;
    }

    public function register(Request $request)
    {
        $body = json_decode($request->getContent(), true);

        try {
            $this->requestParametersValid($body);
        } catch (\Exception $e) {
            if ($e->getMessage() === "Invalid JSON")
                return new Response("Invalid JSON", Response::HTTP_BAD_REQUEST);
            if (preg_match('/Missing parameter: (\w+)/', $e->getMessage(), $matches)) {
                $parameterName = $matches[1];
                return new Response("Missing parameter: $parameterName", Response::HTTP_BAD_REQUEST);
            }
            return new Response($e->getMessage());
        }

        if ($this->userAlreadyExists($body['email'])) {
            return new Response("User already exists", Response::HTTP_CONFLICT);
        }

        $this->database->setFirstName($body['firstName']);
        $this->database->setLastName($body['lastName']);
        $this->database->setEmail($body['email']);
        $this->database->setPassword($body['password']);
        $this->database->setAdmin(false);
        $this->database->setCreatedAt(new \DateTime());
        $this->entityManager->persist($this->database);
        $this->entityManager->flush();
        return new Response("Patient created", Response::HTTP_CREATED);
    }
}
