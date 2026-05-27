/**
 * Minimal Academic Website JavaScript (jemdoc style)
 *
 * Data is loaded from external files in /data/ folder:
 *   - data/news.js -> NEWS_DATA
 *   - data/team.js -> TEAM_DATA
 */

document.addEventListener('DOMContentLoaded', function() {
  loadNews();
  loadTeam();
});

/**
 * Load News Items
 */
function loadNews() {
  var newsList = document.getElementById('news-list');
  if (!newsList) return;

  if (typeof NEWS_DATA === 'undefined') {
    console.warn('NEWS_DATA not found. Make sure data/news.js is loaded.');
    return;
  }

  NEWS_DATA.forEach(function(item) {
    var li = document.createElement('li');
    var parts = item.date.split(' ');
    var month = parts[0];
    var year = parts[1] || '';
    li.innerHTML =
      '<div class="news-date-badge">' +
        '<div class="news-date-month">' + month + '</div>' +
        '<div class="news-date-year">' + year + '</div>' +
      '</div>' +
      '<span class="news-text">' + item.emoji + ' ' + item.text + '</span>';
    newsList.appendChild(li);
  });
}

/**
 * Load Team Members
 */
function loadTeam() {
  var teamContainer = document.getElementById('team-container');
  if (!teamContainer) return;

  if (typeof TEAM_DATA === 'undefined') {
    console.warn('TEAM_DATA not found. Make sure data/team.js is loaded.');
    return;
  }

  Object.keys(TEAM_DATA).forEach(function(category) {
    var h3 = document.createElement('h3');
    h3.textContent = category;
    teamContainer.appendChild(h3);

    var grid = document.createElement('div');
    grid.className = 'team-grid';

    TEAM_DATA[category].forEach(function(member) {
      var card = document.createElement('div');
      card.className = 'team-card';

      var initials = member.name.split(' ').map(function(n) { return n[0]; }).join('');

      var links = '';
      if (member.homepage) {
        links += '<a href="' + member.homepage + '" target="_blank">web</a>';
      }
      if (member.scholar) {
        links += '<a href="' + member.scholar + '" target="_blank">scholar</a>';
      }

      card.innerHTML =
        '<img src="' + member.photo + '" alt="' + member.name + '" class="team-photo"' +
        ' onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">' +
        '<div class="team-fallback" style="display:none;">' + initials + '</div>' +
        '<div class="team-info">' +
          '<h4>' + member.name + '</h4>' +
          '<div class="team-dept">' + member.dept + ', POSTECH</div>' +
          '<div class="team-research">' + member.research + '</div>' +
          (links ? '<div class="team-links">' + links + '</div>' : '') +
        '</div>';

      grid.appendChild(card);
    });

    teamContainer.appendChild(grid);
  });
}

// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-92946797-1', 'auto');
ga('send', 'pageview');
