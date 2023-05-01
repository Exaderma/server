<?php

namespace App\Controller;

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
}
