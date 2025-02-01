export function setupMapInteractions() {
    if (typeof document === "undefined") return; // Ensure it runs only on client side
  
    // Selecting elements
    const map = document.querySelector("svg");
    const countries = document.querySelectorAll("path");
    const sidePanel = document.querySelector(".side-panel");
    const container = document.querySelector(".side-panel .container");
    const closeBtn = document.querySelector(".close-btn");
    const loading = document.querySelector(".loading");
    const zoomInBtn = document.querySelector(".zoom-in");
    const zoomOutBtn = document.querySelector(".zoom-out");
    const zoomValueOutput = document.querySelector(".zoom-value");
    // data ouputs
    const countryNameOutput = document.querySelector(".country-name");
    const countryFlagOutput = document.querySelector(".country-flag");
    const cityOutput = document.querySelector(".city");
    const areaOutput = document.querySelector(".area");    
    const currencyOutput = document.querySelector(".currency");
    const languagesOutput = document.querySelector(".languages");

    countries.forEach(country => {
        country.addEventListener("mouseenter", function() {
            const classList = [...this.classList].join(".");
            console.log(classList);
            // Create a selector for matching classes
            const selector = '.' + classList;
            // Select all matching elments
            // Select all piecers of land (svg paths) that
            // belong to the same country
            const matchingElements = document.querySelectorAll(selector);
            // Add hover effect to matching elements
            matchingElements.forEach(el => el.style.fill = "#c99aff");
        });
        // mouse out event
        country.addEventListener("mouseout", function() {
        const classList = [...this.classList].join(".");
        const selector = '.' + classList;
        const matchingElements = document.querySelectorAll(selector);
        matchingElements.forEach(el => el.style.fill = "#443d4b");
        });
        // Add click event to each country
        country.addEventListener("click", function(e) {
            // Set loading text
            loading.innerText = "Loading...";
            // Hide country data container
            container.classList.add("hide");
            // Show loading screen
            loading.classList.remove("hide");
            // Variable to hold the country name
            let clickedCountryName;
            // If the clicked svg path (country) has a name attribute
            if(e.target.hasAttribute("name")) {
                // Get the value of the name attribtue (country name)
                clickedCountryName = e.target.getAttribute("name");
                // if it doesn't have a name attribute
            } else {
                // Get the class name (country name)
                clickedCountryName = e.target.classList.value;
            }
            // Open the side panel
            sidePanel.classList.add("side-panel-open");
            // Use fetch to get data from the API (Add the extracted country name)
            fetch(`https://restcountries.com/v3.1/name/${clickedCountryName}?fullText=true`)
            .then(response => {
                // Check if the response is OK (status code 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the response as JSON
                return response.json();
            })
            .then(data => {
                console.log(data);
                setTimeout(() => {
                    // Extract data and output to the side panel
                    countryNameOutput.innerText = data[0].name.common;
                    countryFlagOutput.src = data[0].flags.png;
                    cityOutput.innerText = data[0].capital;
                    const formatedNumber = data[0].area.toLocaleString('de-DE');
                    areaOutput.innerHTML = formatedNumber + ` km<sup>2</sup>`
                    const currencies = data[0].currencies;
                    currencyOutput.innerText = "";
                    Object.keys(currencies).forEach(key => {
                        currencyOutput.innerHTML += `<li>${currencies[key].name}</li>`;
                    });
                    const languages = data[0].languages;
                    languagesOutput.innerText = "";
                    Object.keys(languages).forEach(key => {
                        languagesOutput.innerHTML += `<li>${languages[key]}</li>`;
                    });
                    countryFlagOutput.onload = () => {
                        container.classList.remove("hide");
                        loading.classList.add("hide");
                    };
                }, 500);
            })
            .catch(error => {
                loading.innerText = "No data to show for selected country";
                console.error('there was a problem with the fetch operation:', error)
            });
            });
        });

        closeBtn.addEventListener("click", () => {
            sidePanel.classList.remove("side-panel-open");
        });

        let zoomValue = 100;

        function updateZoom() {
          // Update the map dimensions and output
          map.style.width = zoomValue + "vw";
          map.style.height = zoomValue + "vh";
          zoomValueOutput.innerText = zoomValue + "%";
        
          // Disable/enable buttons based on the current zoomValue
          zoomInBtn.disabled = (zoomValue >= 500);
          zoomOutBtn.disabled = (zoomValue <= 100);
        }
        
        // Initialize the zoom
        updateZoom();
        
        zoomInBtn.addEventListener("click", () => {
          if (zoomValue < 500) { // Only zoom in if below 500
            zoomValue += 100;
            updateZoom();
          }
        });
        
        zoomOutBtn.addEventListener("click", () => {
          if (zoomValue > 100) { // Only zoom out if above 100
            zoomValue -= 100;
            updateZoom();
          }
        });
        
 
    
    
    // Add more interactions...
    }