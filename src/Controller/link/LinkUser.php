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

        return new Response(json_encode(['success' => 'You are now linked']), Response::HTTP_OK);
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

    public function getLinkedDoctor(TokenInterface $token): Response
    {
        $decodedJwtToken = $this->jwtManager->decode($token);
        $doctor = $this->entityManager->getRepository(ProfessionalTableEntity::class)->findOneBy(['email' => $decodedJwtToken['email']]);
        $links = $this->entityManager->getRepository(LinkUserTableEntity::class)->findBy(['professionalId' => $doctor->getId()]);

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

    public function getLinkedPatient(): Response
    {
        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $patient = $this->entityManager->getRepository(PatientTableEntity::class)->findOneBy(['email' => $decodedJwtToken['email']]);
        $links = $this->entityManager->getRepository(LinkUserTableEntity::class)->findBy(['patientId' => $patient->getId()]);

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