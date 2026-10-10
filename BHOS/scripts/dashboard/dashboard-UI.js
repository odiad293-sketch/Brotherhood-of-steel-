export function renderHeroHTML() {
  const heroContainer = document.querySelector('.hero-section');
  const rederHero = `
   <div class="main-container">
        
        <div class="container-header">
          
          <div class="logo-wrapper">
            
            <div class="logo-border">
              
              <img class="logo-image2" src="images/BHOS-log.png">
              
            </div>
            
            <div class="online-badge"></div>
            
          </div>
          
          
          <div class="right-section">
            
            <div class="welcome-message">
              
              <p class="welcome">
                Welcome back,
              </p>
              
              <p class="user-name">
                Odia Etiosa
              </p>
              
            </div>
            
            
            <div class="user-rank">
              
              <span class="red-icons material-symbols-outlined">
                shield
              </span>
              
              <div class="rank">
                knight
              </div>
              
            </div>
            
            
            <div class="alliance-quote">
              
              <p class="quoted">
                "Strength in unity. victory through steel."
              </p>
              
            </div>
            
          </div>
          
          
          <div class="Left-section">
            
            <div class="location-details">
              
              <span class="White-icons material-symbols-outlined">
              </span>
              
              <p class="current-time">
                6:06PM
              </p>
              
              <p class="current-date">
                sun, jul 27, 2026
              </p>
              
            </div>
            
            
            <div class="container-time-zone">
              
              <span class="White-icons material-symbols-outlined">
              
                language
                
                <span class="current-time-zone">
                  UTC +1
                </span>
                
              </span>
              
            </div>
            
          </div>
          
        </div>
        
      </div>
  `;
  heroContainer.innerHTML = rederHero;
};

export function renderStatAndFieldHTML() {
  const statAndFieldContainer = document.querySelector('.main-container-2')
  const renderStatAndField = `
         <!-- STATISTICS -->
      
      <div class="stats-container">
        
        <div class="statistics-section">
          
          
          <!-- CARD 1 -->
          
          <div class="statistics-card">
            
            <div class="statistics-card-header">
              
              <div class="statistics-icon">
                
                <span class="stats-icon White-icons material-symbols-outlined">
                  groups
                </span>
                
              </div>
              
              <p class="statistics-value">
                128
              </p>
              
            </div>
            
            
            <div class="statistics-card-body">
              
              <p class="statistics-title">
                Alliance Members
              </p>
              
              <div class="statistics-status">
                
                <div class="triangle-indicator"></div>
                
                <p class="statistics-status-text">
                  12 new
                </p>
                
              </div>
              
            </div>
            
          </div>
          
          
          <!-- CARD 2 -->
          
          <div class="statistics-card">
            
            <div class="statistics-card-header">
              
              <div class="statistics-icon">
                
                <span class="stats-icon White-icons material-symbols-outlined">
                  crown
                </span>
                
              </div>
              
              <p class="statistics-value">
                #24
              </p>
              
            </div>
            
            
            <div class="statistics-card-body">
              
              <p class="statistics-title">
                Alliance Rank Global
              </p>
              
              <div class="statistics-status">
                
                <p class="statistics-status-text"></p>
                
              </div>
              
            </div>
            
          </div>
          
          
          <!-- CARD 3 -->
          
          <div class="statistics-card">
            
            <div class="statistics-card-header">
              
              <div class="statistics-icon">
                
                <span class="stats-icon White-icons material-symbols-outlined">
                  shield
                </span>
                
              </div>
              
              <p class="statistics-value">
                58
              </p>
              
            </div>
            
            
            <div class="statistics-card-body">
              
              <p class="statistics-title">
                Members online Now
              </p>
              
              <div class="statistics-status">
                
                <div class="triangle-indicator"></div>
                
                <p class="statistics-status-text">
                  6 new
                </p>
                
              </div>
              
            </div>
            
          </div>
          
          
          <!-- CARD 4 -->
          
          <div class="statistics-card">
            
            <div class="statistics-card-header">
              
              <div class="statistics-icon">
                
                <span class="stats-icon White-icons material-symbols-outlined">
                  warning
                </span>
                
              </div>
              
              <p class="statistics-value">
                15
              </p>
              
            </div>
            
            
            <div class="statistics-card-body">
              
              <p class="statistics-title">
                Active conflict
              </p>
              
              <div class="statistics-status">
                
                <div class="triangle-indicator-red"></div>
                
                <p class="statistics-status-text-red">
                  12 new
                </p>
                
              </div>
              
            </div>
            
          </div>
          
          
          <!-- CARD 5 -->
          
          <div class="statistics-card">
            
            <div class="statistics-card-header">
              
              <div class="statistics-icon">
                
                <span class="stats-icon White-icons material-symbols-outlined">
                  handshake
                </span>
                
              </div>
              
              <p class="statistics-value">
                10
              </p>
              
            </div>
            
            
            <div class="statistics-card-body">
              
              <p class="statistics-title">
                Alliance treaties
              </p>
              
              <div class="statistics-status">
                
                <div class="triangle-indicator"></div>
                
                <p class="statistics-status-text">
                  1 new
                </p>
                
              </div>
              
            </div>
            
          </div>
          
          
          <!-- CARD 6 -->
          
          <div class="statistics-card">
            
            <div class="statistics-card-header">
              
              <div class="statistics-icon">
                
                <span class="stats-icon White-icons material-symbols-outlined">
                  checklist
                </span>
                
              </div>
              
              <p class="statistics-value">
                5
              </p>
              
            </div>
            
            
            <div class="statistics-card-body">
              
              <p class="statistics-title">
                Alliance project
              </p>
              
              <div class="statistics-status">
                
                <div class="triangle-indicator"></div>
                
                <p class="statistics-status-text">
                  1 new
                </p>
                
              </div>
              
            </div>
            
          </div>
          
        </div>
        
        
        <!-- BOTTOM STATISTICS -->
        
        <div class="statistics-card-bottom">
          
          
          <!-- DEFCON -->
          
          <div class="statistics-card">
            
            <div class="statistics-card-header">
              
              <div class="statistics-icon">
                
                <span class="stats-icon White-icons material-symbols-outlined">
                  shield_with_house
                </span>
                
              </div>
              
              <p class="statistics-value">
                3
              </p>
              
            </div>
            
            
            <div class="statistics-card-body">
              
              <p class="statistics-title">
                DEFCON
              </p>
              
              <div class="statistics-status">
                
                <div class="circle"></div>
                
              </div>
              
            </div>
            
          </div>
          
          
          <!-- NUKES -->
          
          <div class="statistics-card">
            
            <div class="statistics-card-header">
              
              <div class="statistics-icon">
                
                <span class="stats-icon White-icons material-symbols-outlined">
                  bomb
                </span>
                
              </div>
              
              <p class="statistics-value">
                160
              </p>
              
            </div>
            
            
            <div class="statistics-card-body">
              
              <p class="statistics-title">
                Owned nukes
              </p>
              
              <div class="statistics-status">
                
                <div class="triangle-indicator"></div>
                
                <p class="statistics-status-text">
                  10 new
                </p>
                
              </div>
              
            </div>
            
          </div>
          
        </div>
        
      </div>
      
      
      <!-- ALLIANCE FIELD -->
      
      <div class="alliance-field">
        
        <div class="alliance-field-header">
          
          <div class="right-component">
            
            <span class="red-icons White-icons material-symbols-outlined">
              flag
            </span>
            
            ALLIANCE FIELD
            
          </div>
          
          
          <div class="left-component">
            
            <a class="nav-field" href="#">
            
              <div class="view-all">
                View all
              </div>
              
              <div class="nav-arrow"></div>
              
            </a>
            
          </div>
          
        </div>
        
        
        <div class="main-field-container">
          
          
          <!-- FIELD 1 -->
          
          <div class="field-container">
            
            <div class="field-icons">
              
              <span class="stats-icon White-icons material-symbols-outlined">
                language
              </span>
              
            </div>
            
            <div class="field-title">
              Total Nation
            </div>
            
            <div class="field-body">
              128
            </div>
            
          </div>
          
          
          <!-- FIELD 2 -->
          
          <div class="field-container">
            
            <div class="field-icons-white">
              
              <span class="stats-icon White-icons material-symbols-outlined">
                location_city
              </span>
              
            </div>
            
            <div class="field-title">
              Total City
            </div>
            
            <div class="field-body">
              432
            </div>
            
          </div>
          
          
          <!-- FIELD 3 -->
          
          <div class="field-container">
            
            <div class="field-icons">
              
              <span class="stats-icon White-icons material-symbols-outlined">
                flag
              </span>
              
            </div>
            
            <div class="field-title">
              Total Land
            </div>
            
            <div class="field-body">
              2458km²
            </div>
            
          </div>
          
          
          <!-- FIELD 4 -->
          
          <div class="field-container">
            
            <div class="field-icons">
              
              <span class="stats-icon White-icons material-symbols-outlined">
                star
              </span>
              
            </div>
            
            <div class="field-title">
              Average Score
            </div>
            
            <div class="field-body">
              6,559
            </div>
            
          </div>
          
          
          <!-- FIELD 5 -->
          
          <div class="field-container-right-border">
            
            <div class="field-icons">
              
              <span class="stats-icon White-icons material-symbols-outlined">
                military_tech
              </span>
              
            </div>
            
            <div class="field-title-wrap">
              Alliance Score
            </div>
            
            <div class="field-body">
              876,470
            </div>
            
          </div>
          
        </div>
        
      </div>
      
      
      <div class="alliance-">
        
      </div>
  `;
  statAndFieldContainer.innerHTML = renderStatAndField;
}

export function sidebar() {
  const sidebar = document.querySelector('.js-sidebar');
  const overlay = document.querySelector('.js-overlay');
  const sidebarBtn = document.querySelector('.js-sidebar-btn');
  const menuBtn = document.querySelector('.js-sidebar-icon');
  sidebarBtn.addEventListener('click', () => {
    console.log('hambuger active');
    
    sidebar.classList.toggle('open');
    
    if (sidebar.classList.contains('open')) {
      overlay.classList.add('open');
      menuBtn.classList.add('open');
      menuBtn.textContent = 'close';
    } else {
      overlay.classList.remove('open');
      menuBtn.textContent = 'menu';
    }
  });
  
  overlay.addEventListener('click', () => {
    overlay.classList.remove('open');
    sidebar.classList.remove('open');
    menuBtn.textContent = 'menu';
  });
};