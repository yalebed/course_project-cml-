const xhr = new XMLHttpRequest();
    xhr.open("GET", "menu.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = xhr.responseText;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const categories = xmlDoc.getElementsByTagName("category");
            const menuContainer = document.getElementById("dishes-grid");

            Array.from(categories).forEach(category => {
                const categoryName = category.getAttribute("name").toLowerCase();
                const categoryId = categoryName.replace(/\s+/g, '-');
                const categorySection = document.createElement("section");
                categorySection.classList.add("category-section");
                categorySection.id = categoryId;

                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
                categorySection.appendChild(categoryTitle);

                const dishes = category.getElementsByTagName("dish");

                const grid = document.createElement("div");
                grid.classList.add("dishes__grid");

                Array.from(dishes).forEach(dish => {
                    const name = dish.getElementsByTagName("name")[0].textContent;
                    const weight = dish.getElementsByTagName("weight")[0].textContent;
                    const price = dish.getElementsByTagName("price")[0].textContent;
                    const image = dish.getElementsByTagName("image")[0].textContent;

                    const card = document.createElement("div");
                    card.classList.add("dish-card");

                    card.innerHTML = `
                        <div class="dish-card__img">
                            <img src="${image}" alt="${name}">
                        </div>
                        <div class="dish-card__content">
                            <h3 class="dish-card__title">${name}</h3>
                            <p class="dish-card__details">${weight}</p>
                            <p class="dish-card__price">${price}</p>
                        </div>
                    `;
                    
                    grid.appendChild(card);
                });

                categorySection.appendChild(grid);
                menuContainer.appendChild(categorySection);
            });
        } else if (xhr.readyState === 4) {
            console.error('Ошибка при загрузке XML:', xhr.statusText);
        }

    };
    
    function scrollToCategory() {
        const hash = window.location.hash.substring(1);
        if (hash) {
        const targetSection = document.getElementById(hash);
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ behavior: "smooth" });
                
                targetSection.classList.add("highlight-section");
                setTimeout(() => {
                    targetSection.classList.remove("highlight-section");
                }, 2000);
            }, 900);
        }
        }
    }
  
    xhr.send();

  window.addEventListener("load", scrollToCategory);
  
  window.addEventListener("hashchange", scrollToCategory);