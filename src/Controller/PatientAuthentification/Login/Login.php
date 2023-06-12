<?php

namespace App\Controller\PatientAuthentification\Login;

use App\Entity\PatientTableEntity;

use Doctrine\Persistence\ManagerRegistry;

use OpenApi\Annotations as OA;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

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
 *      content={
 *         @OA\MediaType(
 *              mediaType="application/json",
 *              @OA\Schema(
 *                  type="object",
 *                  @OA\Property(
 *                      property="token",
 *                      type="string",
 *                      description="The token of the user"
 *                  )
 *              )
 *          )
 *      },
 *      description="Register successful, returns the newly made token of the user",
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
    private $database;
    private $jwtManager;

    public function __construct(ManagerRegistry $doctrine, PatientTableEntity $database, UserPasswordHasherInterface $passwordHasher, JWTTokenManagerInterface $jwtManager)
    {
        $this->entityManager = $doctrine->getManager();
        $this->hashPassword = $passwordHasher;
        $this->database = $database;
        $this->jwtManager = $jwtManager;
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
            $user = $userData[0];
            if ($this->hashPassword->isPasswordValid($user, $password)) {
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
            return new JsonResponse(['error' => $e->getMessage(), 'parameters' => $body], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        $email = $body['email'];
        $password = $body['password'];
        $this->database->setEmail($email);

        if ($this->validateAuthentification($email, $password)) {
            $token = $this->jwtManager->create($this->database);
            return new JsonResponse(['token' => $token], Response::HTTP_OK);
        } else {
            return new Response("Login failed: the user credentials are invalid", Response::HTTP_UNAUTHORIZED);
        }
    }
}
