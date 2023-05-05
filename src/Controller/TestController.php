<?php

namespace App\Controller;

use Doctrine\ORM\EntityManager;
use App\Entity\PatientTableEntity;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

class TestController
{
    public function index()
    {
        dd("TestController");
    }

    public function test()
    {
        $age = $_GET['age'];
        
        dd("test, vous avez $age ans");
    }

    public function insert(ManagerRegistry $doctrine, Request $request)
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
    
    public function get(ManagerRegistry $doctrine, Request $request)
    {
        $entityManager = $doctrine->getManager();
        $db = $entityManager->getRepository(PatientTableEntity::class)->findAll();
        dd($db);
    }
}
