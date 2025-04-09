-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Ápr 09. 18:50
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `webshoppp`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `api_usage`
--

CREATE TABLE `api_usage` (
  `id` int(11) NOT NULL,
  `api_name` varchar(50) NOT NULL,
  `usage_count` int(11) DEFAULT 0,
  `limit_count` int(11) DEFAULT 1000,
  `reset_date` datetime DEFAULT NULL,
  `last_updated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `api_usage`
--

INSERT INTO `api_usage` (`id`, `api_name`, `usage_count`, `limit_count`, `reset_date`, `last_updated`) VALUES
(1, 'vision_api', 103, 1000, '2025-04-17 00:00:00', '2025-04-07 19:49:32'),
(69, 'style_api', 17, 1000, '2025-04-24 00:00:00', '2025-04-07 19:49:53');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `kategoriak`
--

CREATE TABLE `kategoriak` (
  `cs_azonosito` int(11) NOT NULL,
  `cs_nev` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `kategoriak`
--

INSERT INTO `kategoriak` (`cs_azonosito`, `cs_nev`) VALUES
(1, 'Sapka'),
(2, 'Nadrág'),
(3, 'Zokni'),
(4, 'Póló'),
(5, 'Pullover'),
(6, 'Kabát'),
(7, 'Lábviselet'),
(8, 'Atléta'),
(9, 'Kiegészítő'),
(10, 'Szoknya'),
(11, 'Alsónemű'),
(12, 'Mellény');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ratings`
--

CREATE TABLE `ratings` (
  `rating_id` int(11) NOT NULL,
  `f_azonosito` int(11) NOT NULL,
  `rating` int(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `velemeny` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ratings`
--

INSERT INTO `ratings` (`rating_id`, `f_azonosito`, `rating`, `date`, `velemeny`) VALUES
(78, 57, 4, '2025-04-03 14:00:23', 'aaaa'),
(79, 57, 4, '2025-04-03 18:57:42', 'adad'),
(80, 57, 3, '2025-04-03 18:58:29', NULL),
(81, 57, 4, '2025-04-03 19:03:45', NULL),
(84, 57, 4, '2025-04-07 18:08:39', 'addad');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `rendeles`
--

CREATE TABLE `rendeles` (
  `id` int(11) NOT NULL,
  `termek` varchar(255) DEFAULT NULL,
  `statusz` varchar(50) DEFAULT NULL,
  `mennyiseg` int(11) DEFAULT NULL,
  `vevo_id` int(11) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `ar` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `r_kapcsolo`
--

CREATE TABLE `r_kapcsolo` (
  `id` int(11) NOT NULL,
  `rendeles_id` int(11) NOT NULL,
  `termek_id` int(11) NOT NULL,
  `mennyiseg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `termekek`
--

CREATE TABLE `termekek` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `termekleiras` text DEFAULT NULL,
  `ar` int(11) NOT NULL,
  `kategoria` varchar(50) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `kategoriaId` int(11) NOT NULL,
  `keszlet` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `termekek`
--

INSERT INTO `termekek` (`id`, `nev`, `termekleiras`, `ar`, `kategoria`, `imageUrl`, `kategoriaId`, `keszlet`) VALUES
(1000, 'Fehér nadrág', 'Kényelmes fehér nadrág', 5000, 'Nadrágok', 'fehgatya.png', 2, 44),
(1001, 'Fehér póló', 'Klasszikus fehér póló', 3500, 'Pólók', 'fehpolo.png', 4, 35),
(1002, 'Fehér pulóver', 'Meleg fehér pulóver', 7500, 'Pulóverek', 'fehpull.png', 5, 49),
(1003, 'Kék nadrág', 'Kényelmes kék nadrág', 5000, 'Nadrágok', 'kekgatya.png', 2, 36),
(1004, 'Kék póló', 'Klasszikus kék póló', 3500, 'Pólók', 'kekpolo.png', 4, 14),
(1005, 'Kék pulóver', 'Meleg kék pulóver', 7500, 'Pulóverek', 'kekpull.png', 5, 44),
(1006, 'Fekete nadrág', 'Kényelmes fekete nadrág', 5000, 'Nadrágok', 'fekgatya.png', 2, 40),
(1007, 'Fekete póló', 'Klasszikus fekete póló', 3500, 'Pólók', 'fekpolo.png', 4, 41),
(1008, 'Fekete pulóver', 'Meleg fekete pulóver', 7500, 'Pulóverek', 'fekpull.png', 5, 26),
(1009, 'Zöld nadrág', 'Kényelmes zöld nadrág', 5000, 'Nadrágok', 'zoldgatya.png', 2, 26),
(1010, 'Zöld póló', 'Klasszikus zöld póló', 3500, 'Pólók', 'zoldpolo.png', 4, 45),
(1011, 'Zöld pulóver', 'Meleg zöld pulóver', 7500, 'Pulóverek', 'zoldpull.png', 5, 38),
(1012, 'Bézs nadrág', 'Kényelmes bézs nadrág', 5000, 'Nadrágok', 'bezsgatya.png', 2, 19),
(1013, 'Bézs póló', 'Klasszikus bézs póló', 3500, 'Pólók', 'bezspolo.png', 4, 41),
(1014, 'Bézs pulóver', 'Meleg bézs pulóver', 7500, 'Pulóverek', 'bezspull.png', 5, 47),
(1017, 'Zokni', 'Klasszikus fehér zokni', 1000, 'Zoknik', 'fehzokni.png', 3, 31),
(1018, 'Zokni', 'Klasszikus fekete zokni', 1000, 'Zokni', 'fekzokni.png', 3, 43);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `t_kapcsolo`
--

CREATE TABLE `t_kapcsolo` (
  `id` int(11) NOT NULL,
  `kategoria_id` int(11) NOT NULL,
  `termek_id` int(11) NOT NULL,
  `utermek_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user`
--

CREATE TABLE `user` (
  `felhasznalonev` varchar(30) NOT NULL,
  `jelszo` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `f_azonosito` int(11) NOT NULL,
  `kupon` varchar(50) DEFAULT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  `kupon_hasznalva` tinyint(1) DEFAULT 0,
  `profile_image` longtext DEFAULT NULL,
  `email_kupon` varchar(50) DEFAULT NULL,
  `email_kupon_hasznalva` tinyint(1) DEFAULT 0,
  `kupon_lejar` datetime DEFAULT NULL,
  `email_kupon_lejar` datetime DEFAULT NULL,
  `kupon_kod` varchar(50) DEFAULT NULL,
  `email_kupon_kod` varchar(50) DEFAULT NULL,
  `reg_datum` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `user`
--

INSERT INTO `user` (`felhasznalonev`, `jelszo`, `email`, `f_azonosito`, `kupon`, `reset_token`, `reset_expires`, `kupon_hasznalva`, `profile_image`, `email_kupon`, `email_kupon_hasznalva`, `kupon_lejar`, `email_kupon_lejar`, `kupon_kod`, `email_kupon_kod`, `reg_datum`) VALUES
('Adali Clothing', '$2b$10$X6IeloB7tiGhfYFrK65puOvdYMISSdqj6KDc8ZSmfTwDS96nw3SxK', 'adaliclothing@gmail.com', 57, '20% kedvezmény', NULL, NULL, 1, '', '15% kedvezmény', 0, '2025-05-03 12:04:21', '2025-05-03 14:16:43', 'WHEEL20-DB4828', 'ADALI15-9E8BF5', '2025-04-03 14:04:15');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `usertermekek`
--

CREATE TABLE `usertermekek` (
  `id` int(11) NOT NULL,
  `kategoriaId` int(11) NOT NULL,
  `ar` int(11) NOT NULL,
  `nev` varchar(255) NOT NULL,
  `leiras` varchar(255) NOT NULL,
  `meret` varchar(255) NOT NULL,
  `imageUrl` longtext DEFAULT NULL,
  `additionalImages` longtext DEFAULT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `feltolto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `user_ratings`
--

CREATE TABLE `user_ratings` (
  `rating_id` int(11) NOT NULL,
  `rater_user_id` int(11) NOT NULL,
  `rated_user_id` int(11) NOT NULL,
  `rating` int(1) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `velemeny` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `vevo`
--

CREATE TABLE `vevo` (
  `id` int(11) NOT NULL,
  `nev` varchar(255) DEFAULT NULL,
  `telefonszam` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `irsz` varchar(10) DEFAULT NULL,
  `telepules` varchar(255) DEFAULT NULL,
  `kozterulet` varchar(255) DEFAULT NULL,
  `fizetesi_mod` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `api_usage`
--
ALTER TABLE `api_usage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `api_name` (`api_name`),
  ADD KEY `usage_count` (`usage_count`);

--
-- A tábla indexei `kategoriak`
--
ALTER TABLE `kategoriak`
  ADD PRIMARY KEY (`cs_azonosito`);

--
-- A tábla indexei `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD KEY `f_azonosito` (`f_azonosito`);

--
-- A tábla indexei `rendeles`
--
ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vevo_id` (`vevo_id`);

--
-- A tábla indexei `r_kapcsolo`
--
ALTER TABLE `r_kapcsolo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rendeles_id` (`rendeles_id`),
  ADD KEY `termek_id` (`termek_id`);

--
-- A tábla indexei `termekek`
--
ALTER TABLE `termekek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategoriaId` (`kategoriaId`);

--
-- A tábla indexei `t_kapcsolo`
--
ALTER TABLE `t_kapcsolo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategoria_id` (`kategoria_id`),
  ADD KEY `termek_id` (`termek_id`),
  ADD KEY `utermek_id` (`utermek_id`);

--
-- A tábla indexei `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`f_azonosito`),
  ADD UNIQUE KEY `felhasznalonev` (`felhasznalonev`);

--
-- A tábla indexei `usertermekek`
--
ALTER TABLE `usertermekek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kategoriaId` (`kategoriaId`),
  ADD KEY `images` (`images`(768)),
  ADD KEY `fk_user_feltolto` (`feltolto`);

--
-- A tábla indexei `user_ratings`
--
ALTER TABLE `user_ratings`
  ADD PRIMARY KEY (`rating_id`),
  ADD UNIQUE KEY `unique_rating` (`rater_user_id`,`rated_user_id`),
  ADD KEY `rated_user_id` (`rated_user_id`);

--
-- A tábla indexei `vevo`
--
ALTER TABLE `vevo`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `api_usage`
--
ALTER TABLE `api_usage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT a táblához `kategoriak`
--
ALTER TABLE `kategoriak`
  MODIFY `cs_azonosito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT a táblához `ratings`
--
ALTER TABLE `ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT a táblához `rendeles`
--
ALTER TABLE `rendeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT a táblához `r_kapcsolo`
--
ALTER TABLE `r_kapcsolo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `termekek`
--
ALTER TABLE `termekek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1021;

--
-- AUTO_INCREMENT a táblához `t_kapcsolo`
--
ALTER TABLE `t_kapcsolo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT a táblához `user`
--
ALTER TABLE `user`
  MODIFY `f_azonosito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT a táblához `usertermekek`
--
ALTER TABLE `usertermekek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT a táblához `user_ratings`
--
ALTER TABLE `user_ratings`
  MODIFY `rating_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT a táblához `vevo`
--
ALTER TABLE `vevo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `ratings_ibfk_1` FOREIGN KEY (`f_azonosito`) REFERENCES `user` (`f_azonosito`);

--
-- Megkötések a táblához `rendeles`
--
ALTER TABLE `rendeles`
  ADD CONSTRAINT `rendeles_ibfk_1` FOREIGN KEY (`vevo_id`) REFERENCES `vevo` (`id`);

--
-- Megkötések a táblához `r_kapcsolo`
--
ALTER TABLE `r_kapcsolo`
  ADD CONSTRAINT `r_kapcsolo_ibfk_1` FOREIGN KEY (`rendeles_id`) REFERENCES `rendeles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `r_kapcsolo_ibfk_2` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`id`) ON DELETE CASCADE;

--
-- Megkötések a táblához `t_kapcsolo`
--
ALTER TABLE `t_kapcsolo`
  ADD CONSTRAINT `t_kapcsolo_ibfk_1` FOREIGN KEY (`kategoria_id`) REFERENCES `kategoriak` (`cs_azonosito`) ON DELETE CASCADE,
  ADD CONSTRAINT `t_kapcsolo_ibfk_2` FOREIGN KEY (`termek_id`) REFERENCES `termekek` (`kategoriaId`) ON DELETE CASCADE,
  ADD CONSTRAINT `t_kapcsolo_ibfk_3` FOREIGN KEY (`utermek_id`) REFERENCES `usertermekek` (`kategoriaId`);

--
-- Megkötések a táblához `usertermekek`
--
ALTER TABLE `usertermekek`
  ADD CONSTRAINT `fk_user_feltolto` FOREIGN KEY (`feltolto`) REFERENCES `user` (`felhasznalonev`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `user_ratings`
--
ALTER TABLE `user_ratings`
  ADD CONSTRAINT `user_ratings_ibfk_1` FOREIGN KEY (`rater_user_id`) REFERENCES `user` (`f_azonosito`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_ratings_ibfk_2` FOREIGN KEY (`rated_user_id`) REFERENCES `user` (`f_azonosito`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
