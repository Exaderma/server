<?php

namespace App\Controller\PatientAuthentification\Login;

use App\Entity\PatientTableEntity;
use App\Utils\Authentification\hashPassword\hashPassword;

use Doctrine\Persistence\ManagerRegistry;

use OpenApi\Annotations as OA;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/** 
 * @Route("/patient/login", name="patient_login", methods={"POST"})
 * 
 * @OA\Post(
 *      summary="Login route to access the application",
 *      description="Verify the parameters and the validity of the user credentials",
 * )
 * 
 * @OA\Response(
 *      response=200,
 *      description="Login successful",
 * )
 * @OA\Response(
 *      response=400,
 *      description="Login failed: invalid JSON or missing parameters in the body"
 * )
 * @OA\Response(
 *      response=401,
 *      description="Login failed: the user credentials are invalid"
 * )
 * 
 * @OA\RequestBody(
 *      required=true,
 *      description="JSON containing the user credentials",
 *      @OA\JsonContent(
 *          type="object",   
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
 * @OA\Tag(name="Patient")
 * 
 */

class Login
{

    private $entityManager;
    private $hashPassword;

    public function __construct(ManagerRegistry $doctrine)
    {
        $this->entityManager = $doctrine->getManager();
        $this->hashPassword = new hashPassword();
    }

    function requestParametersValid($body): void
    {
        if (!is_array($body)) {
            throw new \Exception("Invalid JSON");
        }

        $expectedParams = ['email', 'password'];

        foreach ($expectedParams as $param) {
            if (!isset($body[$param])) {
                throw new \Exception("Missing parameter: $param");
            }
        }
    }

    function validateAuthentification(string $email, string $password): bool
    {
        $userData = $this->entityManager->getRepository(PatientTableEntity::class)->findBy(['email' => $email]);

        if ($userData) {
            $hashedPassword = $userData[0]->getPassword();
            if ($this->hashPassword->verifyPassword($password, $hashedPassword)) {
                return true;
            }
        }
        return false;
    }

    function login(Request $request)
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

        $email = $body['email'];
        $password = $body['password'];

        if ($this->validateAuthentification($email, $password)) {
            return new Response("Login successful", Response::HTTP_OK);
        } else {
            return new Response("Login failed", Response::HTTP_UNAUTHORIZED);
        }
    }
}