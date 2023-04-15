<?php

use App\Kernel;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

$request = \Symfony\Component\HttpFoundation\Request::createFromGlobals();
$request->server->set('SERVER_PORT', '8080');

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};