import { cardDetails } from "../../cardData/cardDetails_DB.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("box-container");
  const totalPriceEl = document.getElementById("total-price");

  let selectedPrice = 0;

  function renderBoxes() {
    container.innerHTML = "";
    cardDetails.forEach((product, index) => {
      const box = document.createElement("div");
      box.classList.add("box");

      let isActive = product.popularity.toLocaleLowerCase() === "most popular";
      if (isActive) {
        box.classList.add("active");
        selectedPrice = product.discounted_price;
      }
      box.innerHTML = `
                    <div class="most-popular-tag ${isActive ? "" : "hidden"}">
                        MOST POPULAR
                    </div>
                    <div class="section_1">
                        <div class="section_1_unit">
                            <div class="circle ${
                              isActive ? "circle-active" : ""
                            }">
                                <span class="innerCircle ${
                                  isActive ? "innerCircle-active" : ""
                                }">

                                </span>
                            </div>
                            <div class="discount_priceType_unit">
                                <div class="unit_count_discount_percent">
                                    <div class="unit_count">${
                                      product.unit
                                    }</div>
                                    <div class="discount_percent">${
                                      product.discount_percent || "NO DISCOUNT"
                                    } OFF</div>
                                </div>
                                <div class="priceType_unit">
                                    ${product.popularity || ""}
                                </div>
                            </div>
                        </div>
                        <div class="section_1_price">
                            <div class="section_1_discount_price">$${
                              product.discounted_price
                            } USD</div>
                            <div class="section_1_original_price">
                                $${product.price} USD
                            </div>
                        </div>
                    </div>
                    <div class="options ${isActive ? " " : "hidden"}">
                        <div class="option-section">
                            <div class="option-dropdown">
                                <label for="size-${index}"
                                    class="size-padding">Size</label>
                                <div class="option-box-number">
                                    <p>#1</p>
                                    <select id="size-${index}">
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                    </select>
                                </div>

                            </div>
                            <div class="option-dropdown">
                                <label for="color-${index}">Color:</label>
                                <select id="color-${index}">
                                    <option>Black</option>
                                    <option>White</option>
                                    <option>Red</option>
                                </select>
                            </div>
                        </div>

                        <div class="option-section">
                            <div class="option-dropdown">

                                <div class="option-box-number">
                                    <p>#2</p>
                                    <select id="size-${index}">
                                        <option>S</option>
                                        <option>M</option>
                                        <option>L</option>
                                    </select>
                                </div>

                            </div>
                            <div class="option-dropdown">
                                <select id="color-${index}">
                                    <option>Black</option>
                                    <option>White</option>
                                    <option>Red</option>
                                </select>
                            </div>
                        </div>
                    </div>
              
            `;

      container.appendChild(box);

      const options = box.querySelector(".options");
      const circle = box.querySelector(".circle");
      const innerCircle = box.querySelector(".innerCircle");

      box.addEventListener("click", () => {
        document
          .querySelectorAll(".box")
          .forEach((b) => b.classList.remove("active"));
        document
          .querySelectorAll(".options")
          .forEach((o) => o.classList.add("hidden"));
        document
          .querySelectorAll(".innerCircle")
          .forEach((c) => c.classList.remove("innerCircle-active"));
        document
          .querySelectorAll(".circle")
          .forEach((d) => d.classList.remove("circle-active"));

        box.classList.add("active");
        options.classList.remove("hidden");
        circle.classList.add("circle-active");
        innerCircle.classList.add("innerCircle-active");

        selectedPrice = product.discounted_price;

        totalPriceEl.textContent = `$${selectedPrice}.00 USD`;
      });
    });
  }

  renderBoxes();
});
