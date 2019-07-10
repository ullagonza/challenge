import Head from 'next/head'
import "../static/scss/header.scss";
import "../static/scss/banner.scss";
import "../static/scss/grid.scss";

export default ({ title, description }) =>
  <Head>
    <meta charSet='utf-8' />
    <title>{title}</title>
    <meta name='description' content={description} />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <link rel='shortcut icon' href='/static/favicon.ico' />
    <link 
      href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700&display=swap" 
      rel="stylesheet"
    />
    <link rel="apple-touch-icon" sizes="114x114" href="../static/img/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="../static/img/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="../static/img/favicon-16x16.png" />
    <link rel="manifest" href="../static/img/site.webmanifest" />
    <link rel="mask-icon" href="../static/img/safari-pinned-tab.svg" color="#ff8800" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="theme-color" content="#ffffff"></meta>
    <link href='/static/css/normalize.css' rel='stylesheet' />
  </Head>
