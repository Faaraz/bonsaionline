-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Machine: localhost
-- Genereertijd: 08 dec 2014 om 08:13
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
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Gegevens worden uitgevoerd voor tabel `login`
--

INSERT INTO `login` (`id`, `email`, `password`, `userrole`, `activated`, `activationdate`) VALUES
(1, 'adruijter@gmail.com', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'no', '2014-12-05 14:06:47'),
(2, 'bvanmeegeren@gmail.com', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'no', '2014-12-05 14:13:21'),
(3, 'hdegroot@gmail.com', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'no', '2014-12-05 14:17:24'),
(4, 'bdebruin@gmail.com', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'no', '2014-12-08 09:02:56'),
(5, 'bdebruin@gmail.com', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'no', '2014-12-08 09:04:46'),
(6, 'bdebruin@gmail.com', 'e8636ea013e682faf61f56ce1cb1ab5c', 'customer', 'no', '2014-12-08 09:05:10');

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
  `lastname` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
