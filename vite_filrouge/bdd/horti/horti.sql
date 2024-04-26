SELECT f.num_field, CONCAT(
        tf.name_field, ' ', WITH_BONUS (f.Num_Field)
    ) as name, hg.qtx_horti as data
FROM
    field as f,
    type_field as tf,
    horti_give as hg,
    is_horti_affilied as iha,
    horticulture as h,
    vegetable as veg
WHERE
    f.id_type_field = tf.id_type_field
    AND f.num_field = iha.Num_Field
    AND iha.Id_Horticulture = veg.Id_Horticulture
    AND hg.Id_Horticulture = veg.Id_Horticulture
    AND h.Id_Horticulture = veg.Id_Horticulture
    AND iha.date_horti_affilied = hg.date_horti;

-- !---------------------------
-- Problème à is_affillied
-- !---------------------------

INSERT INTO
    `is_treated` (
        `Num_Field`, `Id_treatement`, `date_treatement`, `qtx_treat`
    )
VALUES (
        '77', '6', '24/04/2024', '6.5'
    ),
    (
        '78', '6', '24/04/2024', '6.5'
    ),
    ('80', '6', '24/04/24', '6.5');

INSERT INTO
    `is_treated` (
        `Num_Field`, `Id_treatement`, `date_treatement`, `qtx_treat`
    )
VALUES (
        '99', '6', '24/04/2024', '6.5'
    ),
    (
        '100', '6', '24/04/2024', '6.5'
    ),
    ('102', '6', '24/04/24', '6.5');

-- !-----------------------------
-- ! Doesn't work :
-- !-----------------------------
SELECT total_data.name, total_data.data as data
FROM (
        SELECT DISTINCT
            CONCAT(
                tf.name_field, ' ', WITH_BONUS (f.Num_Field)
            ) as name, SUM(hg.qtx_horti) as data
        FROM
            field as f
            JOIN type_field as tf ON f.id_type_field = tf.id_type_field
            JOIN is_horti_affilied as iha ON f.num_field = iha.Num_Field
            JOIN horti_give as hg ON iha.date_horti_affilied = hg.date_horti
            JOIN horticulture as h ON iha.Id_Horticulture = h.Id_Horticulture
            JOIN vegetable as veg ON veg.Id_Horticulture = h.Id_Horticulture
            JOIN fruit as frt ON frt.Id_Horticulture = h.Id_Horticulture
        WHERE
            iha.Id_Horticulture IN (
                frt.Id_Horticulture, veg.Id_Horticulture
            )
            AND hg.Id_Horticulture IN (
                frt.Id_Horticulture, veg.Id_Horticulture
            )
            AND h.Id_Horticulture IN (
                frt.Id_Horticulture, veg.Id_Horticulture
            )
        GROUP BY
            name, h.Id_Horticulture, hg.Id_Horticulture, iha.Id_Horticulture
    ) AS total_data;
-- !-----------------------------
-- ! Doesn't work :
-- !-----------------------------

SELECT total_data.name, sum(total_data.data) as data
FROM (
        SELECT DISTINCT
            CONCAT(
                tf.name_field, ' ', WITH_BONUS (f.Num_Field)
            ) as name, SUM(hg.qtx_horti) as data
        FROM
            field as f, type_field as tf, horti_give as hg, is_horti_affilied as iha, horticulture as h, is_treated as fit, vegetable as veg, fruit as frt
        WHERE
            f.id_type_field = tf.id_type_field
            AND f.num_field = iha.Num_Field
            AND iha.Id_Horticulture IN (
                frt.Id_Horticulture, veg.Id_Horticulture
            )
            AND hg.Id_Horticulture IN (
                frt.Id_Horticulture, veg.Id_Horticulture
            )
            AND h.Id_Horticulture IN (
                frt.Id_Horticulture, veg.Id_Horticulture
            )
            AND iha.date_horti_affilied = hg.date_horti
        GROUP BY
            name, h.Id_Horticulture, hg.Id_Horticulture, iha.Id_Horticulture
    ) AS total_data
GROUP BY
    name;

-- *-------------------------Works
SELECT total_data.name, sum(total_data.datas) as data
FROM (
        SELECT DISTINCT
            CONCAT(
                tf.name_field, ' ', WITH_BONUS (f.Num_Field)
            ) as name, hg.qtx_horti as datas
        FROM
            field as f, type_field as tf, horti_give as hg, is_horti_affilied as iha, horticulture as h, is_treated as fit, vegetable as veg, fruit as frt
        WHERE
            f.id_type_field = tf.id_type_field
            AND f.num_field = iha.Num_Field
            AND iha.Id_Horticulture IN (
                frt.Id_Horticulture, veg.Id_Horticulture
            )
            AND iha.date_horti_affilied = hg.date_horti
    ) AS total_data
GROUP BY
    name;
-- !stop calcaire => qui amène un probléme à tourbe 0.5 disparu