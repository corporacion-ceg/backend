-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-03-2022 a las 22:11:46
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `planetadulce`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuadrantes`
--

CREATE TABLE `cuadrantes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cuadrantes`
--

INSERT INTO `cuadrantes` (`id`, `nombre`) VALUES
(1, 'ESTE 1'),
(2, 'ESTE 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `marcas`
--

CREATE TABLE `marcas` (
  `id` int(10) NOT NULL,
  `nombre` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `img` varchar(100) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(10) NOT NULL,
  `nombre` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `img` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `precio` double NOT NULL,
  `marca` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `img`, `precio`, `marca`) VALUES
(1, ' CHUPETA BIG BOM COLA 25Gx48U                      ', '48 UNI', '', 3.91, 1),
(2, 'CHUPETA BIG BOM MANGO 25Gx48U', '48 UNI', '', 3.91, 1),
(3, 'CHUPETA BIG BOM SANDIA 25Gx48U', '48 UNI', '', 3.91, 1),
(4, 'CHUPETA BIG BOM YOGURT DE FRESA 25Gx48U', '48 UNI', '', 3.91, 1),
(5, ' CHUPETA BIG BOM PINTA LABIOS 25Gx48U     ', '48 UNI', '', 3.91, 1),
(6, ' CHUPETA BIG BOM BLANCO COCO 25Gx48U    ', '48 UNI', '', 3.91, 1),
(7, ' CHUPETA BIG BOM TATAMA 25Gx48U                 ', '48 UNI', '', 3.91, 1),
(8, 'CHUPETA BIG BOM FUSION 25Gx48U', '48 UNI', '', 3.91, 1),
(9, 'CHUPETA BIG BOM CHOCOLATE 25Gx48U', '48 UNI', '', 3.91, 1),
(10, ' CHUPETA BIG BOM BLANCO COCO 18Gx24U    ', '24 UNI', '', 1.6, 1),
(11, ' CHUPETA BIG BOM FRESA 25Gx48U                    ', '48 UNI', '', 3.91, 1),
(12, 'CARAMELO CAFE GURME TRIPACK X50U', '50 UNI', '', 3.74, 1),
(13, 'CAR. RICATO (VAQUITA) 18*50*8G', '18', '', 0, 1),
(14, 'TRULULU (DRAGONES) 12*87G', '1', '', 0, 1),
(15, 'AGUA DE COCO (SUPERCOCO) 12UX200ML', '200 ML', '', 6.7, 1),
(16, 'CARAMELO BIANCHI BLANCO TRIPACK X100U', '100 UNI', '', 5.33, 1),
(17, 'CARAMELO MENTA CHAO TRIPACK X100U', '100 UNI', '', 4.71, 1),
(18, 'BIANCHI (CHOCOLORES) TRIPACK X160G', '12', '', 4.67, 1),
(19, 'CARAMELO. BIANCHI AZUL BOLSA 50U', '18', '', 0, 1),
(20, 'CHUP. LOKINO FRESA 15*24', '15', '', 0, 1),
(21, 'TURRON SUPERCOCO 36*50', '36', '', 0, 1),
(22, 'LOKINO (BARRA) ORIGINA TRIPACK X50U', '50 UNI', '', 4.45, 1),
(23, 'LOKINO (BARRA) TRIPACK X50U', '50 UNI', '', 4.45, 1),
(24, 'SUPERCOCO (CEREAL) BARRA DISP 6UX32G', '6 UNID', '', 1.94, 1),
(25, 'TRULULU (SPLASH) 12*90G', '1', '', 0.52, 1),
(26, 'TRULULU (DINOS) 12X90G', '1', '', 0.52, 1),
(27, 'TRULULU AROS SIXPACK X90G', '90 GR', '', 3.12, 1),
(28, 'TRULULU NEON SIXPACK X90G', '90 GR', '', 3.12, 1),
(29, 'TRULULU ORO SIXPACK X90G', '90 GR', '', 3.12, 1),
(30, 'TRULULU LADRILLO SIXPACK X85G', '85 GR', '', 3.12, 1),
(31, 'TRULULU (TROPICAL) 12*87G', '1', '', 0.52, 1),
(32, 'BIANCHI COOKY & CREAM SIXPACK 48G', '48 GR', '', 3.12, 1),
(33, 'SUPERCOCO CHOC SIXPACK X60G', '60 GR', '', 3.12, 1),
(34, 'BIANCHI (SNACKS) CHOCOLORES 12*60G', '24 UNI', '', 0, 1),
(35, 'CHUPETA LOKI?O FRESA 15Gx24U', '24 UNI', '', 1.78, 1),
(36, 'TOCINTE FRED RISTRA DE 8 X40G', '40 GR', '', 3.64, 1),
(37, 'CAR. MENTA CHAO LIMON 24*100', '24', '', 0, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiponegocios`
--

CREATE TABLE `tiponegocios` (
  `id` int(10) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tiponegocios`
--

INSERT INTO `tiponegocios` (`id`, `nombre`) VALUES
(1, 'BODEGA'),
(2, 'ABASTO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(10) NOT NULL,
  `nombre` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `direccion` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `tlf` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `tn` int(10) DEFAULT NULL,
  `imagen` longblob DEFAULT NULL,
  `cuandrante` int(10) NOT NULL,
  `pass` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `codigo_aprobacion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `user` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `aprobado` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `direccion`, `tlf`, `tn`, `imagen`, `cuandrante`, `pass`, `codigo_aprobacion`, `user`, `aprobado`) VALUES
(1, 'Juvenal', 'jjhernandezz100@gmail.com', 'California', '0123456789', NULL, NULL, 1, '123456', 'wssgl6qq4xh', '', 0),
(2, 'Juvenal', 'jjhernandezz100@gmail.com', 'California', '0123456789', NULL, NULL, 1, '$2b$10$xacZuYWluPN8Ju2kdwp1M.d3dz7m/N04GX4cIjRhW2rX/ERRphfDe', '0zxvwdt7aqpa', '', 0),
(3, 'Juvenal', 'jjhernandezz100@gmail.com', 'California', '0123456789', NULL, NULL, 1, '$2b$10$8onGGn36GCgKwRRyM.XwXuBWr1TQauUFekHp38rAvS0JyaHCVkXVm', 'xm2p34uqdyc', '', 0),
(4, 'Juvenal', 'jjhernandezz100@gmail.com', 'California', '0123456789', NULL, NULL, 1, '$2b$10$2nStmlhp.2vXVtPYGr4BguCbmdT8I4vjXUqym1PlGdOphXJM24/GW', 'wex8838inri', '', 0),
(5, 'Juvenal', 'jjhernandezz100@gmail.com', 'California', '0123456789', NULL, NULL, 1, '$2b$10$wSWNCD16FsvL8eLRP4H1.uH2lIAYHffV5pBHa2Ghcwg78bfC9suzy', 'jp7qmer09ad', 'admin', 0),
(6, 'Juvenal', 'jjhernandezz100@gmail.com', 'California', '0123456789', NULL, NULL, 1, '$2b$10$J1TQOE4mj6H3Vud5Zgd50./y94Xw83MbtqwbnNNsXYTEZBmgATVBu', '7rjsn8lnpg7', 'admin', 0),
(7, 'Eugenio', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$3/y1m.KD9NcYTX8CGoh8leAi4/KEP5ikQJqPl7jbPbWwchCFl6OC6', 'izq005n5qte', 'admin', 0),
(8, 'josue', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$wzXhYZntz1srKfY8wzn1NeqYxphy1G8NVN4grjGl5UeuEAKzc94tq', '5le5bir8o7', 'admin', 0),
(9, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$QCIvdsS7xhKuu3XNE7rGzeF6odnQdUha90dl0NeFqUDeBmxaPi3Yi', 'i3n5rfc9fz', 'admin', 0),
(10, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$1bB29Ux.oaWdld.VBCA4teOhuw3jB86KtTeD5UsoNMAPsO8qd5x2u', '8q699wdc6yk', 'admin', 0),
(11, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$VZMA70ZFi4rrba51YGaRjeMZr5AeiJXDiYq/ZZ0jX8xOZj5jzniRG', '42cv8jctzzc', 'admin', 0),
(12, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$VL7Px0R.mqDzjlSePC3c2uai1FA6ufbAbB6tQwxZxy65m7Ekk1p7O', 'zhnfm5mo3t', 'admin', 0),
(13, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$WKWxTHrV7r2CTLAOxIsnueedA.kl3QrwRQKbi65.syZHYliMoGMn.', 'k81ppvmovbp', 'admin', 0),
(14, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$8TL4.PolLdvDKqLt.5B9CeiC1/YE91OIZEucMW8d4J/M2Q7kytwrO', '795ybb3ycci', 'admin', 0),
(15, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$5iJZEEL.iJ6zxExIFrFnmO5XkVzyKWSkoSdM1hWihdSbqwMhcOp7a', 'zm126rma5h', 'admin', 0),
(16, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$.83E2KjMIiM7gT9ZCWmPeux8165p0ZdKofAHP0GuuvApNQzKRBcGC', 'ol02parj5tr', 'admin', 0),
(17, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$BgJhv0k9AwMJhr2C91mBx.Mw9vBgBAhXSdueGz6Bb31j/iXs5BlWK', 'hhemjhreddp', 'admin', 0),
(18, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$jBOj0R7uJQTPHWCKF/fp2.xnD2e08O9vvd3UfuuoDPHYFKAjwO9ry', 'wd1b0hn874', 'admin', 0),
(19, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$BUmVrpASwBgHltNDRjx.6OyEL1UJ/a9Apb8Oze7RV8baeYpg0Q.PG', '9gr8mknhads', 'admin', 0),
(20, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$Q/AyRI7o8ht/bMqs/d/NEeAHLNXBaA7ixJoxKtH/X.QEmVrd.H9VW', 'cd6vo40u42', 'admin', 0),
(21, '', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$eic/NKHDN8DKnXEzbEIxz.6ooH.R3H8f0E/XXgEhhGZTBG2.j7dIe', '3bkt0c3h1tb', 'admin', 0),
(22, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$rwGzPjRuBW4Ve3puqbANhOifWSQAiPDVfz5OtP44./J6Y1o10oQ7G', 'icxm9adqg3', 'admin', 0),
(23, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$DryEkF4FSfvyQ29H.I4jG.PdhM3rV/XwagFCPhM6/nkaAXEkD3t2e', 'gu56odsjeb6', 'admin', 0),
(24, 'josemiguel', 'eugenio@gmail.com', 'guatire', '0123456789', NULL, NULL, 1, '$2b$10$o7dUDwuDNBH8jLKkc4u.Iubc2WBALXxmP6NLxLDIwxNoMo928/P66', '2m5vj7lzy8m', 'admin2', 0);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cuadrantes`
--
ALTER TABLE `cuadrantes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `marcas`
--
ALTER TABLE `marcas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiponegocios`
--
ALTER TABLE `tiponegocios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cuadrantes`
--
ALTER TABLE `cuadrantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `marcas`
--
ALTER TABLE `marcas`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de la tabla `tiponegocios`
--
ALTER TABLE `tiponegocios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
