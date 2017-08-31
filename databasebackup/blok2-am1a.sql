-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 09 jan 2015 om 10:12
-- Serverversie: 5.6.12-log
-- PHP-versie: 5.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databank: `blok1-am1a`
--
CREATE DATABASE IF NOT EXISTS `blok1-am1a` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `blok1-am1a`;

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `login`
--

CREATE TABLE IF NOT EXISTS `login` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(32) NOT NULL,
  `userrole` enum('root','administrator','photographer','customer','developer') NOT NULL DEFAULT 'customer',
  `activated` enum('yes','no') NOT NULL DEFAULT 'no',
  `activationdate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=71 ;

--
-- Gegevens worden uitgevoerd voor tabel `login`
--

INSERT INTO `login` (`id`, `email`, `password`, `userrole`, `activated`, `activationdate`) VALUES
(45, 'adruijter@gmail.com', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'no', '2015-01-13 08:53:33'),
(46, 'bvanamerongen@gmail.com', 'geheim', 'customer', 'yes', '2015-01-05 10:49:49'),
(47, 'jvandeelden@gmail.com', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'yes', '2015-01-05 10:53:58'),
(48, 'dvanvreeswijk@gmail.com', 'c445a63b62c711ce1541478675a7bfed', 'customer', 'yes', '2015-01-05 10:55:15'),
(49, 'bberenstein@gmail.com', '1798c7d9bd5a5d637ead47154f0d36e3', 'customer', 'yes', '2015-01-05 11:12:22'),
(50, 'bdebeuker@gmail.com', 'bdebeuker@gmail.com2015-01-05 11', 'customer', 'yes', '2015-01-05 11:13:43'),
(51, 'lvanlexmand@gmail.com', '5a105e8b9d40e1329780d62ea2265d8a', 'customer', 'yes', '2015-01-05 11:14:49'),
(52, 'hdehacker@gmail.com', 'a27c2d4b5ec0809732e6d3b1b43b3e23', 'customer', 'yes', '2015-01-05 11:16:46'),
(53, 'fdebakker@gmail.com', 'b95cfa5caebeba74e44f88fec46c44b9', 'customer', 'no', '2015-01-05 11:49:11'),
(54, 'sdpfo@sdf.nl', '12eccbdd9b32918131341f38907cbbb5', 'customer', 'yes', '2015-01-05 11:51:10'),
(59, 'g@g.nl', '4958e86f1160435b8983afe2ac369861', 'customer', 'no', '2015-01-09 06:45:41'),
(60, 'n@n.nl', '6d769ce5f49e7809efbc32c34043fb15', 'customer', 'yes', '2015-01-09 06:59:24'),
(61, 'k@k.nl', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'yes', '2015-01-09 07:08:35'),
(62, 'm@m.nl', '117be9d5d71697cee44cf42701e5fcb9', 'customer', 'yes', '2015-01-09 07:14:29'),
(63, 'b@b.nl', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'yes', '2015-01-09 07:16:35'),
(64, 'j@j.nl', '46bfe78a2fef79b9fbf74c8386966ace', 'customer', 'no', '2015-01-09 08:32:55'),
(65, 'l@l.nl', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'yes', '2015-01-09 08:35:04'),
(66, 'v@v.nl', '22cc15ad4b302cffeab75f48caf0b526', 'customer', 'no', '2015-01-09 08:52:22'),
(67, 'x@x.nl', 'bda8084510036eebb0c6a9d47b655819', 'customer', 'yes', '2015-01-09 08:55:39'),
(68, 'aa@aa.nl', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'yes', '2015-01-09 09:14:10'),
(69, 'cc@cc.nl', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'yes', '2015-01-09 09:15:52'),
(70, 'kk@kk.nl', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'yes', '2015-01-09 09:17:17');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `voornaam` varchar(50) NOT NULL,
  `tussenvoegsel` varchar(15) NOT NULL,
  `achternaam` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Gegevens worden uitgevoerd voor tabel `user`
--

INSERT INTO `user` (`id`, `voornaam`, `tussenvoegsel`, `achternaam`) VALUES
(1, 'Peter R.', 'de', 'Vries'),
(4, 'Bertus', 'van', 'Marwijk'),
(5, 'Kees', 'de', 'Vries'),
(6, 'Joop', 'de', 'Echelenstein'),
(9, 'Johan', 'van', 'Echelenstein'),
(11, 'Bert ', 'de', 'Vries'),
(26, 'Bert', 'van', 'Randwijk');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `infix` varchar(50) NOT NULL,
  `lastname` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Gegevens worden uitgevoerd voor tabel `users`
--

INSERT INTO `users` (`id`, `firstname`, `infix`, `lastname`) VALUES
(45, 'Arjan', 'de', 'Ruijter'),
(46, 'Bertus', 'van', 'Amerongen'),
(47, 'Johan', 'van', 'Deelden'),
(48, 'Dirk', 'van', 'Vreeswijk'),
(49, 'Benny', '', 'Berenstein'),
(50, 'Bart', 'de', 'Beuker'),
(51, 'Lex', 'van', 'Lexmand'),
(52, 'henk', 'de', 'Hacker'),
(53, 'Freek', 'de', 'Bakker'),
(54, 'sf', 'p', 'sdf'),
(59, 'g', 'g', 'g'),
(60, 'n', 'n', 'n'),
(61, 'k', 'k', 'k'),
(62, 'm', 'm', 'm'),
(63, 'b', 'b', 'b'),
(64, 'j', 'j', 'j'),
(65, 'l', 'l', 'l'),
(66, 'v', 'v', 'v'),
(67, 'x', 'x', 'x'),
(68, 'aa', 'aa', 'aa'),
(69, 'cc', 'cc', 'cc'),
(70, 'kk', 'kk', 'kk');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
