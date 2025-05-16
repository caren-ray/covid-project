// Fetch global stats
fetch("https://disease.sh/v3/covid-19/all")
  .then(res => res.json())
  .then(data => {
    document.getElementById("cases").textContent = data.cases.toLocaleString();
    document.getElementById("deaths").textContent = data.deaths.toLocaleString();
    document.getElementById("recovered").textContent = data.recovered.toLocaleString();
  })
  .catch(err => {
    console.error("Error fetching global data:", err);
  });

// Fetch country list and populate dropdown
fetch("https://disease.sh/v3/covid-19/countries")
  .then(res => res.json())
  .then(countries => {
    const select = document.getElementById("country-select");
    countries.forEach(country => {
      const option = document.createElement("option");
      option.value = country.country;
      option.textContent = country.country;
      select.appendChild(option);
    });

    // Event listener for country selection
    select.addEventListener("change", () => {
      const country = select.value;
      if (!country) return;

      fetch(`https://disease.sh/v3/covid-19/countries/${country}`)
        .then(res => res.json())
        .then(data => {
          document.getElementById("country-stats").innerHTML = `
            <p><strong>Cases:</strong> ${data.cases.toLocaleString()}</p>
            <p><strong>Deaths:</strong> ${data.deaths.toLocaleString()}</p>
            <p><strong>Recovered:</strong> ${data.recovered.toLocaleString()}</p>
          `;
        });
    });
  })
  .catch(err => {
    console.error("Error fetching countries:", err);
  });
