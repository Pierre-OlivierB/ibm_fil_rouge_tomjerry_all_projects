const mysql = require("mysql");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");

var user = "invited";
var password = "";

var db = mysql.createConnection({
  host: "localhost",
  user: user,
  password: password,
  database: "fil_rouge_farm3",
  multipleStatements: true,
});
db.connect(function (err) {
  if (err) throw err;
});

const test = (corole) => {
  switch (corole) {
    case "rh":
      user = "rh";
      password = "";
      // console.log("rh" + corole);
      break;
    case "admin":
      // console.log("admin");
      user = "admin";
      password = "";
      break;

    default:
      // console.log(corole);
      // console.log("test");
      user = "invited";
      password = "";
      break;
  }
};

// *electricity
const melectricity = (req, res) => {
  const sql =
    "SELECT Id_Energy, tp.begin_hour,mp.label_name,ebt.qtx_ener" +
    " FROM energy_by_time as ebt, month_product as mp, time_period as tp" +
    " WHERE Id_Energy = 1 AND mp.Id_Month = ebt.Id_Month AND tp.Id_time_period=ebt.Id_time_period" +
    " ORDER BY ebt.Id_Month ASC, tp.Id_time_period ASC;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mgetelecbymonth = (req, res) => {
  let values = req.body.data;
  const frame = [
    "00:00:00",
    "02:00:00",
    "04:00:00",
    "06:00:00",
    "08:00:00",
    "10:00:00",
    "12:00:00",
    "14:00:00",
    "16:00:00",
    "18:00:00",
    "20:00:00",
    "22:00:00",
  ];
  let hour =
    values.begin_hour > 0 || values.begin_hour < 13
      ? frame[values.begin_hour - 1]
      : null;
  let month = values.label_name;
  let dataSend = [hour, month];
  const sql =
    " SELECT DISTINCT ebt.qtx_ener" +
    " FROM energy_by_time as ebt, month_product as mp, time_period as tp" +
    " WHERE ebt.Id_time_period=(SELECT tp.Id_time_period FROM time_period as tp WHERE tp.begin_hour=?) AND ebt.Id_Month=(SELECT mp.Id_Month FROM month_product as mp WHERE mp.label_name=?);";
  db.query(sql, [...dataSend], (err, result) => {
    if (err) return res.json("error");
    return res.send({ value: result[0] });
  });
};
// *culture
const mculture_pommedeterre = (req, res) => {
  const sql =
    "SELECT CONCAT(tf.name_field,' ',WITH_BONUS(f.Num_Field)) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=5" +
    " AND cg.Id_culture=5" +
    " AND c.Id_culture=5" +
    " AND ica.date_cult_affilied = cg.date_cult;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mculture_pommedeterresans = (req, res) => {
  const sql =
    "SELECT DISTINCT(tf.name_field) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=5" +
    " AND cg.Id_culture=5" +
    " AND c.Id_culture=5" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mculture_betterave = (req, res) => {
  const sql =
    "SELECT CONCAT(tf.name_field,' ',WITH_BONUS(f.Num_Field)) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=8" +
    " AND cg.Id_culture=8" +
    " AND c.Id_culture=8" +
    " AND ica.date_cult_affilied = cg.date_cult;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mculture_betteravesans = (req, res) => {
  const sql =
    "SELECT DISTINCT(tf.name_field) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=8" +
    " AND cg.Id_culture=8" +
    " AND c.Id_culture=8" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mculture_cereal = (req, res) => {
  const sql =
    "SELECT CONCAT(tf.name_field,' ',WITH_BONUS(f.Num_Field)) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, cereal as cer" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=cer.Id_culture" +
    " AND cg.Id_culture=cer.Id_culture" +
    " AND c.Id_culture=cer.Id_culture" +
    " AND ica.date_cult_affilied = cg.date_cult;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mculture_cerealsans = (req, res) => {
  const sql =
    "SELECT DISTINCT(tf.name_field) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit, cereal as cer" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=cer.Id_culture" +
    " AND cg.Id_culture=cer.Id_culture" +
    " AND c.Id_culture=cer.Id_culture" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mculture_totsol = (req, res) => {
  const sql =
    "SELECT total_data.name, sum(total_data.data)  as data" +
    " FROM(SELECT DISTINCT CONCAT(tf.name_field,' ',WITH_BONUS(f.Num_Field)) as name, SUM(cg.qtx_cult) as data" +
    " FROM field as f" +
    " JOIN type_field as tf ON f.id_type_field = tf.id_type_field" +
    " JOIN is_cult_affilied as ica ON f.num_field = ica.Num_Field" +
    " JOIN cult_give as cg ON ica.date_cult_affilied = cg.date_cult" +
    " JOIN culture as c ON ica.Id_culture = c.Id_culture" +
    " JOIN cereal as cer ON cer.Id_culture = c.Id_culture" +
    " WHERE ica.Id_culture IN (8,5,cer.Id_culture)" +
    " AND cg.Id_culture IN (8,5,cer.Id_culture)" +
    " AND c.Id_culture IN (8,5,cer.Id_culture)" +
    " GROUP BY name,c.Id_culture,cg.Id_culture,ica.Id_culture) AS total_data" +
    " GROUP BY name";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mculture_totsolsans = (req, res) => {
  const sql =
    "SELECT total_data.name, sum(total_data.data) as data" +
    " FROM(SELECT DISTINCT(tf.name_field) as name, cg.qtx_cult as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit,cereal as cer" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture IN (8,5,cer.Id_culture)" +
    " AND cg.Id_culture IN (8,5,cer.Id_culture)" +
    " AND c.Id_culture IN (8,5,cer.Id_culture)" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    " GROUP BY name,c.Id_culture,cg.Id_culture,ica.Id_culture) AS total_data" +
    " GROUP BY name;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mculture_totcult = (req, res) => {
  const sql1 =
    "SELECT Sum(cg.qtx_cult) as data " +
    "FROM field as f, type_field as tf, cult_give as cg, is_cult_affilied as ica, culture as c, cereal as cer " +
    "WHERE f.id_type_field = tf.id_type_field " +
    "AND f.num_field = ica.Num_Field " +
    "AND ica.Id_culture = cer.Id_culture " +
    "AND cg.Id_culture = cer.Id_culture " +
    "AND c.Id_culture = cer.Id_culture " +
    "AND ica.date_cult_affilied = cg.date_cult;" +
    "SELECT SUM(cg.qtx_cult) as data " +
    "FROM field as f, type_field as tf, cult_give as cg, is_cult_affilied as ica, culture as c " +
    "WHERE f.id_type_field = tf.id_type_field " +
    "AND f.num_field = ica.Num_Field " +
    "AND ica.Id_culture = 8 " +
    "AND cg.Id_culture = 8 " +
    "AND c.Id_culture = 8 " +
    "AND ica.date_cult_affilied = cg.date_cult;" +
    "SELECT Sum(cg.qtx_cult) as data " +
    "FROM field as f, type_field as tf, cult_give as cg, is_cult_affilied as ica, culture as c " +
    "WHERE f.id_type_field = tf.id_type_field " +
    "AND f.num_field = ica.Num_Field " +
    "AND ica.Id_culture = 5 " +
    "AND cg.Id_culture = 5 " +
    "AND c.Id_culture = 5 " +
    "AND ica.date_cult_affilied = cg.date_cult;";

  db.query(sql1, (err, result) => {
    if (err) console.log(err);
    return res.json([
      { name: "cereales", data: result[0][0].data },
      { name: "betterave", data: result[1][0].data },
      { name: "pomme de terre", data: result[2][0].data },
    ]);
  });
};
const mculture_totcultsans = (req, res) => {
  const sql =
    "SELECT SUM(datas) as data from (SELECT tf.name_field, cg.qtx_cult as datas" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=5" +
    " AND cg.Id_culture=5" +
    " AND c.Id_culture=5" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit) GROUP BY tf.name_field)src;" +
    " SELECT SUM(datas) as data from (SELECT tf.name_field, cg.qtx_cult as datas" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=8" +
    " AND cg.Id_culture=8" +
    " AND c.Id_culture=8" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit) GROUP BY tf.name_field)src;" +
    " SELECT SUM(datas) as data from (SELECT tf.name_field, cg.qtx_cult as datas" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, is_treated as fit, cereal as cer" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=cer.Id_culture" +
    " AND cg.Id_culture=cer.Id_culture" +
    " AND c.Id_culture=cer.Id_culture" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit) GROUP BY tf.name_field)src;";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json([
      { name: "pomme de terre", data: result[0][0].data },
      { name: "betterave", data: result[1][0].data },
      { name: "cereales", data: result[2][0].data },
    ]);
  });
};
// *horticulture
const mhorticulture_legume = (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mhorticulture_legumesans = (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit);";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mhorticulture_fruit = (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field<96;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mhorticulture_fruitsans = (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field<96" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit);";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mhorticulture_fruitsousserre = (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field>95;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mhorticulture_fruitsousserresans = (req, res) => {
  const sql =
    "SELECT f.num_field, CONCAT(" +
    "tf.name_field, ' ', WITH_BONUS (f.Num_Field)" +
    ") as name, hg.qtx_horti as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field>95" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit);";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mhorticulture_totsol = (req, res) => {
  const sql =
    "SELECT total_data.name, sum(total_data.datas) as data" +
    " FROM (SELECT DISTINCT CONCAT(tf.name_field, ' ', WITH_BONUS (f.Num_Field)) as name, hg.qtx_horti as datas" +
    " FROM" +
    " field as f, type_field as tf, horti_give as hg, is_horti_affilied as iha, horticulture as h, is_treated as fit, vegetable as veg, fruit as frt" +
    " WHERE" +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture IN (" +
    " frt.Id_Horticulture, veg.Id_Horticulture" +
    ")" +
    " AND iha.date_horti_affilied = hg.date_horti ) AS total_data" +
    " GROUP BY" +
    " name;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mhorticulture_totsolsans = (req, res) => {
  const sql =
    "SELECT total_data.name, sum(total_data.datas) as data" +
    " FROM (SELECT DISTINCT CONCAT(tf.name_field, ' ', WITH_BONUS (f.Num_Field)) as name, hg.qtx_horti as datas" +
    " FROM" +
    " field as f, type_field as tf, horti_give as hg, is_horti_affilied as iha, horticulture as h, is_treated as fit, vegetable as veg, fruit as frt" +
    " WHERE" +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture IN (" +
    " frt.Id_Horticulture, veg.Id_Horticulture" +
    ")" +
    " AND iha.date_horti_affilied = hg.date_horti " +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    ") AS total_data" +
    " GROUP BY" +
    " name;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json(result);
  });
};
const mhorticulture_tothorti = (req, res) => {
  const sql1 =
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti;" +
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field<96;" +
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field>95;";

  db.query(sql1, (err, result) => {
    if (err) console.log(err);
    return res.json([
      { name: "legume", data: result[0][0].data },
      { name: "fruit", data: result[1][0].data },
      { name: "fruit sous serre", data: result[2][0].data },
    ]);
  });
};
const mhorticulture_tothortisans = (req, res) => {
  const sql =
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    " AND iha.date_horti_affilied = hg.date_horti;" +
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    " AND f.Num_Field<96;" +
    "SELECT SUM(hg.qtx_horti) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field NOT IN(Select fit.Num_Field from is_treated as fit)" +
    " AND f.Num_Field>95;";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json([
      { name: "legume", data: result[0][0].data },
      { name: "fruit", data: result[1][0].data },
      { name: "fruit sous serre", data: result[2][0].data },
    ]);
  });
};
// *fields
const mfields = (req, res) => {
  const sql =
    "SELECT ue.label_under_earth as label, SUM(fs.set_delivered) as data" +
    " FROM" +
    " field as f," +
    " type_field as tf," +
    " cult_give as cg," +
    " is_cult_affilied as ica," +
    " culture as c," +
    " field_set as fs," +
    " under_earth as ue" +
    " WHERE" +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = ica.Num_Field" +
    " AND ica.Id_culture = 5" +
    " AND cg.Id_culture = 5" +
    " AND c.Id_culture = 5" +
    " AND ue.Id_culture = 5" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND fs.Num_field = f.num_field" +
    " AND fs.Id_Unity = 5;" +
    "SELECT ue.label_under_earth as label, SUM(fs.set_delivered) as data" +
    " FROM" +
    " field as f," +
    " type_field as tf," +
    " cult_give as cg," +
    " is_cult_affilied as ica," +
    " culture as c," +
    " field_set as fs," +
    " under_earth as ue" +
    " WHERE" +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = ica.Num_Field" +
    " AND ica.Id_culture = 8" +
    " AND cg.Id_culture = 8" +
    " AND c.Id_culture = 8" +
    " AND ue.Id_culture = 8" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND fs.Num_field = f.num_field" +
    " AND fs.Id_Unity = 5;" +
    "SELECT SUM(fs.set_delivered) as data" +
    " FROM field as f,type_field as tf,cult_give as cg, is_cult_affilied as ica, culture as c, cereal as cer,field_set as fs" +
    " WHERE f.id_type_field=tf.id_type_field" +
    " AND f.num_field=ica.Num_Field" +
    " AND ica.Id_culture=cer.Id_culture" +
    " AND cg.Id_culture=cer.Id_culture" +
    " AND c.Id_culture=cer.Id_culture" +
    " AND fs.num_field=f.num_field" +
    " AND ica.date_cult_affilied = cg.date_cult" +
    " AND fs.Id_Unity =5;" +
    "SELECT SUM(fs.set_delivered) as data" +
    " FROM " +
    "field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " vegetable as veg," +
    " field_set as fs" +
    " WHERE " +
    "f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = veg.Id_Horticulture" +
    " AND hg.Id_Horticulture = veg.Id_Horticulture" +
    " AND h.Id_Horticulture = veg.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND fs.Num_Field=f.Num_Field" +
    " AND fs.Id_Unity =5;" +
    " SELECT SUM(fs.set_delivered) as data" +
    " FROM" +
    " field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt," +
    " field_set as fs" +
    " WHERE " +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field<96" +
    " AND fs.Num_Field=f.Num_Field" +
    " AND fs.Id_Unity =5 ;" +
    " SELECT SUM(fs.set_delivered) as data" +
    " FROM" +
    " field as f," +
    " type_field as tf," +
    " horti_give as hg," +
    " is_horti_affilied as iha," +
    " horticulture as h," +
    " fruit as frt," +
    " field_set as fs" +
    " WHERE " +
    " f.id_type_field = tf.id_type_field" +
    " AND f.num_field = iha.Num_Field" +
    " AND iha.Id_Horticulture = frt.Id_Horticulture" +
    " AND hg.Id_Horticulture = frt.Id_Horticulture" +
    " AND h.Id_Horticulture = frt.Id_Horticulture" +
    " AND iha.date_horti_affilied = hg.date_horti" +
    " AND f.Num_Field>95" +
    " AND fs.Num_Field=f.Num_Field" +
    " AND fs.Id_Unity =5 ;";

  db.query(sql, (err, result) => {
    if (err) console.log(err);
    return res.json([
      {
        label: "Culture",
        children: [
          { label: result[0][0].label, data: result[0][0].data },
          { label: result[1][0].label, data: result[1][0].data },
          { label: "cereales", data: result[2][0].data },
        ],
      },
      {
        label: "horticulture",
        children: [
          { label: "legume", data: result[3][0].data },
          { label: "fruit", data: result[4][0].data },
          { label: "fruit sous serre", data: result[5][0].data },
        ],
      },
    ]);
  });
};

// !--------------------------------------------
// *--------------------------------------------
// * ----------Ajout pour connexion-------------
// *--------------------------------------------
// !--------------------------------------------
// *Function for user gestion
const mconnexion = (req, res) => {
  //* request prepared
  const sql =
    "SELECT Id_employee, First_name,Last_name,N_SS,CHECK_ROLE(Id_Role) as role,pwrd,email FROM employee WHERE email=?";
  // *execution of the request
  db.query(sql, [req.body.email], (err, result) => {
    // *error management
    if (err) return res.json({ Error: "Un problème est survenu" });
    // *if some result then
    if (result.length > 0) {
      // *compare user mdp and mdp return by database
      bcrypt.compare(req.body.pass.toString(), result[0].pwrd, (err, respo) => {
        // *error management
        if (err) return res.json({ Error: "Erreur connection" });
        // *if mdps equals
        if (respo) {
          const name = result[0].name;
          const role = result[0].role;
          const token = Jwt.sign({ name: name, role: role }, "jwt-secret-key", {
            expiresIn: "1d",
          });
          // *return token with cookie format
          res.cookie("tokenco", token);

          // !---------------------------------------------------------
          test(role);
          db = mysql.createConnection({
            host: "localhost",
            user: user,
            password: password,
            database: "fil_rouge_farm3",
            multipleStatements: true,
          });
          // !---------------------------------------------------------
          return res.json({ Status: "Ok", token: token, role: role });
        } else return res.json({ Status: "erreur mot de pass" });
      });
    } else {
      return res.json({ Error: "Le compte n'existe pas" });
    }
  });
};
const mSeeAllUser = (req, res) => {
  console.log(user);
  const sql =
    "SELECT Id_employee, First_name,Last_name,N_SS,CHECK_ROLE(Id_Role) as role,pwrd,email FROM employee";

  db.query(sql, (err, data) => {
    if (err) return res.json("error");
    return res.json(data);
  });
};

// TODO :

const mCreateUser = (req, res) => {
  console.log("create", user);
  const sql =
    "INSERT INTO employee(First_name,Last_name,N_SS,Id_Role,email,pwrd) VALUES(?)";
  //   console.log(values);
  db.query(sql, [values], (err, result) => {
    console.log("values ", values);
    console.log("res ", err);
    if (err) return res.json("error");
    return res.json(result);
  });
};
const mSeeUser = (req, res) => {
  const sql =
    "Select Id_employee, First_name,Last_name,N_SS,CHECK_ROLE(Id_Role) as role,pwrd,email,Id_Speciality from employee WHERE email=?";
  const data = [req.body.email];
  // console.log("test", data);
  db.query(sql, data, (err, result) => {
    if (err) return res.json("error");
    return res.json(result);
  });
};
const mSeeRoles = (req, res) => {
  const sql = "SELECT CHECK_ROLE(Id_Role) as role from role GROUP BY role;";
  const data = [req.body.email];
  // console.log("test", data);
  db.query(sql, data, (err, result) => {
    if (err) return res.json("error");
    return res.json(result);
  });
};
const mUpdateUser = (req, res) => {
  console.log("update", user);
  console.log(req.body);

  const sql =
    "UPDATE employee SET Id_Role=?,Id_Speciality=? WHERE Id_Employee=?";
  const data = [req.body.Id_Role, req.body.Id_Speciality];
  // console.log(req.params);
  const idUser = req.params.id_user;
  db.query(sql, [...data, idUser], (err, result) => {
    if (err) return res.json("error");
    // res.status(status).json(obj)
    return res.json(result);
  });
};

const mSeeSpecialities = (req, res) => {
  const sql = "SELECT * FROM `speciality` ORDER BY Id_Speciality ASC";
  // console.log("test", data);
  db.query(sql, (err, result) => {
    if (err) return res.json("error");
    return res.json(result);
  });
};

const mDeleteUser = (req, res) => {
  console.log("delete", user);

  const sql = "DELETE FROM employee WHERE Id_Employee=?";
  const idUser = req.params.id_user;
  db.query(sql, [idUser], (err, result) => {
    if (err) return res.json("Error");
    return res.json(result);
  });
};

// !---------------------------------------------------------
// *Elec prod
const mElecProd = (req, res) => {
  const sql =
    "SELECT e.label_ener,SUM(pe.`qtx_production`) as qtx_production,u.label_unity " +
    "FROM `product_energy` as pe, `unity` as u, `energy` as e " +
    "WHERE pe.id_unity=u.Id_Unity " +
    "AND pe.Id_Energy=e.Id_Energy " +
    "GROUP BY e.label_ener;";
  db.query(sql, (err, result) => {
    if (err) console.log(err);
    // console.log(res.json(result));
    return res.json(result);
  });
};
// TODO : Mettre ce qui suit et remplacer les zero par les valeurs choisit
//  "INSERT INTO `product_energy` (`Id_Product`, `Id_Energy`, `qtx_production`, `date_production`, `id_unity`, `ener_price`) VALUES ('35', '1', '0', '2024-06-16 18:58:06.000000', '7', '0');"
const mElecMoove = (req, res) => {
  // console.log("on est passé");
  const sql =
    "INSERT INTO  `product_energy` (`Id_Product`, `Id_Energy`, `qtx_production`, `date_production`, `id_unity`, `ener_price`) VALUES(?)";
  // console.log(values);
  db.query(sql, [values], (err, result) => {
    // console.log("values ", values);
    // console.log("res ", res);
    // console.log(result);
    if (err) return res.json("error");
    return res.json(result);
  });
};

module.exports = {
  melectricity,
  mgetelecbymonth,
  mculture_pommedeterre,
  mculture_pommedeterresans,
  mculture_betterave,
  mculture_betteravesans,
  mculture_cereal,
  mculture_cerealsans,
  mculture_totsol,
  mculture_totsolsans,
  mculture_totcult,
  mculture_totcultsans,
  mhorticulture_legume,
  mhorticulture_legumesans,
  mhorticulture_fruit,
  melectricity,
  mhorticulture_fruitsans,
  mhorticulture_fruitsousserre,
  mhorticulture_fruitsousserresans,
  mhorticulture_totsol,
  mhorticulture_totsolsans,
  mhorticulture_tothorti,
  mhorticulture_tothortisans,
  mfields,
  mconnexion,
  mSeeAllUser,
  mCreateUser,
  mSeeUser,
  mSeeRoles,
  mUpdateUser,
  mSeeSpecialities,
  mDeleteUser,
  mElecProd,
  mElecMoove,
};
