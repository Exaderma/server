<?php

namespace App\Tests\Controller\PatientAuthentification\Register;

use App\Repository\PatientTableRepository;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class RegisterTest extends KernelTestCase
{
    public function testSomething(): void
    {
        $kernel = self::bootKernel();
        $users = $kernel->getContainer()->get(PatientTableRepository::class)->count([]);+
        $this->assertEquals(1, $users);
    }
}
