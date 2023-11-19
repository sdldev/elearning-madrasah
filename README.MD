# Elearning MADRASAH

Ini adalah source code LMS madrasah sumber berasal dari [elearning.kemenag.go.id](https://elearning.kemenag.go.id/) tujuan upload ke github adalah untuk memudahkan ketika upload ke VPS.
Licency sepenuhnya milik developer elearning.kemenag.go.id.

## NOTE

untuk mengganti database edit file `database.php`

```
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$active_group = 'default';
$query_builder = TRUE;

$db['default'] = array(
	'dsn'	=> '',
	'hostname' => 'localhost',
	'username' => 'ini_diganti_user',
	'password' => 'ini_diganti_password',
	'database' => 'ini_diganti_db',
	
	'dbdriver' => 'mysqli',
	'dbprefix' => '',
	'pconnect' => FALSE,
	'db_debug' => FALSE,
	'cache_on' => FALSE,
	'cachedir' => '',
	'char_set' => 'utf8',
	'dbcollat' => 'utf8_general_ci',
	'swap_pre' => '',
	'encrypt' => FALSE,
	'compress' => FALSE,
	'stricton' => FALSE,
	'failover' => array(),
	'save_queries' => FALSE
);

```