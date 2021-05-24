CREATE TABLE IF NOT EXISTS `track_202130_users` (
`id` INT NULL,
`name` VARCHAR(MAX) NULL,
`username` VARCHAR(MAX) NULL,
`email` VARCHAR(MAX) NULL,
`password` VARCHAR(MAX) NULL,
`img` VARCHAR(MAX) NULL,
`data_create` VARCHAR(MAX) NULL
);

INSERT INTO track_202130_users VALUES
(1,'Stark Moody','user1','user1@gmail.com',md5('pass'),'https://via.placeholder.com/400/723/fff/?text=user1','2021-01-21 07:59:56 '),
(2,'Leach Pace','user2','user2@gmail.com',md5('pass'),'https://via.placeholder.com/400/781/fff/?text=user2','2021-01-09 03:43:32 '),
(3,'Beatrice Mckay','user3','user3@gmail.com',md5('pass'),'https://via.placeholder.com/400/786/fff/?text=user3','2021-02-14 07:57:40 '),
(4,'Lawanda Frazier','user4','user4@gmail.com',md5('pass'),'https://via.placeholder.com/400/791/fff/?text=user4','2021-04-08 08:56:11 '),
(5,'Jayne Saunders','user5','user5@gmail.com',md5('pass'),'https://via.placeholder.com/400/973/fff/?text=user5','2021-03-08 12:52:39 '),
(6,'Andrea Dean','user6','user6@gmail.com',md5('pass'),'https://via.placeholder.com/400/778/fff/?text=user6','2021-03-21 01:43:38 '),
(7,'Tommie Parks','user7','user7@gmail.com',md5('pass'),'https://via.placeholder.com/400/986/fff/?text=user7','2021-03-28 11:01:42 '),
(8,'Mcpherson Estrada','user8','user8@gmail.com',md5('pass'),'https://via.placeholder.com/400/898/fff/?text=user8','2021-04-14 02:45:07 '),
(9,'Forbes Donovan','user9','user9@gmail.com',md5('pass'),'https://via.placeholder.com/400/778/fff/?text=user9','2021-03-06 03:41:51 '),
(10,'Francisca Mosley','user10','user10@gmail.com',md5('pass'),'https://via.placeholder.com/400/945/fff/?text=user10','2021-01-21 03:23:51 ');