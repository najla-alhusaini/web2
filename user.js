// ===== Filter Recipes by Category =====
const filterBtn = document.querySelector(".filter-box button");
const categorySelect = document.querySelector(".filter-box select");
const recipeRows = document.querySelectorAll(".user-table tr");

filterBtn.addEventListener("click", () => {
  const selectedCategory = categorySelect.value.toLowerCase();

  recipeRows.forEach((row, index) => {
    // نتجاوز صف الهيدر
    if (index === 0) return;

    const categoryCell = row.cells[4]; // عمود التصنيف
    const categoryText = categoryCell.textContent.toLowerCase();

    if (
      selectedCategory === "all categories" ||
      categoryText === selectedCategory
    ) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
});
// ===== Remove from favourites (dummy action) =====
const removeLinks = document.querySelectorAll(".user-section a[href='user.html']");

removeLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    alert("Recipe removed from favourites (Phase 1 demo).");
    window.location.href = "user.html";
  });
});
