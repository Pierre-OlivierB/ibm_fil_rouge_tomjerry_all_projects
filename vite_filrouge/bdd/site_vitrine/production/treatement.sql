-- *is_treat_type
INSERT INTO
    `is_treat_type` (
        `Id_treatement`, `Id_treatement_type`
    )
VALUES ('1', '4');

INSERT INTO
    `is_treat_type` (
        `Id_treatement`, `Id_treatement_type`
    )
VALUES ('2', '4'),
    ('3', '4'),
    ('4', '4'),
    ('5', '4'),
    ('6', '4');
-- *------------------------------------------
-- * is_treated
INSERT INTO
    `is_treated` (
        `Num_Field`, `Id_treatement`, `date_treatement`, `qtx_treat`
    )
VALUES (
        '37', '6', '2024-03-25', '6.5'
    ),
    (
        '31', '6', '2024-03-25', '6.5'
    ),
    (
        '34', '6', '2024-03-25', '6.5'
    );

--*-----------------------------------
-- *Exemple Function
DELIMITER / /

CREATE FUNCTION COUNT_ARTICLES_BY_CATEGORY(category 
VARCHAR(50)) RETURNS INT 
BEGIN 
DECLARE
	nbArticles INT;
	SELECT COUNT(articles.id) INTO nbArticles
	FROM articles
	    INNER JOIN categories ON articles.category_id = categories.id
	WHERE
	    categories.name = category;
	RETURN nbArticles;
END
// 

DELIMITER;
--*-----------------------------------
-- *Function a reçu un traitement

DELIMITER $$

DROP FUNCTION IF EXISTS WITH_BONUS $$

CREATE FUNCTION WITH_BONUS(Num_Field INT) RETURNS VARCHAR 
BEGIN 
DECLARE
	bonus_include VARCHAR DEFAULT '';
DECLARE
	field_select VARCHAR;
	SELECT f.Num_Field INTO field_select
	FROM field as f, is_treated as fit
	WHERE
	    Num_Field = fit.Num_Field;
	IF field_select NOTNULL THEN bonus_include = 'avec apport' END IF;
	RETURN bonus_include;
END
$$ 

;
-- !---------------------------
-- ! test 2
-- DELIMITER $$

-- DROP FUNCTION IF EXISTS WITH_BONUS $$

-- CREATE FUNCTION WITH_BONUS(Num_Field INT) RETURNS VARCHAR
-- BEGIN
-- DECLARE
-- 	bonus_include VARCHAR DEFAULT '';
-- 	SELECT f.label_field INTO bonus_include
-- 	FROM field as f, is_treated as fit
-- 	WHERE
-- 	    Num_Field = fit.Num_Field;
-- 	IF field_select NOTNULL THEN bonus_include = 'avec apport' END IF;
-- 	RETURN bonus_include;
-- END
-- $$;
-- *----------------------------------------------------
INSERT INTO
    `is_treated` (
        `Num_Field`, `Id_treatement`, `date_treatement`, `qtx_treat`
    )
VALUES (
        '26', '6', '2024-03-26', '6.5'
    ),
    (
        '20', '6', '2024-03-26', '6.5'
    ),
    (
        '23', '6', '2024-03-26', '6.5'
    );
-- *----------------------------------------------------
INSERT INTO
    `is_treated` (
        `Num_Field`, `Id_treatement`, `date_treatement`, `qtx_treat`
    )
VALUES (
        '44', '6', '2024-03-26', '6.5'
    ),
    (
        '45', '6', '2024-03-26', '6.5'
    ),
    (
        '47', '6', '2024-03-26', '6.5'
    );
-- !----------------------------------------------
-- !-----------------------horticulture-----------
-- !----------------------------------------------
INSERT INTO
    `is_treated` (
        `Num_Field`, `Id_treatement`, `date_treatement`, `qtx_treat`
    )
VALUES (
        '55', '6', '2024-04-23', '6.5'
    ),
    (
        '56', '6', '2024-04-23', '6.5'
    ),
    (
        '58', '6', '2024-04-23', '6.5'
    );