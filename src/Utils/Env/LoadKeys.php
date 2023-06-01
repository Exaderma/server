<?php

namespace App\Utils\Env;

class LoadKeys
{
    public function onKernelRequest()
    {
        $privateKeyPath = __DIR__ . '/../../../config/jwt/private.pem';
        $privateKeyContents = file_get_contents($privateKeyPath);

        putenv("JWT_SECRET_KEY=" . $privateKeyContents);

        $publicKeyPath = __DIR__ . '../../../config/jwt/public.pem';
        $publicKeyContents = file_get_contents($publicKeyPath);

        putenv("JWT_PUBLIC_KEY=" . $publicKeyContents);
    }
}
