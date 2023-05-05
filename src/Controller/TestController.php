<?php

namespace App\Controller;

use Doctrine\ORM\EntityManager;
use App\Entity\PatientTableEntity;
use App\Entity\DoctorTableEntity;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class TestController
{
    public function index()
    {
        dd("TestController");
    }

    public function test() : Response
    {
        $age = $_GET['age'];
        return new Response("Vous avez $age ansaaaaaa");
    }

    public function insertPatient(ManagerRegistry $doctrine, Request $request)
    {
        $entityManager = $doctrine->getManager();
        $db = new PatientTableEntity();
        $db->setFirstName("test");
        $db->setLastName("test");
        $db->setEmail("pipi.caca@prout.ff");
        $db->setPassword("test");
        $db->setAdmin(false);
        $db->setCreatedAt(new \DateTime());
        $entityManager->persist($db);
        $entityManager->flush();
        dd("insert");
    }
    
    public function getPatient(ManagerRegistry $doctrine, Request $request)
    {
        $entityManager = $doctrine->getManager();
        $db = $entityManager->getRepository(PatientTableEntity::class)->findAll();
        dd($db);
    }

    public function insertDoctor(ManagerRegistry $doctrine, Request $request)
    {
        $entityManager = $doctrine->getManager();
        $db = new DoctorTableEntity();
        $db->setFirstName("test");
        $db->setLastName("test");
        $db->setEmail("toto@toto");
        $db->setPassword("test");
        $db->setRole("test");
        $db->setAdmin(false);
        $db->setCreatedAt(new \DateTime());
        $entityManager->persist($db);
        $entityManager->flush();
        dd("insert");
    }

    public function getDoctor(ManagerRegistry $doctrine, Request $request)
    {
        $entityManager = $doctrine->getManager();
        $db = $entityManager->getRepository(DoctorTableEntity::class)->findAll();
        dd($db);
    }
}
