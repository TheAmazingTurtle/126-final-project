console.log('This is home script js, running and loaded');

let targetUrl = '';



document.addEventListener("DOMContentLoaded", () => {
  console.log('Number of .game-link elements:', document.querySelectorAll('.game-link').length);

  // Show login form and hide signup form
  window.showLogin = function() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
  }

  // Show signup form and hide login form
  window.showSignUp = function() {
    document.getElementById('signup-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
  }

  const body = document.body;
  const message = body.dataset.message;
  const error = body.dataset.error;

  if(message){
    showLogin();
    openPopupWithMessage(message, false);
  }

  if(error){
    showSignUp();
    openPopupWithMessage(error, true);
  }


  function openPopupWithMessage(text, isError){
    const popupOverlay = document.getElementById('popup-overlay');
    const popup = document.getElementById('popup');
  
    popupOverlay.classList.add('active');
    popup.classList.add('active');
    document.getElementById('aspect-ratio-wrapper').classList.add('active');

    let messageContainer = document.getElementById('popup-message');
    if(!messageContainer){
      messageContainer = document.createElement('p');
      messageContainer.id = 'popup-message';
      messageContainer.style.color = isError? 'red' : 'green';
      popup.insertBefore(messageContainer, popup.firstChild);
    }
  
    messageContainer.textContent = text;
  }

  // Start with PHP-initialized value but allow updates
  // let isLoggedIn = <?php echo json_encode($isLoggedIn); ?>;
  // const userName = <?php echo json_encode($userName); ?>;

  // Fetch session status from login.php
  fetch('login.php')
    .then(response => response.json())
    .then(data => {
      isLoggedIn = data.isLoggedIn;
      console.log("Login status:", isLoggedIn ? `Logged in as ${data.userName}` : "Not logged in");

      // Now set up protected links and event listeners AFTER login status is known
      setupProtectedLinks();
      setupModalClose();
      setupPasswordToggles();
      setupLoginForm();
      setupGameLinkAnimations();

      const gameLogo = document.getElementById('game-logo');
      if (!isLoggedIn){
        gameLogo.addEventListener('click', () => {
          console.log("User is not logged in anyway. No need to log out.");
          return;
        });
      } 

      gameLogo.addEventListener('click', () =>{
      fetch('logout.php?_=' + new Date().getTime())
      .then(() =>{
        console.log("User has logged out.");
        window.location.href='home.php';
      })
      .catch(err=>{
        console.log("Logout failed: ", err);
      });
    });

    })
    .catch(error => {
      console.error("Error checking login status:", error);
      // Fallback: still set up listeners with initial PHP value
      setupProtectedLinks();
      setupModalClose();
      setupPasswordToggles();
      setupLoginForm();
    });

  function setupProtectedLinks() {
    document.querySelectorAll('a[data-protected="true"]').forEach(link => {
      link.addEventListener("click", function(event) {
        if (!isLoggedIn) {
          event.preventDefault();
          event.stopImmediatePropagation();

          console.log("User not logged in, showing modal...");

          // Show modal for login
          document.getElementById('popup-overlay').classList.add('active');
          document.getElementById('popup').classList.add('active');
          document.getElementById('aspect-ratio-wrapper').classList.add('active');

          showLogin();
        }
      });
    });
  }

  function setupModalClose() {
    document.querySelector(".close-button").addEventListener("click", () => {
      document.getElementById('popup-overlay').classList.remove('active');
      document.getElementById('popup').classList.remove('active');
      document.getElementById('aspect-ratio-wrapper').classList.remove('active');
    });
  }

  function setupLoginForm() {
    document.getElementById("login-form").addEventListener("submit", function(e) {
      e.preventDefault();

      const formData = new FormData(this);
      fetch('login.php',{
        method:'POST',
        body: formData,
      })

      .then(res=> res.json())
      .then(data => {
        if(data.success){
          document.getElementById('popup-overlay').classList.remove('active');
          document.getElementById('popup').classList.remove('active');
          document.getElementById('aspect-ratio-wrapper').classList.remove('active');
          window.location.href = 'home.php';

        } else {
          openPopupWithMessage(data.message, true);
        }

      })

      .catch(err=> console.error('Login failed: ',err));

    });

  }

  function setupPasswordToggles() {
    setupPasswordToggle("signup-password", "signup-eye-icon");
    setupPasswordToggle("login-password", "login-eye-icon");
  }

  function setupPasswordToggle(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const eyeIcon = document.getElementById(iconId);

    eyeIcon.addEventListener("click", () => {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.src = "assets/images/eyes-close.png"; // closed eye icon
      } else {
        passwordInput.type = "password";
        eyeIcon.src = "assets/images/eyes-open.png"; // open eye icon
      }
    });
  }

  function showDifficultyModal(onSelect) {
    const modal = document.getElementById('choose-difficulty-card');
    modal.classList.remove('hidden');

    const buttons = modal.querySelectorAll('h3');
    buttons.forEach(button => {
      button.onclick = () => {
        const difficulty = button.dataset.difficulty;
        modal.classList.add('hidden'); // Hide after selection
        onSelect(difficulty); // Continue with redirect
      };
    });
  }

  function setupGameLinkAnimations() {
    document.querySelectorAll('.game-link').forEach(link => {
      if (link.getAttribute('onclick') && link.getAttribute('onclick').includes('toggle()')) {
        return; // skip
      }

      link.addEventListener('click', function (e) {
        if (!isLoggedIn) return;

        e.preventDefault();

        const targetHref = this.getAttribute('href'); // Store link
        const titleCard = document.getElementById('title-card');
        const blackBackground = document.getElementById('blackBackground');
        const whiteFadeIn = document.getElementById('whiteFadeIn');
        const home_leaderboard_transition = document.getElementById('home_leaderboard_transition');

        // Reset animations
        [titleCard, blackBackground, whiteFadeIn, home_leaderboard_transition].forEach(el => {
          el.style.animation = 'none';
          void el.offsetWidth;
        });

        // Play animations
        titleCard.style.animation = 'gitlogZoomIn 1.55s ease-in-out forwards';
        blackBackground.style.animation = 'blackBackgroundFadeIn 1s ease-in-out forwards';
        whiteFadeIn.style.animation = 'whiteFadeIn_Expand 1.55s ease-in-out forwards';

        // After animation, show difficulty modal
        setTimeout(() => {
          showDifficultyModal(difficulty => {
            const finalUrl = `${targetHref}?difficulty=${encodeURIComponent(difficulty)}`;
            window.location.href = finalUrl;
          });
        }, 1500);
      });
    });
  }

});
