<?php

namespace App\Controller\link;

use App\Entity\PatientTableEntity;
use App\Entity\ProfessionalTableEntity;
use App\Entity\LinkUserTableEntity;

use App\Utils\UuidGenerator as UUID;

use Doctrine\Persistence\ManagerRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use function Symfony\Component\String\u;

use OpenApi\Annotations as OA;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/patient/link", name="link", methods={"POST"})
 * 
 * @OA\Post(
 *     summary="Link a doctor to a patient",
 *    description="Link a doctor to a patient",
 * )
 * 
 * @OA\Response(
 *    response=201,
 *   description="Link successful",
 * )
 * @OA\Response(
 *   response=400,
 *  description="Link failed: invalid JSON or missing parameters in the body"
 * )
 * 
 * @OA\RequestBody(
 * required=true,
 * description="JSON containing the user credentials",
 * @OA\JsonContent(
 *    type="object",
 *   @OA\Property(
 *     property="code",
 *   type="string",
 * description="The code of the doctor"
 * ),
 * )
 * )
 */

/**
 * @Route("/professional/link", name="link_code", methods={"GET"})
 * 
 * @OA\Get(
 *  summary="Generate a code for a doctor",
 * description="Generate a code for a doctor",
 * )
 * 
 * @OA\Response(
 * response=200,
 * description="Code generated",
 * @OA\JsonContent(
 * type="string",
 * description="The code of the doctor"
 * property="code",
 * )
 * )
 * @OA\Response(
 * response=400,
 * description="Code generation failed: invalid JSON or missing parameters in the body"
 * )
 */

/**
 * @Route("/patient/getLinked", name="link_doctor", methods={"GET"})
 * 
 * @OA\Get(
 *   summary="Get the linked doctors of a patient",
 * description="Get the linked doctors of a patient",
 * )
 * 
 * @OA\Response(
 * response=200,
 * jsonContent=@OA\Schema(
 * type="array",
 * @OA\Items(
 * type="object",
 * @OA\Property(
 * property="id",
 * type="integer",
 * description="The id of the link"
 * ),
 * @OA\Property(
 * property="doctor",
 * type="string",
 * description="The email of the doctor"
 * ),
 * )
 * )
 * )
 * @OA\Response(
 * response=400,
 * description="Get linked doctors failed: invalid JSON or missing parameters in the body"
 * )
 */

/**
 * @Route("/professional/getLinked", name="link_patient", methods={"GET"})
 * 
 * @OA\Get(
 * summary="Get the linked patients of a doctor",
 * description="Get the linked patients of a doctor",
 * )
 * 
 * @OA\Response(
 * response=200,
 * jsonContent=@OA\Schema(
 * type="array",
 * @OA\Items(
 * type="object",
 * @OA\Property(
 * property="id",
 * type="integer",
 * description="The id of the link"
 * ),
 * @OA\Property(
 * property="patient",
 * type="string",
 * description="The email of the patient"
 * ),
 * )
 * )
 * )
 * @OA\Response(
 * response=400,
 * description="Get linked patients failed: invalid JSON or missing parameters in the body"
 * )
 */
class LinkUser
{
    private $uuid;
    private $jwtManager;
    private $tokenStorageInterface;
    private $entityManager;
    public function __construct(UUID $uuid, JWTTokenManagerInterface $jwtManager, TokenStorageInterface $tokenStorageInterface, ManagerRegistry $doctrine)
    {
        $this->uuid = $uuid;
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
        $this->entityManager = $doctrine->getManager();
    }

    public function link(Request $request): Response
    {
        $body = json_decode($request->getContent(), true);
        $header = $request->headers->get('Authorization');
        $decodedJwtToken = $this->decodeToken($header);

        $patient = $this->entityManager->getRepository(PatientTableEntity::class)->findOneBy(['email' => $decodedJwtToken['email']]);
        if ($patient == null) {
            return new Response(json_encode(['error' => 'You are not a patient']), Response::HTTP_BAD_REQUEST);
        }
        $doctor = $this->entityManager->getRepository(ProfessionalTableEntity::class)->findOneBy(['code' => $body['code']]);
        if ($doctor == null) {
            return new Response(json_encode(['error' => 'Doctor not found']), Response::HTTP_BAD_REQUEST);
        }
        $link = $this->entityManager->getRepository(LinkUserTableEntity::class)->findOneBy(['patient_id' => $patient->getId(), 'doctor_id' => $doctor->getId()]);

        if ($patient->getEmail() != $decodedJwtToken['email'] || $doctor == null || $link != null) {
            return new Response(json_encode(['error' => 'You can only link yourself']), Response::HTTP_BAD_REQUEST);
        }

        $link = new LinkUserTableEntity();
        $link->setPatientId($patient->getId());
        $link->setDoctorId($doctor->getId());
        $this->entityManager->persist($link);
        $this->entityManager->flush();

        return new Response(json_encode(['success' => 'You are now linked']), Response::HTTP_CREATED);
    }

    private function decodeToken(string $header): array
    {
        $token = u($header)->split(' ')[1];
        $tokenParts = explode(".", $token);
        $tokenPayload = base64_decode($tokenParts[1]);
        return json_decode($tokenPayload, true);
    }

    public function generateCode(Request $request): Response
    {
        $header = $request->headers->get('Authorization');
        $decodedJwtToken = $this->decodeToken($header);
        $doctor = $this->entityManager->getRepository(ProfessionalTableEntity::class)->findOneBy(['email' => $decodedJwtToken['email']]);

        if ($doctor == null) {
            return new Response(json_encode(['error' => 'You are not a doctor']), Response::HTTP_BAD_REQUEST);
        }
        $code = $this->uuid->guidv4();
        $doctor->setCode($code);
        $this->entityManager->persist($doctor);
        $this->entityManager->flush();

        return new Response(json_encode($code), Response::HTTP_OK);
    }

    public function getLinkedDoctor(Request $request): Response
    {
        $header = $request->headers->get('Authorization');
        $decodedJwtToken = $this->decodeToken($header);
        $doctor = $this->entityManager->getRepository(ProfessionalTableEntity::class)->findOneBy(['email' => $decodedJwtToken['email']]);
        if ($doctor == null) {
            return new Response(json_encode(['error' => 'You are not a doctor']), Response::HTTP_BAD_REQUEST);
        }
        $links = $this->entityManager->getRepository(LinkUserTableEntity::class)->findBy(['doctor_id' => $doctor->getId()]);
        if ($links == null) {
            return new Response(json_encode(['error' => 'You are not linked to any patient']), Response::HTTP_BAD_REQUEST);
        }

        $response = [];
        foreach ($links as $link) {
            $patient = $this->entityManager->getRepository(PatientTableEntity::class)->find($link->getPatientId());
            $response[] = [
                'id' => $link->getId(),
                'patient' => $patient->getEmail(),
            ];
        }

        return new Response(json_encode($response), Response::HTTP_OK);
    }

    public function getLinkedPatient(Request $request): Response
    {
        $header = $request->headers->get('Authorization');
        $decodedJwtToken = $this->decodeToken($header);
        $patient = $this->entityManager->getRepository(PatientTableEntity::class)->findOneBy(['email' => $decodedJwtToken['email']]);
        if ($patient == null) {
            return new Response(json_encode(['error' => 'You are not a patient']), Response::HTTP_BAD_REQUEST);
        }
        $links = $this->entityManager->getRepository(LinkUserTableEntity::class)->findBy(['patient_id' => $patient->getId()]);
        if ($links == null) {
            return new Response(json_encode(['error' => 'You are not linked to any doctor']), Response::HTTP_BAD_REQUEST);
        }

        $response = [];
        foreach ($links as $link) {
            $doctor = $this->entityManager->getRepository(ProfessionalTableEntity::class)->find($link->getDoctorId());
            $response[] = [
                'id' => $link->getId(),
                'doctor' => $doctor->getEmail(),
            ];
        }

        return new Response(json_encode($response), Response::HTTP_OK);
    }
}