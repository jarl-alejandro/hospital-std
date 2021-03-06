<?php
include 'helpers/conexion.php';
$qs = $pdo->query("SELECT * FROM hgc_empresa");
$row = $qs->fetch();
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <title><?= $row['hgc_nom_empr'] ?></title>

    <link type="text/css" rel="stylesheet" href="http://fonts.googleapis.com/css?family=Playfair+Display:400,700,400italic|Raleway:300,500,800|Source+Sans+Pro:300,400,600,700">
    <link type="text/css" rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    <link type="text/css" rel="stylesheet" href="assets/css/slides.css">
    <link type="text/css" rel="stylesheet" href="assets/css/a-say.css">

    <script src="https://use.typekit.net/nng8gif.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>
  </head>


  <body class="slides cards smooth  animated">
    <!-- Google Tag Manager -->
    <noscript><iframe src="//www.googletagmanager.com/ns.html?id=GTM-K4F3CF"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    '//www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-K4F3CF');</script>
    <!-- End Google Tag Manager -->

    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
      <symbol id="logo" viewBox="0 0 106 31"><path d="M17.413 14.04c-.56-5.84-5.6-7-8.52-7-4.6 0-8.6 2.92-8.6 7.52 0 3 2.4 4.88 5.28 5.8 4.24 1.64 5.88 1.84 5.88 3.36 0 1.08-1.2 1.72-2.32 1.72-.28 0-2.24 0-2.52-2.04h-6.6c.6 5.84 5.68 7.36 9.04 7.36 4.92 0 9.04-2.88 9.04-7.76 0-4.8-4-5.92-7.76-6.96-1.76-.52-3.4-1.2-3.4-2.2 0-.6.48-1.48 1.88-1.48 1.96 0 2.04 1.2 2.08 1.68h6.52zm2.222 15.96h6.64v-29.6h-6.64v29.6zm9.662-24.56h6.64v-5.04h-6.64v5.04zm0 24.56h6.64v-22.2h-6.64v22.2zm32.782-29.6h-6.64v9.28c-.72-.72-2.6-2.64-6.52-2.64-5.64 0-11 4.28-11 11.8 0 6.68 4.4 11.88 11.12 11.88 4.48 0 6.08-2.2 6.72-3.12v2.4h6.32v-29.6zm-17.52 18.4c0-2.56 1.8-5.56 5.64-5.56 1.56 0 2.96.56 3.96 1.56 1 .96 1.64 2.32 1.64 3.92.08 1.64-.52 3.08-1.56 4.12s-2.52 1.68-4.12 1.68c-3.12 0-5.56-2.28-5.56-5.68v-.04zm42.502 2.4c.52-4.08-.32-7.64-3.12-10.64-2.08-2.2-5-3.52-8.4-3.52-6.76 0-11.64 5.72-11.64 11.92 0 6.6 5.4 11.76 11.76 11.76 2.28 0 4.48-.68 6.32-2 1.88-1.28 3.44-3.2 4.52-5.68h-6.8c-.8 1.16-1.92 2.08-4.04 2.08-2.6 0-4.84-1.56-5.12-3.92h16.52zm-16.44-5.04c.16-1.04 1.52-3.52 4.96-3.52s4.8 2.48 4.96 3.52h-9.92zm34.502-2.12c-.56-5.84-5.6-7-8.52-7-4.6 0-8.6 2.92-8.6 7.52 0 3 2.4 4.88 5.28 5.8 4.24 1.64 5.88 1.84 5.88 3.36 0 1.08-1.2 1.72-2.32 1.72-.28 0-2.24 0-2.52-2.04h-6.6c.6 5.84 5.68 7.36 9.04 7.36 4.92 0 9.04-2.88 9.04-7.76 0-4.8-4-5.92-7.76-6.96-1.76-.52-3.4-1.2-3.4-2.2 0-.6.48-1.48 1.88-1.48 1.96 0 2.04 1.2 2.08 1.68h6.52z" /></symbol>
      <symbol id="logo-icon" viewBox="0 0 50 41"><path d="M4,12h42c2.2,0,4,1.8,4,4v21c0,2.2-1.8,4-4,4H4c-2.2,0-4-1.8-4-4V16C0,13.8,1.8,12,4,12z"/><path opacity="0.6" d="M45.5,9h-41C3.7,9,3,8.3,3,7.5v0C3,6.7,3.7,6,4.5,6h41C46.3,6,47,6.7,47,7.5v0C47,8.3,46.3,9,45.5,9z"/><path opacity="0.4" d="M7.5,0h35C43.3,0,44,0.7,44,1.5v0C44,2.3,43.3,3,42.5,3h-35C6.7,3,6,2.3,6,1.5v0C6,0.7,6.7,0,7.5,0z"/></symbol>
      <symbol id="close" viewBox="0 0 30 30"><path d="M15 0c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6.7 15-15-6.7-15-15-15zm5.7 19.3c.4.4.4 1 0 1.4-.2.2-.4.3-.7.3s-.5-.1-.7-.3l-4.3-4.3-4.3 4.3c-.2.2-.4.3-.7.3s-.5-.1-.7-.3c-.4-.4-.4-1 0-1.4l4.3-4.3-4.3-4.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l4.3 4.3 4.3-4.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-4.3 4.3 4.3 4.3z"/></symbol>
      <symbol id="menu" viewBox="0 0 22 22"><path d="M1 5h20c.6 0 1-.4 1-1s-.4-1-1-1h-20c-.6 0-1 .4-1 1s.4 1 1 1zm20 5h-20c-.6 0-1 .4-1 1s.4 1 1 1h20c.6 0 1-.4 1-1s-.4-1-1-1zm0 7h-20c-.6 0-1 .4-1 1s.4 1 1 1h20c.6 0 1-.4 1-1s-.4-1-1-1z"/></symbol>
      <symbol id="share" viewBox="0 0 22 22"><path d="M21 10c-.6 0-1 .4-1 1v7h-18v-7c0-.6-.4-1-1-1s-1 .4-1 1v7c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2v-7c0-.6-.4-1-1-1zM5.5 7.5c.3 0 .5-.1.7-.3l3.8-3.8v9.6c0 .6.4 1 1 1s1-.4 1-1v-9.6l3.8 3.8c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-5.5-5.5c-.1-.1-.2-.2-.3-.2-.2-.1-.5-.1-.8 0l-.3.2-5.5 5.5c-.4.4-.4 1 0 1.4.2.2.4.3.7.3z"/></symbol>
      <symbol id="facebook" viewBox="0 0 24 24"><path d="M17.4 12h-3.2v12h-4.4v-12h-2.9v-4.1h2.9v-2.4c0-3.5.9-5.5 4.8-5.5h3.2v4.1h-2c-1.5 0-1.6.6-1.6 1.7v2.1h3.6l-.4 4.1z"/></symbol>
      <symbol id="twitter" viewBox="0 1 24 23"><path d="M21.5 7.6v.6c0 6.6-5 14.1-14 14.1-2.8 0-5.4-.8-7.6-2.2l1.2.1c2.3 0 4.4-.8 6.1-2.1-2.2 0-4-1.5-4.6-3.4.3.1.6.1.9.1.5 0 .9-.1 1.3-.2-2.1-.6-3.8-2.6-3.8-5 .7.4 1.4.6 2.2.6-1.3-.9-2.2-2.4-2.2-4.1 0-.9.2-1.8.7-2.5 2.4 3 6.1 5 10.2 5.2-.1-.4-.1-.7-.1-1.1 0-2.7 2.2-5 4.9-5 1.4 0 2.7.6 3.6 1.6 1-.3 2.1-.7 3-1.3-.4 1.2-1.1 2.1-2.2 2.7 1-.1 1.9-.4 2.8-.8-.6 1.1-1.4 2-2.4 2.7z"/></symbol>
      <symbol id="dribbble" viewBox="0 0 24 24"><path d="M12 0c-6.7 0-12 5.3-12 12s5.3 12 12 12 12-5.3 12-12-5.3-12-12-12zm7.9 5.7c1.3 1.7 2.1 3.9 2.3 6.1-.4-.1-2.4-.4-4.7-.4-.8 0-1.5 0-2.3.1 0-.1-.1-.3-.3-.5l-.7-1.5c3.7-1.4 5.3-3.4 5.7-3.8zm-7.9-3.8c2.5 0 4.9.9 6.7 2.5-.3.4-1.9 2.3-5.2 3.6-1.6-2.9-3.3-5.3-3.7-5.9.6-.1 1.4-.2 2.2-.2zm-4.4 1c.4.6 2.1 3 3.7 5.8-4.4 1.2-8.2 1.2-9.2 1.2h-.1c.8-3.1 2.9-5.6 5.6-7zm-5.7 9.1v-.3h.3c1.2 0 5.6-.1 10.1-1.5l.8 1.6c-.1 0-.3 0-.4.1-5.1 1.6-7.9 6-8.3 6.7-1.6-1.7-2.5-4.1-2.5-6.6zm10.1 10.1c-2.3 0-4.4-.8-6.1-2.1.3-.5 2.4-4.4 7.9-6.3 1.3 3.6 2 6.7 2.1 7.6-1.2.6-2.6.8-3.9.8zm5.7-1.8c-.1-.8-.7-3.6-2-7.1.7-.1 1.3-.1 2-.1 2.1 0 3.7.4 4.1.5-.3 2.8-1.8 5.2-4.1 6.7z"/></symbol>
      <symbol id="pinterest" viewBox="0 0 24 24"><path d="M5.9 13.9c1.2-2-.4-2.5-.6-4-1-6.1 7.1-10.2 11.4-6 2.9 2.9 1 12-3.7 11-4.6-.9 2.2-8.1-1.4-9.5-3-1.1-4.6 3.6-3.2 5.9-.8 4-2.5 7.7-1.8 12.7 2.3-1.7 3.1-4.8 3.7-8.1 1.2.7 1.8 1.4 3.3 1.5 5.5.4 8.6-5.4 7.8-10.7-.7-4.7-5.5-7.1-10.6-6.6-4.1.4-8.1 3.7-8.3 8.3-.1 2.8.7 4.9 3.4 5.5z"/></symbol>
      <symbol id="googlePlus" viewBox="0 0 24 24"><path d="M14.9 18.1c0-2.2-1.3-3.2-2.6-4.4l-1.1-.9c-.3-.3-.8-.7-.8-1.4s.5-1.1.9-1.5c1.3-1 2.6-2.1 2.6-4.5s-1.5-3.7-2.2-4.3h2l2-1.1h-6.5c-1.7 0-3.8.3-5.6 1.7-1.4 1.2-2 2.8-2 4.2 0 2.5 1.9 4.9 5.2 4.9.3 0 .7 0 1-.1-.2.4-.3.7-.3 1.2 0 1 .5 1.6.9 2.1-1.4.1-4.1.3-6 1.4s-2.4 2.7-2.4 3.8c0 2.3 2.2 4.5 6.8 4.5 5.2.4 8.1-2.6 8.1-5.6zm-6.8-8c-2.7 0-3.9-3.5-3.9-5.6 0-.8.2-1.7.7-2.3.5-.6 1.4-1 2.2-1 2.6 0 4 3.5 4 5.8 0 .6-.1 1.6-.8 2.3-.6.4-1.4.8-2.2.8zm0 12.7c-3.4 0-5.5-1.6-5.5-3.8 0-2.2 2-3 2.7-3.2 1.3-.4 3-.5 3.3-.5h.7c2.4 1.7 3.4 2.6 3.4 4.2 0 1.8-1.6 3.3-4.6 3.3zm7-10.8h3.4v3.4h1.8v-3.4h3.4v-1.7h-3.4v-3.4h-1.8v3.4h-3.4v1.7z"/></symbol>
      <symbol id="stumbleupon" viewBox="0 0 24 24"><path d="M13.3 9.6l1.6.8 2.5-.8v-1.4c0-3-2.4-5.4-5.4-5.4s-5.4 2.4-5.4 5.4v7.5c0 .7-.6 1.3-1.3 1.3s-1.3-.6-1.3-1.3v-3.2h-4v3.2c0 3 2.4 5.4 5.4 5.4s5.4-2.4 5.4-5.4v-7.5c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3l-.1 1.4zm6.6 2.9v3.2c0 .7-.6 1.3-1.3 1.3s-1.3-.6-1.3-1.3v-3.2l-2.5.8-1.6-.8v3.2c0 3 2.4 5.4 5.4 5.4s5.4-2.4 5.4-5.4v-3.2h-4.1z"/></symbol>
      <symbol id="linkedin" viewBox="0 0 24 24"><path d="M22.2 0h-20.4c-1 0-1.8.8-1.8 1.7v20.7c0 1 .8 1.7 1.8 1.7h20.5c1 0 1.8-.8 1.8-1.7v-20.7c-.1-.9-.9-1.7-1.9-1.7zm-14.9 20.2h-3.6v-10.9h3.6v10.9zm-1.8-12.4c-1.2 0-2-.8-2-1.9 0-1.1.8-1.9 2.1-1.9 1.2 0 2 .8 2 1.9-.1 1.1-.9 1.9-2.1 1.9zm14.8 12.4h-3.6v-5.8c0-1.5-.5-2.5-1.8-2.5-1 0-1.6.7-1.9 1.3-.1.2-.1.6-.1.9v6.1h-3.6v-10.9h3.6v1.5c.5-.7 1.3-1.8 3.3-1.8 2.4 0 4.2 1.6 4.2 4.9v6.3z"/></symbol>
      <symbol id="apple" viewBox="-1 1 24 24"><path d="M17.6 13.8c0-3 2.5-4.5 2.6-4.6-1.4-2.1-3.6-2.3-4.4-2.4-1.9-.2-3.6 1.1-4.6 1.1-.9 0-2.4-1.1-4-1-2 0-3.9 1.2-5 3-2.1 3.7-.5 9.1 1.5 12.1 1 1.5 2.2 3.1 3.8 3 1.5-.1 2.1-1 3.9-1s2.4 1 4 1 2.7-1.5 3.7-2.9c1.2-1.7 1.6-3.3 1.7-3.4-.1-.1-3.2-1.3-3.2-4.9zm-3.1-9c.8-1 1.4-2.4 1.2-3.8-1.2 0-2.7.8-3.5 1.8-.8.9-1.5 2.3-1.3 3.7 1.4.1 2.8-.7 3.6-1.7z"/></symbol>
      <symbol id="tumblr" viewBox="0 0 23 23"><path d="M12.573 4.94v-4.94h-3.188c-.072.183-.11.4-.11.622-.034.107-.072.184-.072.293-.328 1.829-1.28 3.11-2.892 3.807-.476.218-.914.253-1.39.218v3.987h2.342c.039 5.603.039 8.493.039 8.64v.332c.294 2.449 1.573 3.914 3.843 4.463.914.257 1.901.366 2.892.366 1.279-.036 2.525-.256 3.771-.659v-4.685c-.731.22-1.395.402-1.977.583-1.135.333-2.087.113-2.857-.619-.073-.11-.183-.257-.221-.403-.106-.586-.178-1.206-.178-1.795v-6.222h5.083v-3.988h-5.085z"/></symbol>
      <symbol id="arrow-down" viewBox="0 0 24 24"><path d="M12 18c-.2 0-.5-.1-.7-.3l-11-10c-.4-.4-.4-1-.1-1.4.4-.4 1-.4 1.4-.1l10.4 9.4 10.3-9.4c.4-.4 1-.3 1.4.1.4.4.3 1-.1 1.4l-11 10c-.1.2-.4.3-.6.3z"/></symbol>
      <symbol id="arrow-up" viewBox="0 0 24 24"><path d="M11.9 5.9c.2 0 .5.1.7.3l11 10c.4.4.4 1 .1 1.4-.4.4-1 .4-1.4.1l-10.4-9.4-10.3 9.4c-.4.4-1 .3-1.4-.1-.4-.4-.3-1 .1-1.4l11-10c.1-.2.4-.3.6-.3z"/></symbol>
      <symbol id="arrow-left" viewBox="0 0 31 72"><path d="M30 72c-.3 0-.6-.1-.8-.4l-29-34c-.3-.4-.3-.9 0-1.3l29-36c.3-.4 1-.5 1.4-.2.4.3.5 1 .2 1.4l-28.5 35.5 28.5 33.4c.4.4.3 1.1-.1 1.4-.2.1-.5.2-.7.2z"/></symbol>
      <symbol id="arrow-right" viewBox="0 0 31 72"><path d="M1 0c.3 0 .6.1.8.4l29 34c.3.4.3.9 0 1.3l-29 36c-.3.4-1 .5-1.4.2-.4-.3-.5-1-.2-1.4l28.5-35.5-28.5-33.4c-.4-.4-.3-1.1.1-1.4.2-.1.5-.2.7-.2z"/></symbol>
      <symbol id="play" viewBox="0 0 30 30"><path d="M7 30v-30l22 15z"/></symbol>
      <symbol id="fb-like" viewBox="0 0 20 20"><path d="M0 8v12h5v-12h-5zm2.5 10.8c-.4 0-.8-.3-.8-.8 0-.4.3-.8.8-.8s.8.3.8.8c0 .4-.4.8-.8.8zm3.5-.8h9.5c1.1 0 1.7-1 1.7-1.7 0-.3-.4-1-.4-1 1.4-.3 1.7-1.2 1.7-1.7-.1-.5-.3-.9-.5-1 1-.4 1.5-1.1 1.4-1.9-.1-.8-1-1.5-1-1.5 1-.6.9-1.5.9-1.5-.3-1.3-1.5-1.7-1.7-1.7h-5.6s.3-.5.3-2.4-1.3-3.6-2.6-3.6c0 0-.7.1-1 .3v3.5l-2.7 4.4v9.8z"/></symbol>
      <symbol id="appstoreButton" viewBox="0 0 135 40"><path fill="#000" d="M135 36.2c0 2.1-1.7 3.8-3.8 3.8h-127.4c-2.1 0-3.8-1.7-3.8-3.8v-32.3c0-2.2 1.7-3.9 3.8-3.9h127.3c2.1 0 3.8 1.7 3.8 3.8l.1 32.4z"/><path fill="#ffffff" d="M30.1 19.8c0-3.2 2.6-4.8 2.8-4.9-1.5-2.2-3.9-2.5-4.7-2.5-2-.2-3.9 1.2-4.9 1.2s-2.6-1.2-4.2-1.1c-2.1 0-4.1 1.3-5.2 3.2-2.3 3.9-.6 9.7 1.6 12.9 1.1 1.6 2.4 3.3 4 3.2 1.6-.1 2.2-1 4.2-1 1.9 0 2.5 1 4.2 1s2.8-1.6 3.9-3.1c1.3-1.8 1.8-3.5 1.8-3.6-.1-.2-3.4-1.5-3.5-5.3zM26.9 10.3c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.8.9-3.8 1.9-.8.9-1.5 2.5-1.3 3.9 1.5.2 2.9-.6 3.8-1.7zM53.6 31.5h-2.3l-1.2-3.9h-4.3l-1.2 3.9h-2.2l4.3-13.3h2.6l4.3 13.3zm-3.8-5.5l-1.1-3.5c-.2-.4-.4-1.2-.7-2.5-.1.6-.3 1.4-.6 2.5l-1.2 3.5h3.6zM64.7 26.6c0 1.6-.4 2.9-1.3 3.9-.8.8-1.8 1.3-2.9 1.3-1.3 0-2.2-.5-2.7-1.4v5.1h-2.1v-10.4c0-1 0-2.1-.1-3.2h1.9l.1 1.5c.7-1.1 1.8-1.7 3.2-1.7 1.1 0 2.1.4 2.8 1.3.7.9 1.1 2.1 1.1 3.6zm-2.2.1c0-.9-.2-1.7-.6-2.3-.5-.6-1.1-.9-1.9-.9-.5 0-1 .2-1.4.5-.4.3-.7.8-.8 1.4-.1.3-.1.5-.1.7v1.6c0 .7.2 1.3.6 1.8s1 .7 1.7.7c.8 0 1.4-.3 1.9-.9.4-.8.6-1.6.6-2.6zM75.7 26.6c0 1.6-.4 2.9-1.3 3.9-.8.8-1.8 1.3-2.9 1.3-1.3 0-2.2-.5-2.7-1.4v5.1h-2.1v-10.4c0-1 0-2.1-.1-3.2h1.9l.1 1.5c.7-1.1 1.8-1.7 3.2-1.7 1.1 0 2.1.4 2.8 1.3.7.9 1.1 2.1 1.1 3.6zm-2.2.1c0-.9-.2-1.7-.6-2.3-.5-.6-1.1-.9-1.9-.9-.5 0-1 .2-1.4.5-.4.3-.7.8-.8 1.4-.1.3-.1.5-.1.7v1.6c0 .7.2 1.3.6 1.8.4.3 1 .5 1.7.5.8 0 1.4-.3 1.9-.9.4-.6.6-1.4.6-2.4zM88 27.8c0 1.1-.4 2.1-1.2 2.8-.9.8-2.1 1.2-3.6 1.2-1.4 0-2.6-.3-3.4-.8l.5-1.8c.9.6 2 .8 3.1.8.8 0 1.4-.2 1.9-.5.4-.4.7-.8.7-1.5 0-.5-.2-1-.6-1.4-.4-.4-1-.7-1.8-1-2.4-.9-3.6-2.2-3.6-3.9 0-1.1.4-2 1.2-2.7.8-.7 1.9-1 3.3-1 1.2 0 2.2.2 3 .6l-.5 1.8c-.8-.4-1.6-.6-2.5-.6-.8 0-1.3.2-1.8.6-.4.3-.5.7-.5 1.2s.2 1 .6 1.3c.4.3 1 .7 1.9 1 1.1.5 2 1 2.5 1.6.6.6.8 1.4.8 2.3zM95.1 23.5h-2.3v4.7c0 1.2.4 1.8 1.2 1.8.4 0 .7 0 .9-.1l.1 1.6c-.4.2-1 .2-1.7.2-.8 0-1.5-.3-2-.8s-.7-1.4-.7-2.6v-4.8h-1.4v-1.6h1.4v-1.8l2.1-.6v2.4h2.3l.1 1.6zM105.7 26.6c0 1.5-.4 2.7-1.3 3.6-.9 1-2.1 1.5-3.5 1.5s-2.5-.5-3.4-1.4c-.8-.9-1.3-2.1-1.3-3.5 0-1.5.4-2.7 1.3-3.7.9-.9 2-1.4 3.5-1.4 1.4 0 2.5.5 3.4 1.4.9.9 1.3 2.1 1.3 3.5zm-2.2.1c0-.9-.2-1.6-.6-2.3-.4-.8-1.1-1.1-1.9-1.1-.9 0-1.5.4-2 1.1-.4.6-.6 1.4-.6 2.3s.2 1.6.6 2.3c.5.8 1.1 1.1 1.9 1.1.8 0 1.5-.4 1.9-1.2.5-.6.7-1.3.7-2.2zM112.6 23.8c-.2 0-.4-.1-.7-.1-.8 0-1.3.3-1.7.8s-.5 1.1-.5 1.9v5h-2.1v-6.6c0-1.1 0-2.1-.1-3h1.9l.1 1.8h.1c.2-.6.6-1.1 1.1-1.5.5-.3 1-.5 1.5-.5h.5v2.2h-.1zM122.2 26.3c0 .4 0 .7-.1 1h-6.4c0 .9.3 1.7.9 2.2.5.4 1.2.7 2.1.7.9 0 1.8-.2 2.6-.5l.3 1.5c-.9.4-2 .6-3.2.6-1.5 0-2.7-.4-3.5-1.3s-1.3-2.1-1.3-3.5.4-2.7 1.2-3.6c.8-1 1.9-1.5 3.4-1.5 1.4 0 2.4.5 3.1 1.5.6.6.9 1.7.9 2.9zm-2.1-.6c0-.6-.1-1.2-.4-1.6-.4-.6-.9-.9-1.7-.9-.7 0-1.3.3-1.7.9-.4.5-.6 1-.6 1.7l4.4-.1zM49 10c0 1.2-.4 2.1-1.1 2.7-.7.5-1.6.8-2.8.8-.6 0-1.1 0-1.5-.1v-6.4c.6-.1 1.2-.1 1.8-.1 1.1 0 2 .2 2.6.7.7.6 1 1.4 1 2.4zm-1.1 0c0-.8-.2-1.3-.6-1.8-.4-.4-1-.6-1.8-.6-.3 0-.6 0-.8.1v4.9h.7c.8 0 1.4-.2 1.9-.7.4-.4.6-1 .6-1.9zM54.9 11c0 .7-.2 1.3-.6 1.8s-1 .7-1.7.7-1.2-.2-1.7-.7c-.4-.5-.6-1-.6-1.7s.2-1.3.6-1.8 1-.7 1.7-.7 1.2.2 1.7.7c.4.5.6 1 .6 1.7zm-1.1.1c0-.4-.1-.8-.3-1.1-.2-.4-.5-.6-.9-.6s-.7.2-1 .6c-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.4.5.6 1 .6.4 0 .7-.2.9-.6.2-.3.3-.7.3-1.1zM62.8 8.7l-1.5 4.7h-1l-.6-2c-.2-.5-.3-1-.4-1.5-.1.5-.2 1-.4 1.5l-.6 2h-1l-1.4-4.7h1.1l.5 2.3.3 1.5c.2-.4.3-.9.5-1.5l.7-2.2h.9l.6 2.2c.2.5.3 1.1.4 1.6.1-.5.2-1 .3-1.6l.6-2.2 1-.1zM68.2 13.4h-1v-2.7c0-.8-.3-1.2-1-1.2-.3 0-.6.1-.8.3-.2.2-.3.5-.3.8v2.8h-1v-4.7h.9v.7c.1-.2.3-.4.5-.6.3-.2.6-.3.9-.3.4 0 .8.1 1.1.4.4.3.5.9.5 1.6v2.9h.2zM71.1 13.4h-1v-6.9h1v6.9zM77.3 11c0 .7-.2 1.3-.6 1.8-.4.5-1 .7-1.7.7s-1.2-.2-1.7-.7c-.4-.5-.6-1-.6-1.7s.2-1.3.6-1.8c.4-.5 1-.7 1.7-.7s1.2.2 1.7.7c.4.5.6 1 .6 1.7zm-1.1.1c0-.4-.1-.8-.3-1.1-.2-.4-.5-.6-.9-.6s-.7.2-1 .6c-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.4.5.6 1 .6.4 0 .7-.2.9-.6.2-.3.3-.7.3-1.1zM82.3 13.4h-.9l-.1-.5c-.3.4-.8.7-1.4.7-.4 0-.8-.1-1.1-.4-.2-.3-.4-.6-.4-1 0-.6.2-1 .7-1.3.5-.3 1.2-.5 2-.4v-.1c0-.6-.3-.9-1-.9-.5 0-.9.1-1.2.3l-.1-.8c.4-.3 1-.4 1.6-.4 1.2 0 1.8.6 1.8 1.9v1.7c.1.6.1 1 .1 1.2zm-1.1-1.6v-.7c-1.2 0-1.7.3-1.7.9 0 .2.1.4.2.6.1.1.3.2.5.2s.4-.1.6-.2c.2-.1.3-.3.4-.6v-.2zM88.3 13.4h-.9v-.8c-.3.6-.8.9-1.5.9-.6 0-1-.2-1.4-.7-.4-.4-.6-1-.6-1.7 0-.8.2-1.4.6-1.9.4-.4.9-.7 1.5-.7s1.1.2 1.3.6v-2.7h1v5.6c-.1.6 0 1 0 1.4zm-1.1-2v-1.1c-.1-.3-.2-.5-.4-.6-.2-.2-.4-.3-.7-.3-.4 0-.7.2-.9.5-.2.3-.3.7-.3 1.2s.1.8.3 1.1c.2.3.5.5.9.5.3 0 .6-.1.8-.4.2-.2.3-.5.3-.9zM97.2 11c0 .7-.2 1.3-.6 1.8-.4.5-1 .7-1.7.7s-1.2-.2-1.7-.7c-.4-.5-.6-1-.6-1.7s.2-1.3.6-1.8 1-.7 1.7-.7 1.2.2 1.7.7c.4.5.6 1 .6 1.7zm-1 .1c0-.4-.1-.8-.3-1.1-.2-.4-.5-.6-.9-.6s-.7.2-1 .6c-.2.3-.3.7-.3 1.1 0 .4.1.8.3 1.1.2.4.5.6 1 .6.4 0 .7-.2.9-.6.2-.3.3-.7.3-1.1zM102.9 13.4h-1v-2.7c0-.8-.3-1.2-1-1.2-.3 0-.6.1-.8.3s-.3.5-.3.8v2.8h-1v-4.7h.9v.7c.1-.2.3-.4.5-.6.3-.2.6-.3 1-.3s.8.1 1.1.4c.4.3.5.9.5 1.6v2.9h.1zM109.9 9.5h-1.2v2.3c0 .6.2.9.6.9h.5v.8c-.2.1-.5.1-.8.1-.4 0-.7-.1-1-.4-.2-.3-.3-.7-.3-1.3v-2.4h-.7v-.8h.7v-.9l1-.3v1.2h1.2v.8zM115.5 13.4h-1v-2.7c0-.8-.3-1.3-.9-1.3-.5 0-.8.2-1 .7v3.2h-1v-6.9h1v2.8c.3-.5.8-.8 1.4-.8.4 0 .8.1 1.1.4.4.4.5.9.5 1.6v3h-.1zM121.2 10.9v.5h-3.2c0 .5.2.8.5 1.1.3.2.6.3 1 .3.5 0 .9-.1 1.3-.2l.2.7c-.4.2-1 .3-1.6.3-.7 0-1.3-.2-1.7-.6s-.6-1-.6-1.7.2-1.3.6-1.8c.4-.5 1-.8 1.6-.8.7 0 1.2.3 1.5.8.3.3.4.8.4 1.4zm-1-.3c0-.3-.1-.6-.2-.8-.2-.3-.5-.4-.8-.4s-.6.1-.8.4c-.2.2-.3.5-.3.8h2.1z"/></symbol>
      <symbol id="login" viewBox="0 0 22 22"><path d="M13 2c0 .6.4 1 1 1h6v16h-6c-.6 0-1 .4-1 1s.4 1 1 1h6c1.1 0 2-.9 2-2v-16c0-1.1-.9-2-2-2h-6c-.6 0-1 .4-1 1zm-6.5 3.5c0 .3.1.5.3.7l3.8 3.8h-9.6c-.6 0-1 .4-1 1s.4 1 1 1h9.6l-3.8 3.8c-.2.2-.3.5-.3.7s.1.5.3.7c.4.4 1 .4 1.4 0l5.5-5.5c.1-.1.2-.2.2-.3.1-.2.1-.5 0-.8l-.2-.3-5.5-5.5c-.4-.4-1-.4-1.4 0-.2.2-.3.4-.3.7z"/></symbol>
      <symbol id="drop-down" viewBox="0 0 16 16"><polyline stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="1,5 8,12 15,5" fill="none"/></symbol>
      <symbol id="direction-horizontal" viewBox="-2 6 16 16"><path d="M13.7 13.3l-5-5c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l3.3 3.3h-11.6c-.6 0-1 .4-1 1s.4 1 1 1h11.6l-3.3 3.3c-.4.4-.4 1 0 1.4.2.2.4.3.7.3s.5-.1.7-.3l5-5c.2-.2.3-.5.3-.7s-.1-.5-.3-.7z"/></symbol>
      <symbol id="direction-vertical" viewBox="-2 6 16 16"><path d="M6.7 21.7l5-5c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-3.3 3.3v-11.6c0-.6-.4-1-1-1s-1 .4-1 1v11.6l-3.3-3.3c-.4-.4-1-.4-1.4 0-.2.2-.3.4-.3.7 0 .3.1.5.3.7l5 5c.2.2.4.3.7.3s.5-.1.7-.3z"/></symbol>
    </svg>

    <!-- Navigation -->
    <nav class="side">
      <div class="navigation">
        <ul>
          <li class="tooltip" data-title="Inicio"></li>
          <li class="tooltip" data-title="Especialistas"></li>
          <li class="tooltip" data-title="Sala de Espera"></li>
          <li class="tooltip" data-title="Especilidades"></li>
          <li class="tooltip" data-title="Horarios"></li>
          <li class="tooltip" data-title="Mapa"></li>
        </ul>
      </div>
    </nav>

    <!-- Panel top #11 -->
    <nav class="asay panel top forceMobileView">
      <div class="sections desktop">
        <div class="left"><!----></div>
        <div class="center"><a href="#">
          <img src="media/empresa/<?= $row['hgc_ava_empr'] ?>"
            style="width: 11.5em;background: rgba(255,255,255,0.5);padding: .5em 2em;" alt="A-SAY">
        </a></div>
        <div class="right"><!----></div>
      </div>
      <div class="sections compact hidden">
        <div class="left"><!----></div>
        <div class="center"><a href="#"><img src="media/empresa/<?= $row['hgc_ava_empr'] ?>" alt="A-SAY"></a></div>
        <div class="right"><!----></div>
      </div>
    </nav>

    <!-- Slide #28 -->
    <section class="asay slide-1 slide fade kenBurns">
      <div class="content">
        <div class="container">
          <div class="wrap">

            <div class="fix-12-12">
              <ul class="grid">
                <li class="col-7-12 left cell-28">
                  <h1 class="asay-bold small ae-1 fromLeft"><?= $row['hgc_nom_empr'] ?></h1>
                  <div class="ae-2 fromLeft">
                    <p><?= $row['hgc_mis_empr'] ?></p>
                    <p><?= $row['hgc_vis_empr'] ?></p>
                  </div>
                  <a class="button round uppercase ae-3 fromCenter cropBottom contact" href="hgc.php">Entrar</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div class="background" style="background-image:url(assets/img/slider/imagen1.jpg)"></div>
    </section>

    <!-- Slide #32 -->
    <section class="asay slide-2 slide fade kenBurns fromLeft">
      <div class="content">
        <div class="container">
          <div class="wrap">

            <div class="fix-12-12">
              <ul class="grid">
                <li class="col-7-12 left cell-32">
                  <h1 class="asay-bold small ae-2">Doctores</h1>
                  <div class="ae-3">
                    <p>A-SAY makes it easy to build and manage your polling questions with its simple to use CMS. Pre-build your questions and be ready to engage when you hit the stage, or add questions live as the event unfolds.</p>
                    <p>It’s a breeze with A-SAY.</p>
                  </div>
                  <ul class="items-32">
                    <li class="fix-5-12 toLeft text-32">
                      <h3 class="ae-5">Question Slides</h3>
                      <div class="ae-6"><p class="small"> Multiple choice question’s with both sentiment and “right” answer functionality.</p></div>
                    </li>
                    <li class="fix-5-12 toLeft text-32">
                      <h3 class="ae-9">Text Slides</h3>
                      <div class="ae-10"><p class="small">Flexible text slides for instructions and content.</p></div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div class="background" style="background-image:url(assets/img/slider/imagen2.jpg)"></div>
    </section>

    <!-- Slide #28 -->
    <section class="asay slide-3 slide fade kenBurns">
      <div class="content">
        <div class="container">
          <div class="wrap">

            <div class="fix-12-12">
              <ul class="grid">
                <li class="col-7-12 left cell-28">
                  <h1 class="asay-bold small ae-1 fromLeft">Sala de Espera.</h1>
                  <div class="ae-2 fromLeft">
                    <p>Control both on stage and on device content and questions easily with two brand-able interfaces. A-SAY keeps users focused by pushing content you want, when you want to it to either screen.</p>
                  </div>
                  <a class="button round uppercase teal ae-3 fromCenter cropBottom contact" href="hgc.php">Entrar</a>
                </li>
                <li class="col-5-12 ae-1">
                  <img class="shiftImage" src="assets/img/device/iphone-3.png" alt="iPhone Thumbnail">
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div class="background" style="background-image:url(assets/img/slider/imagen3.jpg)"></div>
    </section>

    <!-- Slide #47 -->
    <section class="asay slide-4 slide fade kenBurns">
      <div class="content">
        <div class="container">
          <div class="wrap">

            <div class="fix-10-12 toCenter">
              <h1 class="asay-bold small ae-1">Especialidades.</h1>
            </div>
            <div class="fix-12-12">
              <ul class="grid later equal">
                <li class="col-4-12 equalElement">
                  <div class="fix-4-12 ae-3">
                    <div><img src="assets/img/icon/icon-1.svg" alt="Higher Audience Participation"></div>
                    <h3 class="uppercase">Higher Audience Participation</h3>
                    <p class="small">With no app to download, audience participation is a breeze.</p>
                  </div>
                </li>
                <li class="col-4-12 equalElement">
                  <div class="fix-4-12 ae-4">
                    <div><img src="assets/img/icon/icon-2.svg" alt="Brandable Screens"></div>
                    <h3 class="uppercase">Brandable Screens</h3>
                    <p class="small">Add your logo and brand to both the stage and handset screens.</p>
                  </div>
                </li>
                <li class="col-4-12 equalElement">
                  <div class="fix-4-12 ae-5">
                    <div><img src="assets/img/icon/icon-3.svg" alt="Emendable Vimeo Videos"></div>
                    <h3 class="uppercase">Embeddable Vimeo Videos</h3>
                    <p class="small">Easily display and control Vimeo videos, right from the CMS.</p>
                  </div>
                </li>
                <li class="col-4-12 equalElement">
                  <div class="fix-4-12 ae-6">
                    <div><img src="assets/img/icon/icon-4.svg" alt="Multi-language"></div>
                    <h3 class="uppercase">Multi-language</h3>
                    <p class="small">The app is ready for bilingual or multilingual content right out of the gate.</p>
                  </div>
                </li>
                <li class="col-4-12 equalElement">
                  <div class="fix-4-12 ae-7">
                    <div><img src="assets/img/icon/icon-5.svg" alt="Ready to scale"></div>
                    <h3 class="uppercase">Ready to scale</h3>
                    <p class="small">A-SAY is built for audiences big or small.</p>
                  </div>
                </li>
                <li class="col-4-12 equalElement">
                  <div class="fix-4-12 ae-8">
                    <div><img src="assets/img/icon/icon-6.svg" alt="Insights"></div>
                    <h3 class="uppercase">Insights</h3>
                    <p class="small">Voting results are shown in real time in the CMS.</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div class="background" style="background-image:url(assets/img/slider/imagen4.jpg)"></div>
    </section>

    <!-- Slide #41 -->
    <section class="asay slide-5 slide fade kenBurns">
      <div class="content">
        <div class="container">
          <div class="wrap">

            <div class="fix-10-12 center">
              <h1 class="small ae-1">“Well over half the entire audience took part in answering real-time questions about our speakers. The coolest part was watching engagement numbers go UP throughout the day. To me, that says it all”</h1>
              <div class="fix-4-12">
                <a href="#" class="author block">
                  <div class="ae-2 fromCenter"><img width="60" class="avatar-41 ae-2 fromCenter" src="assets/img/jordan.jpg" alt="Frank Gehry"></div>
                  <small class="raleway block ae-3">
                    <b class="block">Gabriel Alban</b>
                    President / TEDxVancouver
                  </small>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="background" style="background-image:url(assets/img/slider/imagen5.jpg)"></div>
    </section>

    <!-- Slide #32 name="contact" -->
    <section class="asay slide-6 slide fade kenBurns fromLeft">
      <div class="content">
        <div class="container background-gradian">
          <div class="wrap">

            <div class="fix-12-12">
              <ul class="grid">
                <li class="col-6-12 left cell-32">
                  <h1 class="asay-bold small ae-1">¿Como Llegar?</h1>
                  <div class="ae-2">
                    <p>¿Estas buscandonos?</p>
                  </div>
                  <h3 class="small text-57 ae-3">Nos encontraras en</h3>
                  <p class="small ae-4"><a href="#"><?= $row['hgc_dir_empr'] ?></a></p>
                </li>
                <li class="col-6-12 left ae-1 fromRight" data-action="zoom">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.7809450079985!2d-79.16254858570517!3d-0.24800129981905436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d546584e744edf%3A0xf6d218929848d0fa!2sHospital+Dr.+Gustavo+Dominguez+Zambrano!5e0!3m2!1ses-419!2sec!4v1498491721119" width="600" height="450" frameborder="0" style="border:0" allowfullscreen>
                  </iframe>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <div class="background" style="background-image:url(assets/img/map.jpg)"></div>
    </section>

    <!-- Panel Bottom #22 -->
    <nav class="panel bottom">
      <div class="sections">
        <div class="center"><span class="nextSlide"><svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-down"></use></svg></span></div>
      </div>
    </nav>

    <!-- Preloader -->
    <div class="loadingIcon"><svg class="loading-icon" id="loading-circle" viewBox="0 0 18 18"><circle class="circle" opacity=".1" stroke="#fff" stroke-width="2" stroke-miterlimit="10" cx="9" cy="9" r="8" fill="none"></circle><circle class="dash" stroke-width="2" stroke-linecap="round" stroke-miterlimit="10" stroke-dasharray="1,100" cx="9" cy="9" r="8" fill="none"></circle></svg></div>

    <!-- JavaScript -->
    <script src="js/jquery-1.11.3.min.js"></script>
    <script src="js/plugins.js"></script>
    <script src="js/slides.js"></script>
    <script src="js/a-say.js"></script>

  </body>
</html>
