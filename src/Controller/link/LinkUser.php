<?php

namespace App\Controller\link;

use App\Entity\PatientTableEntity;
use App\Entity\ProfessionalTableEntity;
use App\Entity\LinkUserTableEntity;

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
        $doctorId = $body['doctorId'];

        $patient = $entityManager->getRepository(PatientTableEntity::class)->findOneBy(['id' => $patientId]);
        $doctor = $entityManager->getRepository(ProfessionalTableEntity::class)->findOneBy(['id' => $doctorId]);

        if ($patient && $doctor) {
            $link = new LinkUserTableEntity();
            $link->setPatientId($patientId);
            $link->setDoctorId($doctorId);

            $entityManager->persist($link);
            $entityManager->flush();

            return new Response('Link created', Response::HTTP_OK);
        }

        return new Response('Link not created', Response::HTTP_BAD_REQUEST);
    }

    public function getLink(ManagerRegistry $doctrine): Response
    {
        $entityManager = $doctrine->getManager();
        $links = $entityManager->getRepository(LinkUserTableEntity::class)->findAll();

        $response = [];
        foreach ($links as $link) {
            $response[] = [
                'id' => $link->getId(),
                'patientId' => $link->getDoctorId(),
                'doctorId' => $link->getPatientId(),
            ];
        }

        return new Response(json_encode($response), Response::HTTP_OK);
    }
}