// CampusCart — shared JS

document.addEventListener("DOMContentLoaded", () => {

  // Active Nav Link
  const path = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");

    if (href === path) {
      a.classList.add("active");
    }
  });

  // Scroll Reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }

    });
  }, { threshold: 0.12 });

  document
    .querySelectorAll(".reveal")
    .forEach(el => io.observe(el));

  // Wishlist Toggle
  document.addEventListener("click", e => {

    const save = e.target.closest(".save");

    if (save) {

      e.preventDefault();

      save.classList.toggle("active");

      save.textContent =
        save.classList.contains("active")
          ? "♥"
          : "♡";

      showToast(
        save.classList.contains("active")
          ? "Saved to wishlist"
          : "Removed from wishlist"
      );
    }
  });

  // Marketplace Search
  const search = document.getElementById("market-search");

  if (search) {

    search.addEventListener("input", e => {

      const q = e.target.value.toLowerCase();

      document.querySelectorAll(".product").forEach(product => {

        const name =
          product.dataset.name?.toLowerCase() || "";

        product.style.display =
          name.includes(q)
            ? ""
            : "none";
      });
    });
  }

  // Filters
  document
    .querySelectorAll(".filter-list input[type=checkbox]")
    .forEach(cb => {
      cb.addEventListener("change", applyFilters);
    });

  // Sorting
  const sortSel = document.getElementById("sort");

  if (sortSel) {
    sortSel.addEventListener("change", applySort);
  }

  // Product Gallery
  document
    .querySelectorAll(".gallery .thumbs .t")
    .forEach(t => {

      t.addEventListener("click", () => {

        const main =
          document.querySelector(".gallery .main");

        if (!main) return;

        main.className =
          "main " + t.dataset.cls;

        main.textContent =
          t.textContent;
      });

    });

  // AUTH FORMS
  document.querySelectorAll(".auth-form").forEach(form => {

    form.addEventListener("submit", async (e) => {

      e.preventDefault();

      const page =
        window.location.pathname;

      try {

        // LOGIN
        if (page.includes("login")) {

          const email =
            form.querySelector('input[type="email"]').value;

          const password =
            form.querySelector('input[type="password"]').value;

          const response = await fetch(
            "http://localhost:8080/api/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email,
                password
              })
            }
          );

          if (!response.ok) {
            throw new Error("Invalid credentials");
          }

          const user =
            await response.json();

          localStorage.setItem(
            "email",
            user.email
          );

          localStorage.setItem(
            "name",
            user.fullName
          );

          showToast("Login Successful");

          setTimeout(() => {
            location.href = "dashboard.html";
          }, 1000);
        }

        // SIGNUP
else if (page.includes("signup")) {

    const inputs =
        form.querySelectorAll("input");

    const fullName =
        inputs[0].value;

    const phoneNumber =
        inputs[1].value;

    const email =
        inputs[2].value;

    const college =
        inputs[3].value;

    const password =
        inputs[4].value;

    const response = await fetch(
        "http://localhost:8080/api/auth/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName,
                phoneNumber,
                email,
                password,
                college
            })
        }
    );

    if (!response.ok) {
        throw new Error("Registration failed");
    }

    showToast("Account Created");

    setTimeout(() => {
        location.href = "login.html";
    }, 1000);
}
      } catch (error) {

        console.error(error);

        showToast(error.message);
      }

    });

  });

  // Dashboard Welcome Message

  const welcomeUser =
    document.getElementById("welcomeUser");

  if (welcomeUser) {

    const name =
      localStorage.getItem("name");

    if (name) {

      welcomeUser.textContent =
        `Hi ${name} — welcome back ✨`;
    }
  }

  // Card Tilt Effect
  document
    .querySelectorAll(
      ".product, .feature, .float-card"
    )
    .forEach(card => {

      card.addEventListener("mousemove", e => {

        const rect =
          card.getBoundingClientRect();

        const x =
          (e.clientX - rect.left) /
          rect.width -
          0.5;

        const y =
          (e.clientY - rect.top) /
          rect.height -
          0.5;

        card.style.transform =
          `translateY(-4px)
           rotateX(${-y * 4}deg)
           rotateY(${x * 6}deg)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });

    });

});

function applyFilters() {

    const checkedCategories =
        Array.from(
            document.querySelectorAll(
                ".filter-list:first-of-type input:checked"
            )
        ).map(c => c.value);

    const checkedConditions =
        Array.from(
            document.querySelectorAll(
                ".filter-list:last-of-type input:checked"
            )
        ).map(c =>
            c.parentElement.textContent.trim()
        );

    document
        .querySelectorAll(".product")
        .forEach(product => {

            const categoryMatch =
                checkedCategories.length === 0 ||
                checkedCategories.includes(
                    product.dataset.category
                );

            const conditionMatch =
                checkedConditions.length === 0 ||
                checkedConditions.includes(
                    product.dataset.condition
                );

            product.style.display =
                categoryMatch && conditionMatch
                    ? ""
                    : "none";
        });
}
function applySort() {

    const grid =
        document.getElementById("product-grid");

    if (!grid) return;

    const products =
        Array.from(grid.children
        );

    const mode =
        document.getElementById("sort").value;

    products.sort((a, b) => {

        const priceA =
            parseFloat(a.dataset.price);

        const priceB =
            parseFloat(b.dataset.price);

        if(mode === "low"){
            return priceA - priceB;
        }

        if(mode === "high"){
            return priceB - priceA;
        }

        return 0;
    });

    products.forEach(product => {
        grid.appendChild(product);
    });
}

function showToast(message) {

  let toast =
    document.querySelector(".toast");

  if (!toast) {

    toast =
      document.createElement("div");

    toast.className = "toast";

    document.body.appendChild(toast);
  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toast._timer);

  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}

async function loadProducts() {

    const productGrid =
        document.getElementById("product-grid");

    if (!productGrid) return;

    try {

        const response =
            await fetch(
                "http://localhost:8080/api/products"
            );

        const products =
            await response.json();

        productGrid.innerHTML = "";

        products
    .filter(product => product.sold !== true)
    .forEach(product => {

            productGrid.innerHTML += `
                <div class="product"
     data-category="${product.category}"
     data-condition="${product.condition}"
     data-name="${product.title}"
     data-price="${product.price}"
     onclick="openProduct(${product.id})">

                    <span class="badge">
                        ${product.category}
                    </span>

                    <div class="thumb t-tech">
                        💻
                    </div>

                    <h3>
                        ${product.title}
                    </h3>

                    <div class="row">
                        <span class="price">
                            ₹${product.price}
                        </span>

                        <span style="font-size:12px;color:var(--ink-mute)">
                            ${product.condition}
                        </span>
                    </div>
                    

                   <div class="seller">
  Verified Student Seller
</div>

                </div>
            `;
        });

    } catch (error) {

        console.error(error);
        showToast("Failed to load products");
    }
}

async function loadMyProducts() {

    const container =
        document.getElementById("my-products");

    if (!container) return;

    const email =
        localStorage.getItem("email");

    if (!email) return;

    try {

        const response =
            await fetch(
                `http://localhost:8080/api/products/seller/${email}`
            );

        const products =
            await response.json();

        container.innerHTML = "";

       products.forEach(product => {

    container.innerHTML += `
        <div class="product">

            <span class="badge">
                ${product.category}
            </span>

            <h3>
                ${product.title}
            </h3>

            <div class="row">
                <span class="price">
                    ₹${product.price}
                </span>
            </div>

            <div class="seller">
                ${product.condition}
            </div>

           ${product.sold
? '<span style="color:#ff4d4d;font-weight:700">SOLD</span>'
: `<button class="btn btn-sm btn-primary"
           onclick="markSold(${product.id})">
        Mark Sold
   </button>`
}
        </div>
    `;
});

    } catch (error) {

        console.error(error);
    }
}

loadProducts();
loadMyProducts();

async function markSold(id){

    const response =
        await fetch(
            `http://localhost:8080/api/products/${id}/sold`,
            {
                method:"PUT"
            }
        );

    if(response.ok){

        showToast("Product Marked Sold");

        loadMyProducts();
        loadProducts();
    }
}

const showProductForm =
document.getElementById("showProductForm");

if(showProductForm){

    showProductForm.addEventListener("click",()=>{

        const panel =
        document.getElementById("productFormPanel");

        panel.style.display =
        panel.style.display === "none"
        ? "block"
        : "none";
    });
}

const navActions =
document.getElementById("navActions");

if(navActions){

    const email =
    localStorage.getItem("email");

    const name =
    localStorage.getItem("name");

    if(email){

        navActions.innerHTML = `
            <span class="user-name">
                Hi, ${name}
            </span>

            <a class="btn btn-sm btn-primary"
               href="dashboard.html">
               Dashboard
            </a>

            <button
                id="logoutBtn"
                class="btn btn-sm btn-ghost">
                Logout
            </button>
        `;

        document
        .getElementById("logoutBtn")
        .addEventListener("click",()=>{

            localStorage.removeItem("email");
            localStorage.removeItem("name");

            location.href = "index.html";
        });
    }
}

const listItemBtn =
document.getElementById("listItemBtn");

if(listItemBtn){

    listItemBtn.addEventListener("click",(e)=>{

        e.preventDefault();

        const email =
        localStorage.getItem("email");

        if(email){

            location.href =
            "dashboard.html";

        }else{

            location.href =
            "login.html";
        }
    });
}

const productForm =
document.getElementById("productForm");

if(productForm){

    productForm.addEventListener(
        "submit",
        async (e)=>{

        e.preventDefault();

        const sellerEmail =
            localStorage.getItem("email");

        const product = {

            title:
                document.getElementById("title").value,

            description:
                document.getElementById("description").value,

            price:
                parseFloat(
                    document.getElementById("price").value
                ),

            category:
                document.getElementById("category").value,

            condition:
                document.getElementById("condition").value,

            sellerEmail
        };

        try{

            const response =
                await fetch(
                    "http://localhost:8080/api/products",
                    {
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(product)
                    }
                );

            if(response.ok){

                showToast(
                    "Product Added Successfully"
                );

                productForm.reset();

                loadMyProducts();
                loadProducts();

            }else{

                showToast(
                    "Failed To Add Product"
                );
            }

        }catch(error){

            console.error(error);

            showToast(
                "Server Error"
            );
        }
    });
}

function openProduct(id){

    localStorage.setItem(
        "selectedProductId",
        id
    );

    window.location.href =
        "product.html";
}

