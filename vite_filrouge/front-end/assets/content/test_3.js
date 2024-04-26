// *init selects choices and first url shawn
var choice = { apport: "", filtre: "Pomme de Terre" };
var urlpdt = "http://localhost:3001/fields";

const initialisation = new Request(urlpdt, {
  method: "GET",
});

const request_ingredient = (e) =>
  fetch(e)
    .then((response) => {
      if (response.status === 200) {
        let infos = response.json();
        return infos;
      } else {
        throw new Error("Something went wrong on API server!");
      }
    })
    .then((datas) => {
      const el = document.getElementById("chart_tree");
      const data = {
        series: datas,
      };
      const options = {
        theme: {
          chart: {
            fontFamily: "Verdana",
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
        },
        chart: { title: "Used disk space", height: "auto", width: "auto" },
        responsive: {
          animation: { duration: 100 },
        },
        tooltip: { formatter: (value) => `${value}m²` },
        series: {
          selectable: true,
          dataLabels: {
            visible: true,
            useTreemapLeaf: true,
          },
        },
      };

      const chart = toastui.Chart.treemapChart({ el, data, options });

      chart.on("selectSeries", (ev) => {
        const { label, value } = ev.treemap[0].data;
        alert(`${label}: ${value}`);
      });
    });
// *----------------------------------------------------
// *initialisation
request_ingredient(initialisation);

// !en construction

// const el = document.getElementById("chart_tree");
// const data = {
//   series: [
//     {
//       label: "Documents",
//       children: [
//         {
//           label: "docs",
//           children: [
//             {
//               label: "pages",
//               data: 1.3,
//             },
//             {
//               label: "keynote",
//               data: 2.5,
//             },
//             {
//               label: "numbers",
//               data: 1.2,
//             },
//           ],
//         },
//         {
//           label: "photos",
//           data: 5.5,
//         },
//         {
//           label: "videos",
//           data: 20.7,
//         },
//       ],
//     },
//     {
//       label: "Downloads",
//       children: [
//         {
//           label: "recent",
//           data: 5.3,
//         },
//         {
//           label: "2020",
//           data: 10.1,
//         },
//         {
//           label: "2019",
//           data: 8.2,
//         },
//       ],
//     },
//     {
//       label: "Application",
//       data: 16.4,
//     },
//     {
//       label: "Desktop",
//       data: 4.5,
//     },
//   ],
// };
// const options = {
//   theme: {
//     chart: {
//       fontFamily: "Verdana",
//       backgroundColor: "rgba(0, 0, 0, 0)",
//     },
//   },
//   chart: { title: "Used disk space", height: "auto", width: "auto" },
//   responsive: {
//     animation: { duration: 100 },
//   },
//   tooltip: { formatter: (value) => `${value}GB` },
//   series: {
//     selectable: true,
//     dataLabels: {
//       visible: true,
//       useTreemapLeaf: true,
//     },
//   },
// };

// const chart = toastui.Chart.treemapChart({ el, data, options });

// chart.on("selectSeries", (ev) => {
//   const { label, value } = ev.treemap[0].data;
//   alert(`${label}: ${value}`);
// });

// chart.on("unselectSeries", () => {
//   alert("unselect!");
// });
