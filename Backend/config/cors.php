<?php

return [
    'paths' => [
        'api/*',
        'sanctum/csrf-cookie',
        'login',
        'logout',
        'user', // optional if you're using it directly
    ],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:3000'], // frontend origin (Next.js)

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
