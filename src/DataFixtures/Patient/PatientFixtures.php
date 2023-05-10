<?php

namespace App\DataFixtures\Patient;

use App\Entity\Patient\PatientTableEntity;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class PatientFixtures extends Fixture
{
    public function load(ObjectManager $manager)
    {
        $patient = new PatientTableEntity();

        $patient->setFirstName("t'as les");
        $patient->setLastName("mousquets");
        $patient->setEmail("dartagnan");
        $patient->setPassword("test");
        $patient->setAdmin(false);
        $patient->setCreatedAt(new \DateTime());

        $manager->persist($patient);
        $manager->flush();
    }
}
