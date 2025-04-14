-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Apr 14, 2025 at 08:57 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `file_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `name`, `email`, `file_path`) VALUES
(1, 'Shiva Kumar Yedla', '2111cs020508@mallareddyuniversity.ac.in', '1743841940_Architecture.png'),
(6, 'Shiva Sai Dhanpal', '2111cs020510@mallareddyuniversity.ac.in', '1743841161_Architecture.png'),
(7, 'Varun Shivanadri', '2111cs020456@mallareddyuniversity.ac.in', '1743840140_Architecture.png'),
(11, 'Saketh Ravikanti', '2111cs020468@mallareddyuniversity.ac.in', '1743842696_Architecture.png'),
(12, 'Varun Reddy Bushireddy', '2111cs020525@mallareddyuniversity.ac.in', '1743843187_Architecture.png'),
(13, 'Sai Vardhan Gurijala', '2111cs020454@mallareddyuniversity.ac.in', '1743843218_Architecture.png'),
(14, 'Sanjay Manigandla', '2111cs020486@mallareddyuniversity.ac.in', '1743843258_Architecture.png'),
(15, 'Smrithi Sarkar', '2111cs020492@mallareddyuniversity.ac.in', '1744602542_Architecture.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
