// !---------------------------------------------------

const request = new Request("http://localhost:3001/electricity", {
  method: "GET",
});

var dataEner = [];
var dataPer = [];
var dataMonth = [];

fetch(request)
  .then((response) => {
    if (response.status === 200) {
      let infos = response.json();
      return infos;
    } else {
      throw new Error("Something went wrong on API server!");
    }
  })
  .then((data) => {
    // console.log(data);
    data.map((elec) => {
      dataEner.push(elec.qtx_ener);
      dataPer.push(elec.begin_hour);
      dataMonth.push(elec.label_name);
      // console.log(dataEner, dataPer);
    });
  })
  .then(() => {
    const infos = load(dataEner, dataPer, dataMonth);
    // console.log(infos);
    const el_6 = document.getElementById("chart_6");
    // console.log(el_6);

    const chart_6 = toastui.Chart.heatmapChart({
      el: el_6,
      data: infos[0],
      options: infos[1],
    });

    // console.log(chart_6);
  });

function load(ener, per, month) {
  // console.log(month);
  let uniq_month = [...new Set(month)];
  let uniq_per = [...new Set(per)];
  // console.log(uniq_per);
  // console.log(ener);
  let table = [];
  let temp = [];
  for (let i = 0; i < ener.length; i++) {
    if (i % 12 === 0 && i != 0) {
      table.push(temp);
      temp = [];
    }
    temp.push(ener[i]);
    if (i == ener.length - 1) {
      table.push(temp);
    }
  }
  // console.log(table);
  const data_6 = {
    categories: {
      x: uniq_per,
      y: uniq_month,
    },
    series: table,
  };
  const options_6 = {
    theme: {
      chart: {
        fontFamily: "Verdana",
        backgroundColor: "rgba(0, 0, 0, 0)",
      },
    },
    series: {
      stack: true,
      zoomable: true,
      selectable: true,
      eventDetectType: "grouped",
      dataLabels: { visible: true },
    },
    legend: {
      align: "bottom",
    },
    chart: {
      title: "Variation de l'électricité",
      width: "auto",
      height: "auto",
    },
    responsive: {
      animation: { duration: 100 },
      // rules: [
      //   {
      //     condition: ({ width: w }) => {
      //       return w <= 800;
      //     },
      //     options: {
      //       xAxis: {
      //         tick: { interval: 2 },
      //         label: { interval: 2 },
      //       },
      //       legend: {
      //         align: "bottom",
      //       },
      //     },
      //   },
      //   {
      //     condition: ({ width: w }) => {
      //       return w <= 600;
      //     },
      //     options: {
      //       xAxis: {
      //         tick: { interval: 6 },
      //         label: { interval: 6 },
      //       },
      //     },
      //   },
      //   {
      //     condition: ({ width: w, height: h }) => {
      //       return w <= 500 && h <= 400;
      //     },
      //     options: {
      //       chart: { title: "" },
      //       legend: {
      //         visible: false,
      //       },
      //       exportMenu: {
      //         visible: false,
      //       },
      //     },
      //   },
      // ],
    },
    xAxis: { pointOnColumn: false, title: { text: "Period" } },
    yAxis: { title: "Month" },
  };

  return [data_6, options_6];
}
// *------------------------------------------------------------
// * function post
async function postJson(bigData = {}) {
  try {
    const response = await fetch("http://localhost:3001/getelecbymonth", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(bigData),
    });
    // console.log(bigData);
    // console.log(response);
    const result = await response.json();
    return result.value.qtx_ener;
  } catch (err) {
    console.error(err);
  }
  // const bigData = { begin_hour: hour.value, label_name: meet.value };
}
// postJson(bigData);
// *------------------------------------------------------------
// !-------------------------------------
// ! to save
// const test = document.getElementById("moment-choose");
// test.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const hour = document.getElementById("tranche-horraire");
//   const meet = document.getElementById("meeting-time");
//   console.log(hour.value);
//   console.log(meet.value);
//   // const request2 = new Request("http://localhost:3001/getelecbymonth", {
//   //   method: "POST",
//   //   body: JSON.stringify({
//   //     begin_hour: hour.value,
//   //     label_name: meet.value,
//   //   }),
//   //   headers: {
//   //     "Content-type": "application/json; charset=UTF-8",
//   //   },
//   // });
//   // console.log(request2);
//   let data = { begin_hour: hour.value, label_name: meet.value };

//   // const response = await fetch("http://localhost:3001/getelecbymonth", {
//   //   method: "POST",
//   //   headers: {
//   //     "Content-type": "application/json",
//   //   },
//   //   body: JSON.stringify(data),
//   // });
//   // const targetData = await response.json();
//   // console.log(targetData);

//   postJson({ data: data });
// });
// !-------------------------------------
let moment = 120;
// console.log("render");
const test = document.getElementById("moment-choose");
test.addEventListener("click", async (e) => {
  e.preventDefault();
  const hour = document.getElementById("tranche-horraire");
  const meet = document.getElementById("meeting-time");
  // console.log(hour.value);
  // console.log(meet.value);
  let data = { begin_hour: hour.value, label_name: meet.value };
  console.log(data);
  moment = await postJson({ data });
  // return moment;
  const el_7 = document.getElementById("chart_7");
  el_7.innerHTML = "";
  const data_7 = {
    series: [
      {
        name: "Valeur",
        data: [moment],
      },
    ],
  };
  const chart_7 = toastui.Chart.gaugeChart({
    el: el_7,
    data: data_7,
    options: options_7,
  });
  console.log(moment);
});

const el_7 = document.getElementById("chart_7");
var baseColor = "#406abf";
// console.log(el_7);
const data_7 = {
  series: [
    {
      name: "Valeur",
      data: [moment],
    },
  ],
};
const options_7 = {
  chart: { width: "auto", height: "auto" },
  circularAxis: { title: "€ / MWh", scale: { min: 0, max: 200 } },
  series: {
    angleRange: {
      start: 270,
      end: 90,
    },
    dataLabels: {
      visible: true,
      offsetY: 50,
      formatter: (value) => `${value} €`,
    },
  },
  plot: {
    bands: [
      { range: [0, 50], color: "#FFE88A" },
      { range: [50, 150], color: "#EB9481" },
      { range: [150, 200], color: "#D84378" },
    ],
  },
  theme: {
    chart: { fontFamily: "Verdana", backgroundColor: "rgba(0, 0, 0, 0)" },
    circularAxis: {
      title: { fontWeight: 500, fontSize: 30, color: baseColor },
      label: { color: baseColor, fontSize: 15 },
      tick: { strokeStyle: baseColor },
      strokeStyle: baseColor,
    },
    series: {
      clockHand: {
        color: baseColor,
        baseLine: 10,
      },
      pin: {
        radius: 10,
        color: baseColor,
        borderWidth: 5,
        borderColor: "rgba(101, 4, 52, 0.3)",
      },
      dataLabels: {
        fontSize: 30,
        color: "#fff",
        textBubble: {
          visible: true,
          backgroundColor: baseColor,
          paddingX: 5,
          paddingY: 5,
        },
      },
    },
    plot: { bands: { barWidth: 50 } },
  },
};
const chart_7 = toastui.Chart.gaugeChart({
  el: el_7,
  data: data_7,
  options: options_7,
});
// !------------------------------------------------------------
