 function loginUser() {
    window.location.href = "user-page.html";
  }

  function loginAdmin() {
    window.location.href = "Admin-Page.html";
  }
  //sadeem
 // View Recipe Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // ===== INGREDIENTS CHECKBOXES =====
  const checkboxes = document.querySelectorAll('.ingredient-checkbox input');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('change', function() {
      const label = this.nextElementSibling;
      
      if (this.checked) {
        label.style.backgroundColor = '#b07a7a';
      } else {
        label.style.backgroundColor = '';
      }
    });
  }
  
  // ===== STAR RATING =====
  const stars = document.querySelectorAll('.star-rating .star');
  if (stars.length > 0) {
    for (let i = 0; i < stars.length; i++) {
      stars[i].addEventListener('click', function() {
        const rating = this.getAttribute('data-rating');
        
        // Update all stars
        for (let j = 0; j < stars.length; j++) {
          if (j < rating) {
            stars[j].textContent = '⭐';
          } else {
            stars[j].textContent = '☆';
          }
        }
      });
    }
  }
  
  // ===== FAVORITE BUTTON =====
  const favoriteBtn = document.querySelector('.favorite-btn');
  if (favoriteBtn) {
    let isFavorited = false;
    
    favoriteBtn.addEventListener('click', function() {
      if (!isFavorited) {
        // Add to favorites
        isFavorited = true;
        this.innerHTML = '<span class="action-icon">❤️</span> Added to Favorites';
        alert('Recipe added to favorites!');
      } else {
        // Remove from favorites
        isFavorited = false;
        this.innerHTML = '<span class="action-icon">❤️</span> Add to Favorites';
        alert('Recipe removed from favorites!');
      }
    });
  }
  
  // ===== LIKE BUTTON =====
  const likeBtn = document.querySelector('.like-btn');
  if (likeBtn) {
    let likes = 45;
    let isLiked = false;
    
    likeBtn.addEventListener('click', function() {
      const likeCount = this.querySelector('.like-count');
      
      if (!isLiked) {
        // Add like
        likes++;
        isLiked = true;
        likeCount.textContent = '(' + likes + ')';
      } else {
        // Remove like
        likes--;
        isLiked = false;
        likeCount.textContent = '(' + likes + ')';
      }
    });
  }
  
  // ===== REPORT BUTTON =====
  const reportBtn = document.querySelector('.report-btn');
  if (reportBtn) {
    reportBtn.addEventListener('click', function() {
      alert('Thank you for reporting.');
    });
  }
  
  // ===== ADD COMMENT =====
  const submitCommentBtn = document.querySelector('.submit-comment-btn');
  const commentTextarea = document.querySelector('.comment-input-area textarea');
  
  if (submitCommentBtn && commentTextarea) {
    submitCommentBtn.addEventListener('click', function() {
      const commentText = commentTextarea.value.trim();
      
      if (!commentText) {
        alert('Please write a comment.');
        return;
      }
      
      alert('Thank you for your comment!');
      commentTextarea.value = '';
    });
  }
  
  // ===== PLAY VIDEO =====
  const playButton = document.querySelector('.play-button');
  if (playButton) {
    playButton.addEventListener('click', function() {
      window.open('https://youtube.com', '_blank');
    });
  }
  
  // ===== TAGS =====
  const tags = document.querySelectorAll('.tag');
  for (let i = 0; i < tags.length; i++) {
    tags[i].addEventListener('click', function() {
      alert('Tag clicked');
    });
  }
  
  // ===== EDIT RECIPE FUNCTIONALITY =====
  
  // 1. Add new ingredient
  const addIngredientBtn = document.getElementById('addIngredientBtn');
  if (addIngredientBtn) {
    addIngredientBtn.addEventListener('click', function() {
      const ingredientsList = document.getElementById('ingredientsList');
      const ingredientRow = document.createElement('div');
      ingredientRow.className = 'item-row';
      ingredientRow.innerHTML = '<input type="text" class="item-name" placeholder="Ingredient name" required>' +
                                '<input type="text" class="item-quantity" placeholder="Quantity" required>' +
                                '<button type="button" class="remove-item-btn">X</button>';
      ingredientsList.appendChild(ingredientRow);
    });
  }
  
  // 2. Add new instruction
  const addInstructionBtn = document.getElementById('addInstructionBtn');
  if (addInstructionBtn) {
    addInstructionBtn.addEventListener('click', function() {
      const instructionsList = document.getElementById('instructionsList');
      const instructionRows = instructionsList.querySelectorAll('.instruction-row');
      const stepNumber = instructionRows.length + 1;
      
      const instructionRow = document.createElement('div');
      instructionRow.className = 'instruction-row';
      instructionRow.innerHTML = '<div class="step-number">' + stepNumber + '</div>' +
                                 '<textarea class="instruction-step" placeholder="Instruction step" required></textarea>' +
                                 '<button type="button" class="remove-item-btn">X</button>';
      instructionsList.appendChild(instructionRow);
    });
  }
  
  // 3. Remove item (ingredient or step)
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-item-btn')) {
      let row = e.target.parentNode;
      
      // Check if this is the correct row
      if (row.classList.contains('item-row') || row.classList.contains('instruction-row')) {
        row.remove();
        
        // Update step numbers
        const instructionRows = document.querySelectorAll('#instructionsList .instruction-row');
        if (instructionRows.length > 0) {
          for (let i = 0; i < instructionRows.length; i++) {
            const stepNumber = instructionRows[i].querySelector('.step-number');
            if (stepNumber) {
              stepNumber.textContent = (i + 1);
            }
          }
        }
      }
    }
  });
  
  // 4. Upload new image - simplified
  const uploadArea = document.getElementById('uploadArea');
  const recipeImage = document.getElementById('recipeImage');
  
  if (uploadArea && recipeImage) {
    uploadArea.addEventListener('click', function() {
      recipeImage.click();
    });
    
    recipeImage.addEventListener('change', function(e) {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('File size must be less than 5MB');
          return;
        }
        
        // Check file type - simple way
        if (file.type !== 'image/jpeg' && 
            file.type !== 'image/png' && 
            file.type !== 'image/gif') {
          alert('Only JPG, PNG and GIF files are allowed');
          return;
        }
        
        // Simple way to show image
        const imageUrl = URL.createObjectURL(file);
        const currentImage = document.getElementById('currentImage');
        if (currentImage) {
          currentImage.src = imageUrl;
        }
      }
    });
  }
  
  // 5. Validate form before submit
  const editRecipeForm = document.getElementById('editRecipeForm');
  if (editRecipeForm) {
    editRecipeForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Check for at least one ingredient
      const ingredients = document.querySelectorAll('#ingredientsList .item-row');
      if (ingredients.length === 0) {
        alert('Please add at least one ingredient');
        return;
      }
      
      // Check for at least one instruction
      const instructions = document.querySelectorAll('#instructionsList .instruction-row');
      if (instructions.length === 0) {
        alert('Please add at least one instruction step');
        return;
      }
      
      // Check recipe name
      const recipeName = document.getElementById('recipeName');
      if (recipeName && recipeName.value.trim().length < 3) {
        alert('Recipe name must be at least 3 characters long');
        return;
      }
      
      // Check category
      const recipeCategory = document.getElementById('recipeCategory');
      if (recipeCategory && !recipeCategory.value) {
        alert('Please select a category');
        return;
      }
      
      const submitBtn = document.querySelector('.submit-btn');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Saving...';
        submitBtn.disabled = true;
        
        setTimeout(function() {
          // Show success message
          alert('Recipe updated successfully!');
          
          // Go back to recipes page
          window.location.href = 'my_recipes.html';
        }, 1500);
      }
    });
  }
  
  // 6. Cancel button
  const cancelBtn = document.querySelector('.cancel-btn');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
        window.location.href = 'my_recipes.html';
      }
    });
  }
});
//sadeem
document.addEventListener('DOMContentLoaded', () => {
  // Define the initial counts
  let blockedUsersCount = 2;  // Example starting count
  let pendingReportsCount = 2;  // Example starting count
  
  // Update user counts on page load
  updateUserCounts();

  // Function to update user counts dynamically
  function updateUserCounts() {
    document.getElementById("blocked-users-count").textContent = blockedUsersCount;
    document.getElementById("pending-reports-count").textContent = pendingReportsCount;
  }

  // Add event listener for adding new blocked users 
  document.getElementById("add-blocked-user-btn")?.addEventListener('click', () => {
    
    blockedUsersCount++;
    updateUserCounts();
    
    addBlockedUserRow("New User", "new.user@email.com");
  });

  // Add event listener for adding new pending reports 
  document.getElementById("add-pending-report-btn")?.addEventListener('click', () => {
    
    pendingReportsCount++;
    updateUserCounts();
    
    addPendingReportRow("New Recipe", "New Creator");
  });

  // Function to add a row for blocked users
  function addBlockedUserRow(name, email) {
    const tableBody = document.querySelector(".blocked-users .admin-table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
    `;
    tableBody.appendChild(newRow);
  }

  // Function to add a row for pending reports
  function addPendingReportRow(recipeName, creatorName) {
    const tableBody = document.querySelector(".pending-reports .admin-table tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><a href="view_recipe.html">${recipeName}</a></td>
      <td>
        <div class="creator-info">
          <img src="images/default-avatar.jpg" alt="${creatorName}'s Avatar" class="creator-avatar"> ${creatorName}
        </div>
      </td>
      <td>
        <select class="action-select">
          <option>Select action</option>
          <option>Block User</option>
          <option>Dismiss Report</option>
        </select>
        <button class="action-btn">Apply</button>
      </td>
    `;
    tableBody.appendChild(newRow);
  }

  // Simulating the 'Sign Out' functionality
  document.querySelector('.sign-out-btn')?.addEventListener('click', () => {
    window.location.href = "home.html";  // Redirect to homepage
  });

  // Function to dynamically update the admin info 
  const adminInfo = {
    name: "Steve",
    email: "steve@healthybites.com"
  };

  // Update admin info
  document.querySelector(".admin-info-text h2").textContent = Admin ${adminInfo.name};
  document.querySelector(".admin-info-text p").textContent = adminInfo.email;
});

document.addEventListener("DOMContentLoaded", function () {

  // Add Ingredient Button click event
  const addIngredientBtn = document.getElementById("addIngredientBtn");
  const ingredientsList = document.getElementById("ingredientsList");

  addIngredientBtn.addEventListener("click", function () {
    const ingredientRow = document.createElement("div");
    ingredientRow.classList.add("item-row");

    ingredientRow.innerHTML = `
      <input type="text" class="item-name" placeholder="Ingredient name" required>
      <input type="text" class="item-quantity" placeholder="Quantity" required>
      <button type="button" class="remove-item-btn">X</button>
    `;

    // Append new ingredient row
    ingredientsList.appendChild(ingredientRow);

    // Add event listener to remove button
    const removeBtn = ingredientRow.querySelector(".remove-item-btn");
    removeBtn.addEventListener("click", function () {
      ingredientRow.remove();
    });
  });

  // Add Instruction Step Button click event
  const addInstructionBtn = document.getElementById("addInstructionBtn");
  const instructionsList = document.getElementById("instructionsList");

  addInstructionBtn.addEventListener("click", function () {
    const instructionRow = document.createElement("div");
    instructionRow.classList.add("instruction-row");

    const stepsCount = instructionsList.querySelectorAll('.instruction-row').length + 1;

    instructionRow.innerHTML = `
      <div class="step-number">${stepsCount}</div>
      <textarea class="instruction-step" placeholder="Instruction step" required></textarea>
      <button type="button" class="remove-item-btn">X</button>
    `;

    // Append new instruction row
    instructionsList.appendChild(instructionRow);

    // Add event listener to remove button
    const removeBtn = instructionRow.querySelector(".remove-item-btn");
    removeBtn.addEventListener("click", function () {
      instructionRow.remove();
      updateStepNumbers();
    });
  });

  // Update instruction step numbers after a row is removed
  function updateStepNumbers() {
    const stepNumbers = instructionsList.querySelectorAll('.step-number');
    stepNumbers.forEach((step, index) => {
      step.textContent = index + 1;
    });
  }

  // Photo upload functionality
  const recipeImage = document.getElementById("recipeImage");
  const imagePlaceholder = document.getElementById("Image-Placeholder");
  const uploadArea = document.getElementById("uploadArea");

  uploadArea.addEventListener("click", function () {
    recipeImage.click();
  });

  recipeImage.addEventListener("change", function () {
    const file = recipeImage.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePlaceholder.src = e.target.result;
        imagePlaceholder.style.display = "block"; // Show image
      };
      reader.readAsDataURL(file);
    }
  });

  // Form submission
  const recipeForm = document.getElementById("editRecipeForm");

  recipeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Gather form data
    const formData = new FormData(recipeForm);
    formData.append("recipeImage", recipeImage.files[0]);

   
    fetch("/submit_recipe", {
      method: "POST",
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Redirect to 'My Recipes' page after successful submission
          window.location.href = "My_Recipes.html";
        } else {
          alert("There was an error submitting your recipe.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("There was an error submitting your recipe.");
      });
  });

});

