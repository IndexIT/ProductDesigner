<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{config('app.name')}}</title>

        <style type="text/css">
            body{
                margin:0;
            }

            a:link, a:active, a:visited {
                text-decoration: none!important;
            }
        </style>
        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <!-- <script type="text/babel" defer src="/js/app.js"></script> -->
        <script defer src="{{ mix('/js/index.js') }}"></script>
    </head>
    <body>
        <div id="root">
        </div>
    </body>
</html>