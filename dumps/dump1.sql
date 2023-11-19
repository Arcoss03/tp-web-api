-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 19, 2023 at 09:57 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_sign`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `date`) VALUES
(3, 'test', '2022-10-31 09:00:00.594'),
(4, 'test3', '2022-10-31 09:00:00.594'),
(5, 'test3', '2022-10-31 09:00:00.594'),
(6, 'cours de math', '2020-07-30 18:00:00.000'),
(7, 'cours de math3', '2028-07-30 18:00:00.000');

-- --------------------------------------------------------

--
-- Table structure for table `students_course`
--

CREATE TABLE `students_course` (
  `userId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `redgisteredAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `signedAt` datetime(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `students_course`
--

INSERT INTO `students_course` (`userId`, `courseId`, `redgisteredAt`, `signedAt`) VALUES
(1, 3, '2023-11-18 18:41:30.778', NULL),
(1, 4, '2023-11-18 18:45:53.333', NULL),
(1, 5, '2023-11-18 18:58:03.832', NULL),
(4, 3, '2023-11-18 18:41:30.778', NULL),
(4, 4, '2023-11-18 18:45:53.333', NULL),
(4, 5, '2023-11-18 18:58:03.832', NULL),
(5, 4, '2023-11-18 18:45:53.333', NULL),
(5, 5, '2023-11-18 18:58:03.832', NULL),
(5, 6, '2023-11-19 14:35:33.139', NULL),
(5, 7, '2023-11-19 15:02:10.926', NULL),
(6, 6, '2023-11-19 14:35:33.139', NULL),
(6, 7, '2023-11-19 15:02:10.926', NULL),
(11, 6, '2023-11-19 14:35:33.139', '2023-11-19 14:50:14.603'),
(11, 7, '2023-11-19 15:02:10.926', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`) VALUES
(1, 'machin.truc@orange.fr', 'tersffzegez', 0),
(4, 'lala.truc@gmail.fr', '$2b$10$7rLy26hy3/V71veuVXgP5eQsoXP.KLaQW7Rmxzu3/41rs0kUaaH6e', 0),
(5, 'mach.truc@gmail.fr', '$2b$10$1dp4d3pKtMdcb3w7fjkkNOz1tsWjhLcoI187swFMBZjSsrcxBF/Bm', 0),
(6, 'mach.truc@free.fr', '$2b$10$meFjDEWUGCuUzwA8mJ9ZheJJNVWULzstewxpUApLY7pAfrgD9.luK', 0),
(11, 'paul.menard@gmail.com', '$2b$10$bvmzIuU2ODOw9DjGo1Z75uL3mngLdUiQlOGzUbbCQES.bl4CQC0cm', 0),
(12, 'frin.arthur@gmail.com', '$2b$10$IgbcRxotSpsN9Whz5Wu/feuR9erlJZW7BEvG1dJ0UDyBmCyMSlz1G', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `students_course`
--
ALTER TABLE `students_course`
  ADD PRIMARY KEY (`userId`,`courseId`),
  ADD KEY `students_course_courseId_fkey` (`courseId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_key` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `students_course`
--
ALTER TABLE `students_course`
  ADD CONSTRAINT `students_course_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `students_course_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
