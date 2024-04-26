// https://eco2mix.rte-france.com/curves/getDonneesMarche?&dateDeb=14/06/2023&dateFin=14/06/2023&mode=NORM&_=1687352158237

// https://www.rte-france.com/eco2mix/les-donnees-de-marche#

const request_scrapp = new Request(
  "https://eco2mix.rte-france.com/curves/getDonneesMarche?&dateDeb=14/06/2023&dateFin=14/06/2023&mode=NORM&_=1687352158237",
  {
    method: "GET",
  }
);
fetch(request_scrapp)
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
    console.log(data);
  });
