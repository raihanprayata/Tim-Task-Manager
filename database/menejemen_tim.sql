-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2025 at 04:10 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `menejemen_tim`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','member','owner') DEFAULT 'member',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'andi', 'andi@gmail.com', '$2b$10$7JAlMNb5wASMmbp44irN6.lCX5gIAQ6Q2uDFRVtYL/w0ihxuQsTqu', 'member', '2025-05-19 06:07:32', '2025-05-19 06:07:32'),
(2, 'andi', 'andi@gmail.com', '$2b$10$DxJhof0EJwxx.Bq3o.gUbOGWYYWhtzLSkrNGaAv5Bv8XOB0mrTmpq', 'member', '2025-05-19 06:08:12', '2025-05-19 06:08:12'),
(3, 'budi', 'budi@gmail.com', '$2b$10$BlywfAyy47zXtVUipMsjGeljHrtqF.fb9hNd6TjTEsXacceTDLWnW', 'member', '2025-05-19 06:32:38', '2025-05-19 06:32:38'),
(4, 'eko', 'eko@gmail.com', '$2b$10$F1s3CZj3LVBLqEbZTmcF9ub19zXw3Do8nwr2WrUJ3Khe7zCWqDn1C', 'member', '2025-05-19 06:33:02', '2025-05-19 06:33:02'),
(5, 'fajar', 'fajar@gmail.com', '$2b$10$yJRP7Yh7R0XZjEsBNeYAaO.QMkhv9v0xY/23yRH0cPSnIfkZdPR.a', 'member', '2025-05-19 06:33:21', '2025-05-19 06:33:21'),
(6, 'ucup', 'ucup@gmail.com', '$2b$10$7gO/6.EiPSV/rMkTv1tzAO7wHEys.9mdPqtiSvM2LlQh3mL4gh1DS', 'member', '2025-05-19 06:34:11', '2025-05-19 06:34:11'),
(7, 'bule', 'bule@gmail.com', '$2b$10$7La4sPkg2DFB386zBz5GU.DzcxdRIe3nY.eN1B54yMOlEFJJe7oO2', 'member', '2025-05-21 04:12:59', '2025-05-21 04:12:59'),
(9, 'dino', 'dino@gmail.com', '$2b$10$D4hcQSkCbD5iG4jDOgJJFuzm6AuvAW2N.ueARRQQRWu6Ku9IotOE.', 'member', '2025-05-21 06:02:10', '2025-05-21 06:02:10'),
(10, 'tio', 'tio@gmail.com', '$2b$10$qBBquhnRmFo2RqsJytlBueVgZLAuHlFEAKbNQldo54c62TwEiHOT.', 'member', '2025-05-21 06:12:22', '2025-05-21 06:12:22'),
(11, 'rehan', 'rehan@gmail.com', '$2b$10$eqIIUtSvJtBosGHAWyb2WOvuySJF3RzYlXMVdV1BMsEwE4OuBZoWG', 'member', '2025-05-22 02:20:24', '2025-05-22 02:20:24'),
(12, 'krisna', 'krisna@gmail.com', '$2b$10$DOcsv.ntlcihflqFNDEdEOLM3871im5PcLK.qwPdqmESs8uVyovyq', 'member', '2025-05-22 03:06:29', '2025-05-22 03:06:29'),
(13, 'agus', 'agus@gmail.com', '$2b$10$xVspd84VUsGfCLQQ74s60u7IDCcVFFhn8ey..jHLnu1m/KjQrH1QC', 'member', '2025-05-23 03:34:14', '2025-05-23 03:34:14'),
(14, 'raihan', 'raihan@gmail.com', '$2b$10$TCRx51aBZ/PIKZLTdLPb6.5jm63ie67ie7uWqiwXUS0xauOfjwCc6', 'member', '2025-05-23 03:56:13', '2025-05-23 03:56:13'),
(15, 'faiz', 'faiz@gmail.com', '$2b$10$gEMwzG18tEdD2TpiXn4ABu62/wgSFR9jkN.3/zyNy/cdl1NYxa2Yy', 'member', '2025-05-26 04:04:24', '2025-05-26 04:04:24'),
(16, 'ichwan', 'ichwan@gmail.com', '$2b$10$8k/1zGhLNMH0B5HXk41M9edcOajzT6XkVgrF0XwSeW8B2VC5HKItO', 'member', '2025-05-26 04:05:17', '2025-05-26 04:05:17');

-- --------------------------------------------------------

--
-- Table structure for table `project`
--

CREATE TABLE `project` (
  `id` int(11) NOT NULL,
  `project_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `ownerId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `project`
--

INSERT INTO `project` (`id`, `project_name`, `description`, `ownerId`, `createdAt`, `updatedAt`) VALUES
(13, 'Menejemen Alumni Petik', 'mengelola data alumni', 13, '2025-05-26 04:30:16', '2025-06-02 04:02:08'),
(14, 'HaloDock', 'memudahkan dalam akses kesehatan', 14, '2025-05-26 04:53:21', '2025-05-26 04:53:21'),
(15, 'BEM PeTIK', 'bertujuan mengelola data organisasi BEM', 12, '2025-05-26 04:55:23', '2025-05-26 04:55:23'),
(17, 'Rental PeTIK', 'mengelola data peminjaman transportasi PeTIK', 13, '2025-06-02 09:22:32', '2025-06-02 09:22:32');

-- --------------------------------------------------------

--
-- Table structure for table `project_member`
--

CREATE TABLE `project_member` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `task_name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `status` enum('todo','in_progress','done') NOT NULL,
  `deadline` datetime NOT NULL,
  `projectId` int(11) NOT NULL,
  `assignedTo` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `task_name`, `description`, `status`, `deadline`, `projectId`, `assignedTo`, `createdAt`, `updatedAt`) VALUES
(6, 'Membuat halaman landingpage', 'Buat tampilan login responsif dengan validasi', 'done', '2025-06-01 00:00:00', 13, 13, '2025-05-27 06:03:08', '2025-06-02 09:23:20'),
(8, 'membuat tampilan mobile', 'tampilan mobile dari API', 'todo', '2025-07-16 00:00:00', 14, 5, '2025-05-28 03:22:39', '2025-05-28 03:22:39'),
(9, 'membuat API', 'membuat API untuk web dan mobile', 'todo', '2025-07-13 00:00:00', 14, 14, '2025-05-28 03:23:48', '2025-05-28 03:23:48'),
(10, 'membuat UI/UX', 'membuat desain UI/UX', 'todo', '2025-06-28 00:00:00', 14, 4, '2025-05-28 03:25:18', '2025-05-28 03:25:18'),
(11, 'membuat API', 'membuat API untuk website dan mobile', 'done', '2025-06-17 00:00:00', 15, 12, '2025-05-28 03:25:56', '2025-06-02 08:06:23'),
(12, 'membuat tampilan website', 'membuat UI website', 'done', '2025-06-19 00:00:00', 15, 1, '2025-05-28 03:27:38', '2025-06-02 08:06:29'),
(13, 'membuat tampilan mobile', 'membuat tampilan mobile', 'done', '2025-05-30 00:00:00', 15, 4, '2025-05-28 03:29:48', '2025-06-02 08:06:32'),
(14, 'membuat UI / UX', 'membuat desain UI  UX', 'done', '2025-06-25 00:00:00', 13, 1, '2025-06-02 03:21:25', '2025-06-02 09:23:23'),
(15, 'membuat tampilan mobile', 'membuat tampilan versi mobile / android', 'done', '2025-09-03 00:00:00', 13, 5, '2025-06-02 03:22:05', '2025-06-02 09:23:26'),
(16, 'Desain UI UX', 'membuat  desain untuk UI UX', 'todo', '2025-06-19 00:00:00', 17, 4, '2025-06-02 09:23:05', '2025-06-02 09:23:05');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `authId` int(11) NOT NULL,
  `role` enum('admin','member','owner') DEFAULT 'member',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `authId`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'andi', 'andi@gmail.com', '$2b$10$7JAlMNb5wASMmbp44irN6.lCX5gIAQ6Q2uDFRVtYL/w0ihxuQsTqu', 1, 'admin', '2025-05-19 06:07:48', '2025-05-22 03:07:24'),
(4, 'fajar', 'fajar@gmail.com', '$2b$10$yJRP7Yh7R0XZjEsBNeYAaO.QMkhv9v0xY/23yRH0cPSnIfkZdPR.a', 5, 'member', '2025-05-19 06:33:28', '2025-05-19 06:33:28'),
(5, 'ucup', 'ucup@gmail.com', '$2b$10$7gO/6.EiPSV/rMkTv1tzAO7wHEys.9mdPqtiSvM2LlQh3mL4gh1DS', 6, 'member', '2025-05-19 06:34:16', '2025-05-19 06:34:16'),
(7, 'dino', 'dino@gmail.com', '$2b$10$D4hcQSkCbD5iG4jDOgJJFuzm6AuvAW2N.ueARRQQRWu6Ku9IotOE.', 9, 'member', '2025-05-21 06:02:34', '2025-05-21 06:03:00'),
(11, 'agus', 'agus@gmail.com', '$2b$10$xVspd84VUsGfCLQQ74s60u7IDCcVFFhn8ey..jHLnu1m/KjQrH1QC', 13, 'admin', '2025-05-23 03:34:34', '2025-05-26 04:13:59'),
(12, 'raihan', 'raihan@gmail.com', '$2b$10$TCRx51aBZ/PIKZLTdLPb6.5jm63ie67ie7uWqiwXUS0xauOfjwCc6', 14, 'owner', '2025-05-23 03:56:26', '2025-05-26 04:11:40'),
(13, 'faiz', 'faiz@gmail.com', '$2b$10$gEMwzG18tEdD2TpiXn4ABu62/wgSFR9jkN.3/zyNy/cdl1NYxa2Yy', 15, 'owner', '2025-05-26 04:04:42', '2025-05-26 04:14:10'),
(14, 'ichwan', 'ichwan@gmail.com', '$2b$10$8k/1zGhLNMH0B5HXk41M9edcOajzT6XkVgrF0XwSeW8B2VC5HKItO', 16, 'owner', '2025-05-26 04:05:35', '2025-05-26 04:06:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ownerId` (`ownerId`);

--
-- Indexes for table `project_member`
--
ALTER TABLE `project_member`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `project_member_projectId_userId_unique` (`userId`,`projectId`),
  ADD KEY `projectId` (`projectId`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projectId` (`projectId`),
  ADD KEY `assignedTo` (`assignedTo`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authId` (`authId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `project_member`
--
ALTER TABLE `project_member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`ownerId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_member`
--
ALTER TABLE `project_member`
  ADD CONSTRAINT `project_member_ibfk_5` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_member_ibfk_6` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_5` FOREIGN KEY (`projectId`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `task_ibfk_6` FOREIGN KEY (`assignedTo`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`authId`) REFERENCES `auth` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
