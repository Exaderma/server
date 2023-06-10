<?php

namespace App\Controller\link;

use App\Entity\PatientTableEntity;
use App\Entity\ProfessionalTableEntity;
use App\Entity\LinkUserTableEntity;

use App\Utils\guidv4;

use Doctrine\Persistence\ManagerRegistry;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LinkUser
{
    public function __construct()
    {
    }

    public function link(Request $request, ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $body = json_decode($request->getContent(), true);
        $patientId = $body['patientId'];
        
        return new Response(json_encode($body), Response::HTTP_OK);
    }

    public function generateCode(ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $doctors = $entityManager->getRepository(ProfessionalTableEntity::class)->findBy(['id' => 1]);

        $code = guidv4();
        $doctors->setCode($code);
        $entityManager->persist($doctors);
        $entityManager->flush();

        return new Response(json_encode($code), Response::HTTP_OK);
    }

    public function getLink(ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $links = $entityManager->getRepository(LinkUserTableEntity::class)->findAll();

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
}