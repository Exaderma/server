<?php

namespace App\Controller;

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
        return new Response("Vous avez $age ans");
    }
}
