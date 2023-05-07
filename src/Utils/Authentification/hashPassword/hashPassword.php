<?php

namespace App\Utils\Authentification\hashPassword;

class hashPassword
{
    public static function hashPassword($password): string
    {
        $hash = password_hash($password, PASSWORD_ARGON2I);
        return $hash;
    }

    public static function verifyPassword(string $password, string $hashedPassword): bool
    {
        if (password_verify($password, $hashedPassword))
            return true;
        else
            return false;
    }
}
