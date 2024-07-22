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
