-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 28 2024 г., 11:28
-- Версия сервера: 10.4.28-MariaDB
-- Версия PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `propwise`
--

-- --------------------------------------------------------

--
-- Структура таблицы `chat`
--

CREATE TABLE `chat` (
  `chat_id` int(11) NOT NULL,
  `user1_id` int(11) DEFAULT NULL,
  `user2_id` int(11) DEFAULT NULL,
  `chat_status` enum('pinned','all') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `chat`
--

INSERT INTO `chat` (`chat_id`, `user1_id`, `user2_id`, `chat_status`) VALUES
(123, 6, 5, 'pinned');

-- --------------------------------------------------------

--
-- Структура таблицы `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `day` varchar(10) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `event_name` varchar(100) DEFAULT NULL,
  `month` varchar(100) DEFAULT NULL,
  `time_from` varchar(20) DEFAULT NULL,
  `time_to` varchar(20) DEFAULT NULL,
  `week_day` varchar(50) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `link` varchar(2000) DEFAULT NULL,
  `status` enum('imp','impbnurg','nimpburg','nimp') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `events`
--

INSERT INTO `events` (`event_id`, `day`, `description`, `event_name`, `month`, `time_from`, `time_to`, `week_day`, `user_id`, `link`, `status`) VALUES
(40, '2', 'test', 'test', 'January-2024', '11:11', '12:12', 'Tuesday', 5, '', 'imp'),
(41, '9', 'test', 'another one', 'January-2024', '10:00', '12:00', 'Tuesday', 5, '', 'nimpburg'),
(42, '7', 'test', 'test2', 'February-2024', '11:11', '12:12', 'Wednesday', 5, '', 'nimpburg'),
(43, '11', 'test', 'test2', 'January-2024', '11:11', '12:12', 'Thursday', 5, '', 'nimp'),
(44, '9', 'test', 'just here', 'January-2024', '10:12', '12:12', 'Tuesday', 7, '', 'imp'),
(45, '9', 'testtttt', 'just another test', 'January-2024', '09:00', '12:00', 'Tuesday', 5, '', 'imp');

-- --------------------------------------------------------

--
-- Структура таблицы `friendship`
--

CREATE TABLE `friendship` (
  `friendship_id` int(11) NOT NULL,
  `user1_id` int(11) DEFAULT NULL,
  `user2_id` int(11) DEFAULT NULL,
  `status` enum('pending','accepted','declined') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `friendship`
--

INSERT INTO `friendship` (`friendship_id`, `user1_id`, `user2_id`, `status`) VALUES
(132, 5, 6, 'accepted');

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `chat_id` int(11) DEFAULT NULL,
  `sender_id` int(11) DEFAULT NULL,
  `value` varchar(5000) DEFAULT NULL,
  `timestamp` varchar(30) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`message_id`, `chat_id`, `sender_id`, `value`, `timestamp`, `status`) VALUES
(341, 123, 5, 'pass driving licience', '18:53', 1),
(342, 123, 5, '{\"event_id\":20,\"day\":\"2\",\"description\":\"just create new modal win, test it!!!\",\"event_name\":\"another modal created\",\"month\":\"January-2024\",\"time_from\":\"11:10\",\"time_to\":\"12:00\",\"week_day\":\"Tuesday\",\"user_id\":5,\"link\":\"\"}', '19:04', 1),
(343, 123, 5, '{\"event_id\":24,\"day\":\"10\",\"description\":\"test\",\"event_name\":\"test\",\"month\":\"January-2024\",\"time_from\":\"10:10\",\"time_to\":\"00:00\",\"week_day\":\"Wednesday\",\"user_id\":5,\"link\":\"\"}', '19:28', 1),
(344, 123, 5, '{\"event_id\":25,\"day\":\"9\",\"description\":\"test\",\"event_name\":\"test2\",\"month\":\"January-2024\",\"time_from\":\"11:10\",\"time_to\":\"12:13\",\"week_day\":\"Tuesday\",\"user_id\":5,\"link\":\"\"}', '19:44', 1),
(345, 123, 5, '{\"event_id\":25,\"day\":\"9\",\"description\":\"test\",\"event_name\":\"test2\",\"month\":\"January-2024\",\"time_from\":\"11:10\",\"time_to\":\"12:13\",\"week_day\":\"Tuesday\",\"user_id\":5,\"link\":\"\"}', '19:45', 1),
(346, 123, 5, 'hey', '19:45', 1),
(347, 123, 5, '{\"event_id\":28,\"day\":\"4\",\"description\":\"test2\",\"event_name\":\"test2\",\"month\":\"January-2024\",\"time_from\":\"10:11\",\"time_to\":\"12:11\",\"week_day\":\"Thursday\",\"user_id\":5,\"link\":\"https://github.com/b1on1kkk\"}', '20:03', 1),
(348, 123, 5, '{\"event_id\":23,\"day\":\"2\",\"description\":\"test\",\"event_name\":\"pass driving licience\",\"month\":\"January-2024\",\"time_from\":\"10:00\",\"time_to\":\"12:00\",\"week_day\":\"Tuesday\",\"user_id\":5,\"link\":\"\"}', '20:08', 1),
(349, 123, 5, '{\"event_id\":25,\"day\":\"9\",\"description\":\"test\",\"event_name\":\"test2\",\"month\":\"January-2024\",\"time_from\":\"11:10\",\"time_to\":\"12:13\",\"week_day\":\"Tuesday\",\"user_id\":5,\"link\":\"\"}', '20:49', 1),
(350, 123, 5, 'hey', '20:52', 1),
(351, 123, 6, 'ok', '21:05', 1),
(352, 123, 6, '{\"event_id\":30,\"day\":\"9\",\"description\":\"test\",\"event_name\":\"test_event\",\"month\":\"January-2024\",\"time_from\":\"11:11\",\"time_to\":\"11:11\",\"week_day\":\"Tuesday\",\"user_id\":6,\"link\":\"\"}', '21:12', 1),
(353, 123, 5, '{\"event_id\":34,\"day\":\"9\",\"description\":\"test\",\"event_name\":\"test_event\",\"month\":\"January-2024\",\"time_from\":\"11:11\",\"time_to\":\"11:11\",\"week_day\":\"Tuesday\",\"user_id\":5,\"link\":\"\"}', '21:47', 1),
(354, 123, 6, '{\"event_id\":35,\"day\":\"9\",\"description\":\"test\",\"event_name\":\"test_event\",\"month\":\"January-2024\",\"time_from\":\"11:11\",\"time_to\":\"11:11\",\"week_day\":\"Tuesday\",\"user_id\":6,\"link\":\"\"}', '21:47', 1),
(355, 123, 5, '{\"event_id\":20,\"day\":\"2\",\"description\":\"just create new modal win, test it!!!\",\"event_name\":\"another modal created\",\"month\":\"January-2024\",\"time_from\":\"11:10\",\"time_to\":\"12:00\",\"week_day\":\"Tuesday\",\"user_id\":5,\"link\":\"\"}', '22:06', 1),
(356, 123, 5, '{\"event_id\":20,\"day\":\"2\",\"description\":\"just create new modal win, test it!!!\",\"event_name\":\"another modal created\",\"month\":\"January-2024\",\"time_from\":\"11:10\",\"time_to\":\"12:00\",\"week_day\":\"Tuesday\",\"user_id\":5,\"link\":\"\"}', '22:24', 1),
(357, 123, 5, '{\"event_id\":23,\"day\":\"2\",\"description\":\"test\",\"event_name\":\"pass driving licience\",\"month\":\"January-2024\",\"time_from\":\"10:00\",\"time_to\":\"12:00\",\"week_day\":\"Tuesday\",\"user_id\":5,\"link\":\"\"}', '22:27', 1),
(358, 123, 5, '{\"event_id\":28,\"day\":\"4\",\"description\":\"test2\",\"event_name\":\"test2\",\"month\":\"January-2024\",\"time_from\":\"10:11\",\"time_to\":\"12:11\",\"week_day\":\"Thursday\",\"user_id\":5,\"link\":\"https://github.com/b1on1kkk\"}', '22:32', 1),
(359, 123, 5, 'рш', '12:38', 0),
(360, 123, 5, '{\"event_id\":43,\"day\":\"11\",\"description\":\"test\",\"event_name\":\"test2\",\"month\":\"January-2024\",\"time_from\":\"11:11\",\"time_to\":\"12:12\",\"week_day\":\"Thursday\",\"user_id\":5,\"link\":\"\",\"status\":\"nimp\"}', '13:02', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `notifications`
--

CREATE TABLE `notifications` (
  `notif_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `notif_type` enum('system','friend_request') DEFAULT NULL,
  `context` varchar(1000) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `timestamp` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(30) DEFAULT NULL,
  `lastname` varchar(30) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `role` varchar(15) DEFAULT NULL,
  `avatar` varchar(2000) DEFAULT NULL,
  `hash_key` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `lastname`, `email`, `password`, `role`, `avatar`, `hash_key`) VALUES
(5, 'Alex1', 'Sinyak', 'just74@mail.ru', '45879693847657634852345', 'User', '', 'ec3d7f0e-57a0-4193-86b8-eab85229da14'),
(6, 'Alex2', 'Sinyak', 'b1on111kk@mail.ru', '387528436451923846348975678349758235', 'User', '', '9bf1dac4-5ab8-43c4-8f95-5f36e5db4d6b'),
(7, 'Alex3', 'Sinyak', 'fkbgsdjkh@mail.ru', '24975829654792538764260965437906', 'User', '', '74c1e0bc-4879-452e-a361-740925440a9f');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`chat_id`),
  ADD KEY `user1_id` (`user1_id`),
  ADD KEY `user2_id` (`user2_id`);

--
-- Индексы таблицы `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `friendship`
--
ALTER TABLE `friendship`
  ADD PRIMARY KEY (`friendship_id`),
  ADD KEY `user1_id` (`user1_id`),
  ADD KEY `user2_id` (`user2_id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `chat_id` (`chat_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Индексы таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notif_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `chat`
--
ALTER TABLE `chat`
  MODIFY `chat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=124;

--
-- AUTO_INCREMENT для таблицы `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT для таблицы `friendship`
--
ALTER TABLE `friendship`
  MODIFY `friendship_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=361;

--
-- AUTO_INCREMENT для таблицы `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notif_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `friendship`
--
ALTER TABLE `friendship`
  ADD CONSTRAINT `friendship_ibfk_1` FOREIGN KEY (`user1_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friendship_ibfk_2` FOREIGN KEY (`user2_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`chat_id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
