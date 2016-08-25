/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Дамп таблицы Author
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Author`;

CREATE TABLE `Author` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Author` WRITE;
/*!40000 ALTER TABLE `Author` DISABLE KEYS */;

INSERT INTO `Author` (`id`, `name`)
VALUES
	(1,'John'),
	(2,'Doe'),
	(3,'Reviewer1'),
	(4,'Reviewer2');

/*!40000 ALTER TABLE `Author` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы Chapter
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Chapter`;

CREATE TABLE `Chapter` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `docId` int(11) DEFAULT NULL,
  `name` varchar(11) DEFAULT NULL,
  `authorId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Chapter` WRITE;
/*!40000 ALTER TABLE `Chapter` DISABLE KEYS */;

INSERT INTO `Chapter` (`id`, `docId`, `name`, `authorId`)
VALUES
	(1,1,'1.1',1),
	(2,1,'1.2',1),
	(3,2,'2.1',1),
	(4,2,'2.2',2);

/*!40000 ALTER TABLE `Chapter` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ChapterInfo
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ChapterInfo`;

CREATE TABLE `ChapterInfo` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `chapterId` int(11) DEFAULT NULL,
  `name` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ChapterInfo` WRITE;
/*!40000 ALTER TABLE `ChapterInfo` DISABLE KEYS */;

INSERT INTO `ChapterInfo` (`id`, `chapterId`, `name`)
VALUES
	(1,1,'1.1 Info'),
	(2,4,'2.2 Info'),
	(3,3,'2.1 Info');

/*!40000 ALTER TABLE `ChapterInfo` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы Doc
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Doc`;

CREATE TABLE `Doc` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Doc` WRITE;
/*!40000 ALTER TABLE `Doc` DISABLE KEYS */;

INSERT INTO `Doc` (`id`, `name`)
VALUES
	(1,'1'),
	(2,'2');

/*!40000 ALTER TABLE `Doc` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы Paragraph
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Paragraph`;

CREATE TABLE `Paragraph` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `chapterId` int(11) DEFAULT NULL,
  `name` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `Paragraph` WRITE;
/*!40000 ALTER TABLE `Paragraph` DISABLE KEYS */;

INSERT INTO `Paragraph` (`id`, `chapterId`, `name`)
VALUES
	(1,1,'1.1.1'),
	(2,1,'1.1.2'),
	(3,2,'1.2.1'),
	(4,3,'2.1.1'),
	(5,3,'2.1.2'),
	(6,4,'2.2.1');

/*!40000 ALTER TABLE `Paragraph` ENABLE KEYS */;
UNLOCK TABLES;


# Дамп таблицы ChapterStatistic
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ChapterStatistic`;

CREATE TABLE `ChapterStatistic` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `chapterInfoId` int(11) DEFAULT NULL,
  `name` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `ChapterStatistic` WRITE;
/*!40000 ALTER TABLE `ChapterStatistic` DISABLE KEYS */;

INSERT INTO `ChapterStatistic` (`id`, `chapterInfoId`, `name`)
VALUES
	(1,1,'1.1 Stat'),
	(2,3,'2.1 Stat');

/*!40000 ALTER TABLE `ChapterStatistic` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
