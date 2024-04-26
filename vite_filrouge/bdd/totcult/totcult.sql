-- cereales
SELECT Sum(cg.qtx_cult) as data
FROM
    field as f,
    type_field as tf,
    cult_give as cg,
    is_cult_affilied as ica,
    culture as c,
    cereal as cer
WHERE
    f.id_type_field = tf.id_type_field
    AND f.num_field = ica.Num_Field
    AND ica.Id_culture = cer.Id_culture
    AND cg.Id_culture = cer.Id_culture
    AND c.Id_culture = cer.Id_culture
    AND ica.date_cult_affilied = cg.date_cult;

-- betterave
SELECT SUM(cg.qtx_cult) as data
FROM
    field as f,
    type_field as tf,
    cult_give as cg,
    is_cult_affilied as ica,
    culture as c
WHERE
    f.id_type_field = tf.id_type_field
    AND f.num_field = ica.Num_Field
    AND ica.Id_culture = 8
    AND cg.Id_culture = 8
    AND c.Id_culture = 8
    AND ica.date_cult_affilied = cg.date_cult;
--  pomme de terre
SELECT Sum(cg.qtx_cult) as data
FROM
    field as f,
    type_field as tf,
    cult_give as cg,
    is_cult_affilied as ica,
    culture as c
WHERE
    f.id_type_field = tf.id_type_field
    AND f.num_field = ica.Num_Field
    AND ica.Id_culture = 5
    AND cg.Id_culture = 5
    AND c.Id_culture = 5
    AND ica.date_cult_affilied = cg.date_cult;

-- !--------------------
SELECT SUM(datas) as data
from (
        SELECT tf.name_field, cg.qtx_cult as datas
        FROM
            field as f, type_field as tf, cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit
        WHERE
            f.id_type_field = tf.id_type_field
            AND f.num_field = ica.Num_Field
            AND ica.Id_culture = 5
            AND cg.Id_culture = 5
            AND c.Id_culture = 5
            AND ica.date_cult_affilied = cg.date_cult
            AND f.Num_Field NOT IN(
                Select fit.Num_Field
                from is_treated as fit
            )
        GROUP BY
            tf.name_field
    ) src;