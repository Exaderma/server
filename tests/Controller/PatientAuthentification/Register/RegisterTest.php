<?php

namespace App\Tests\Controller\PatientAuthentification\Register;

use App\Repository\PatientTableRepository;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RegisterTest extends WebTestCase
{
    public function testRegisterMissingParameter()
    {
        $client = static::createClient();
        $crawler = $client->request('POST', '/patient/register', [], [], ['CONTENT_TYPE' => 'application/json'],
            '{
                "firstName": "Lucas",
                "lastName": "Soury",
                "email": "lucas.soury@oragnge.fr"
            }'
        );
        $this->assertResponseStatusCodeSame(400);
    }

    public function testRegisterMissingJSON()
    {
        $client = static::createClient();
        $crawler = $client->request('POST', '/patient/register', [], [], ['CONTENT_TYPE' => 'application/json'],
            '{}'
        );
        $this->assertResponseStatusCodeSame(400);
    }

    // public function testRegisterUserAlreadyExists()
    // {
    //     $client = static::createClient();

    //     $client->request('POST', '/patient/register', [], [], ['CONTENT_TYPE' => 'application/json'],
    //         '{
    //             "firstName": "Lucas",
    //             "lastName": "Soury",
    //             "email": "lucas.soury@exists.fr",
    //             "password": "password"
    //         }'
    //     );
    //     $client->request('POST', '/patient/register', [], [], ['CONTENT_TYPE' => 'application/json'],
    //         '{
    //             "firstName": "Lucas",
    //             "lastName": "Soury",
    //             "email": "lucas.soury@exists.fr",
    //             "password": "password"
    //         }'
    //     );

    //     $this->assertResponseStatusCodeSame(409);
    // }

    // public function testRegisterWorkingAsIntended()
    // {
    //     $client = static::createClient();
    //     $crawler = $client->request('POST', '/patient/register', [], [], ['CONTENT_TYPE' => 'application/json'],
    //         '{
    //             "firstName": "Lucas",
    //             "lastName": "Soury",
    //             "email": "lucas.soury@oragnge.fr",
    //             "password": "password"
    //         }'
    //     );
    //     $this->assertResponseStatusCodeSame(200);
    // }
}
