(async function() {
  // DOM has been loaded
  // fetch teams and bind the sort function to sort the team with the highest scored points higher
  let teams = (await fetchTeams()).sort((a, b) => calculatePoints(b.matchesPlayed) - calculatePoints(a.matchesPlayed));

  for(let i = 0; i < teams.length; i++) {
    buildTeamElements(teams[i], i + 1);
  }
  setTimeout(() => {
    highlightEuropeanLeagueTeams();
  }, 200);
})();

function buildTeamElements(team, rank) {
  // wrapper
  const teamWrapper = buildDiv('team-wrapper');
  document.getElementById('standings').appendChild(teamWrapper);
  // rank
  const rankParagraph = buildParagraph(rank, 'matches-played');
  teamWrapper.appendChild(rankParagraph);
  // logo
  const teamImageDiv = buildDiv('team-image');
  teamWrapper.appendChild(teamImageDiv);
  // logo src
  const teamImage = buildImage(team.logo);
  teamImageDiv.appendChild(teamImage);
  // team name
  const teamName = buildParagraph(team.name, 'team-name');
  teamWrapper.appendChild(teamName);
  // points
  const points = calculatePoints(team.matchesPlayed);
  const pointsParagraph = buildParagraph(points, 'matches-played');
  teamWrapper.appendChild(pointsParagraph);
  // matches played
  const matchesPlayedParagraph = buildParagraph(calculateMatchesPlayed(team.matchesPlayed), 'matches-played');
  teamWrapper.appendChild(matchesPlayedParagraph);
  // matches won
  const matchesWonParagraph = buildParagraph(team.matchesPlayed.wins, 'matches-played');
  teamWrapper.appendChild(matchesWonParagraph);
  // matches draw
  const matchesDrawParagraph = buildParagraph(team.matchesPlayed.draws, 'matches-played');
  teamWrapper.appendChild(matchesDrawParagraph);
  // matches lost
  const matchesLostParagraph = buildParagraph(team.matchesPlayed.losses, 'matches-played');
  teamWrapper.appendChild(matchesLostParagraph);
  // goals scored
  const goalsScoredParagraph = buildParagraph(team.goals.scored, 'matches-played');
  teamWrapper.appendChild(goalsScoredParagraph);
  // goals conceded
  const goalsConcededParagraph = buildParagraph(team.goals.conceded, 'matches-played');
  teamWrapper.appendChild(goalsConcededParagraph);
  // goals difference
  const goalsDifferenceParagraph = buildParagraph(calculateGoalDifference(team.goals), 'matches-played');
  teamWrapper.appendChild(goalsDifferenceParagraph);
}

function buildImage(src) {
  const image = new Image();
  image.src = src;
  image.className = 'logo';
  return image;
}

function buildDiv(className) {
  const div = document.createElement('div');
  div.className = className;
  return div;
}

function buildSpan(value) {
  const span = document.createElement('span');
  span.className = 'team-city';
  span.innerHTML = value;
  return span;
}

function buildParagraph(teamName, className) {
  const paragraph = document.createElement('p');
  paragraph.className = className;
  paragraph.innerHTML = teamName;
  return paragraph;
}

function buildTeam(team, index) {
  document.getElementsByClassName('logo')[index].src = team.logo;
  document.getElementsByClassName('team-name')[index].innerHTML = team.name;
  document.getElementsByClassName('team-city')[index].innerHTML = team.city;
}

function calculatePoints(matches) {
  return (3 * matches.wins) + // every win counts as 3 points
    (1 * matches.draws); // every draw counts as 1 point
}

function calculateMatchesPlayed(matches) {
  return matches.wins + matches.draws + matches.losses;
}

function calculateGoalDifference(goals) {
  return goals.scored - goals.conceded;
}

async function fetchTeams() {
  return await fetch('/js/premier-league-standings.json')
          .then(response => response.json())
          .then(data => data)
          .catch(err => console.error(err));
}

function highlightEuropeanLeagueTeams() {
  const allWrappers = document.getElementsByClassName('team-wrapper');

  for (let i = 0; i < allWrappers.length; i++) {
    if (i < 4) {
      allWrappers[i].getElementsByClassName('matches-played')[0].className += ' champions-league';
    }

    if (i < 6 && i > 3) {
      allWrappers[i].getElementsByClassName('matches-played')[0].className += ' europa-league';
    }
  }
}
