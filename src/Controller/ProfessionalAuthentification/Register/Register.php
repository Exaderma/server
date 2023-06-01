<?php

namespace App\Controller\ProfessionalAuthentification\Register;

use App\Entity\ProfessionalTableEntity;
use App\Utils\Authentification\hashPassword\hashPassword;

use Doctrine\Persistence\ManagerRegistry;

use OpenApi\Annotations as OA;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/** 
 * @Route("/Professional/register", name="register", methods={"POST"})
 * 
 * @OA\Post(
 *      summary="Register route to register the user's account",
 *      description="Verify the parameters, the validity of the user credentials and makes sure the user doesn't already exist",
 * )
 * 
 * @OA\Response(
 *      response=201,
 *      description="Register successful",
 * )
 * @OA\Response(
 *      response=400,
 *     description="Register failed: invalid JSON or missing parameters in the body"
 * )
 * @OA\Response(
 *      response=409,
 *      description="Register failed: the user already exists"
 * )
 * @OA\Response(
 *      response=500,
 *      description="Register failed: internal server error"
 * )
 * 
 * @OA\RequestBody(
 *      required=true,
 *      description="JSON containing the user credentials",
 *      @OA\JsonContent(
 *          type="object",   
 *          @OA\Property(
 *              property="firstName",
 *              type="string",
 *              description="User first name"
 *          ),
 *          @OA\Property(
 *              property="lastName",
 *              type="string",
 *              description="User last name"
 *          ),
 *          @OA\Property(
 *              property="email",
 *              type="string",
 *              description="User email"
 *          ),
 *          @OA\Property(
 *              property="password",
 *              type="string",
 *              description="User password"
 *         )
 *    )
 * )
 * 
 * @OA\Tag(name="Professional")
 * 
 */

class Register
{
    private $entityManager;
    private $database;
    private $hashPassword;

    public function __construct(ManagerRegistry $doctrine, ProfessionalTableEntity $database)
    {
        $this->entityManager = $doctrine->getManager();
        $this->database = $database;
        $this->hashPassword = new hashPassword();
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
        $userData = $this->entityManager->getRepository(ProfessionalTableEntity::class)->findBy(['email' => $email]);
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
            return new Response($e->getMessage(), Response::HTTP_INTERNAL_SERVER_ERROR);
        }

        if ($this->userAlreadyExists($body['email'])) {
            return new Response("User already exists", Response::HTTP_CONFLICT);
        }

        $this->database->setFirstName($body['firstName']);
        $this->database->setLastName($body['lastName']);
        $this->database->setEmail($body['email']);
        $this->database->setPassword($this->hashPassword->hashPassword($body['password']));
        $this->database->setAdmin(false);
        $this->database->setCreatedAt(new \DateTime());
        $this->entityManager->persist($this->database);
        $this->entityManager->flush();
        return new Response("Professional created", Response::HTTP_CREATED);
    }
}
