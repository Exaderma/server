<?php

namespace App\Tests\Controller\PatientAuthentification\Register;

use App\Repository\PatientTableRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class LoginTest extends WebTestCase
{

    public function testLoginMissingParameter()
    {
        $client = static::createClient();
        $crawler = $client->request('POST', '/patient/login', [], [], ['CONTENT_TYPE' => 'application/json'],
            '{
                "email": "lucas.soury@oragnge.fr"
            }'
        );
        $this->assertResponseStatusCodeSame(400);
    }

    public function testLoginMissingJSON()
    {
        $client = static::createClient();
        $crawler = $client->request('POST', '/patient/login', [], [], ['CONTENT_TYPE' => 'application/json'],
            '{}'
        );
        $this->assertResponseStatusCodeSame(400);
    }
}
