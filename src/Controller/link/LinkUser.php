<?php

namespace App\Controller\link;

use App\Entity\PatientTableEntity;
use App\Entity\ProfessionalTableEntity;
use App\Entity\LinkUserTableEntity;

use App\Utils\UUID;

use Doctrine\Persistence\ManagerRegistry;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class LinkUser
{
    private $uuid;
    private $jwtManager;
    private $tokenStorageInterface;
    public function __construct(UUID $uuid, JWTTokenManagerInterface $jwtManager, TokenStorageInterface $tokenStorageInterface)
    {
        $this->uuid = $uuid;
        $this->jwtManager = $jwtManager;
        $this->tokenStorageInterface = $tokenStorageInterface;
    }

    public function link(Request $request, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $body = json_decode($request->getContent(), true);
        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());

        $patient = $entityManager->getRepository(PatientTableEntity::class)->findOneBy(['email' => $body['email']]);
        $doctor = $entityManager->getRepository(ProfessionalTableEntity::class)->findOneBy(['code' => $body['code']]);
        $link = $entityManager->getRepository(LinkUserTableEntity::class)->findOneBy(['patientId' => $patient->getId(), 'professionalId' => $doctor->getId()]);

        if ($patient->getEmail() != $decodedJwtToken['email'] || $doctor == null || $link != null) {
            return new Response(json_encode(['error' => 'You can only link yourself']), Response::HTTP_BAD_REQUEST);
        }

        $link = new LinkUserTableEntity();
        $link->setPatientId($patient->getId());
        $link->setDoctorId($doctor->getId());
        $entityManager->persist($link);
        $entityManager->flush();

        return new Response(json_encode(['success' => 'You are now linked']), Response::HTTP_OK);
    }

    public function generateCode(ManagerRegistry $doctrine, Request $request): Response
    {
        $body = json_decode($request->getContent(), true);
        $entityManager = $doctrine->getManager();
        $doctors = $entityManager->getRepository(ProfessionalTableEntity::class)->findOneBy(['email' => $body['email']]);

        $code = $this->uuid->guidv4();
        $doctors->setCode($code);
        $entityManager->persist($doctors);
        $entityManager->flush();

        return new Response(json_encode($code), Response::HTTP_OK);
    }

    public function getLinkedDoctor(ManagerRegistry $doctrine): Response
    {
        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $entityManager = $doctrine->getManager();
        $doctor = $entityManager->getRepository(ProfessionalTableEntity::class)->findOneBy(['email' => $decodedJwtToken['email']]);
        $links = $entityManager->getRepository(LinkUserTableEntity::class)->findBy(['professionalId' => $doctor->getId()]);

        $response = [];
        foreach ($links as $link) {
            $patient = $entityManager->getRepository(PatientTableEntity::class)->find($link->getPatientId());
            $response[] = [
                'id' => $link->getId(),
                'patient' => $patient->getEmail(),
            ];
        }

        return new Response(json_encode($response), Response::HTTP_OK);
    }

    public function getLinkedPatient(ManagerRegistry $doctrine): Response
    {
        $decodedJwtToken = $this->jwtManager->decode($this->tokenStorageInterface->getToken());
        $entityManager = $doctrine->getManager();
        $patient = $entityManager->getRepository(PatientTableEntity::class)->findOneBy(['email' => $decodedJwtToken['email']]);
        $links = $entityManager->getRepository(LinkUserTableEntity::class)->findBy(['patientId' => $patient->getId()]);

        $response = [];
        foreach ($links as $link) {
            $doctor = $entityManager->getRepository(ProfessionalTableEntity::class)->find($link->getDoctorId());
            $response[] = [
                'id' => $link->getId(),
                'doctor' => $doctor->getEmail(),
            ];
        }

        return new Response(json_encode($response), Response::HTTP_OK);
    }
}