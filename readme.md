Hourpicker plugin
====

Small bootstrap snippet, allowing to choose hours for scheduling, for cron scripts for instance. 
Input contains comma-delimited list of hours, in 24h format.
Based on bootstrap datepicker.

usage
---

Sample html:

```html

<html>

<head>
    <script type="text/javascript" src="/js/jquery/jquery.min.js"></script>
    <script type="text/javascript" src="/js/bootstrap/js/bootstrap.js"></script>
    <script type="text/javascript" src="/js/bootstrap-hourpicker.js"></script>

    <link type="text/css" href="/css/bootstrap.css" rel="stylesheet" media="screen, projection" />
    <link type="text/css" href="/css/bootstrap-responsive.css" rel="stylesheet" media="screen, projection" />
    <link type="text/css" href="/css/bootstrap-hourpicker.css" rel="stylesheet" media="screen, projection" />
</head>
<body>
<div class="container manibody">
    <div class="row">
        <form class="form">
            <input type="text" data-hourpicker="hourpicker" name="schedule" value="" />
        </form>
    </div>
</div>
</body>
</html>

```

