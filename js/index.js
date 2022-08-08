// fetch teams and bind the sort function to sort the team with the highest scored points higher
const teams = fetchTeams().sort((a, b) => calculatePoints(b.matchesPlayed) - calculatePoints(a.matchesPlayed));

(function() {
  // DOM has been loaded
  for(let i = 0; i < 7; i++) {
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

function fetchTeams() {
  return [
    {
      name: 'Arsenal',
      country: 'England',
      logo: 'assets/arsenal-logo.png',
      city: 'London',
      matchesPlayed: {
        wins: 32,
        draws: 4,
        losses: 2
      },
      goals: {
        scored: 82,
        conceded: 26
      }
    },
    {
      name: 'Manchester City',
      country: 'England',
      logo: 'assets/manchester-city.png',
      city: 'Manchester',
      matchesPlayed: {
        wins: 29,
        draws: 5,
        losses: 4
      },
      goals: {
        scored: 70,
        conceded: 24
      }
    },
    {
      name: 'Liverpool',
      country: 'England',
      logo: 'assets/liverpool.png',
      city: 'Liverpool',
      matchesPlayed: {
        wins: 28,
        draws: 5,
        losses: 5
      },
      goals: {
        scored: 59,
        conceded: 18
      }
    },
    {
      name: 'Manchester United',
      country: 'England',
      logo: 'assets/manchester-united.png',
      city: 'Manchester',
      matchesPlayed: {
        wins: 21,
        draws: 7,
        losses: 10
      },
      goals: {
        scored: 68,
        conceded: 37
      }
    },
    {
      name: 'Chelsea',
      country: 'England',
      logo: 'assets/chealsea.png',
      city: 'London',
      matchesPlayed: {
        wins: 21,
        draws: 6,
        losses: 11
      },
      goals: {
        scored: 49,
        conceded: 33
      }
    },
    {
      name: 'Tottenham',
      country: 'England',
      logo: 'assets/tottenham.png',
      city: 'London',
      matchesPlayed: {
        wins: 19,
        draws: 9,
        losses: 10
      },
      goals: {
        scored: 82,
        conceded: 26
      }
    },
    {
      name: 'Wolverhamton',
      country: 'England',
      logo: 'assets/wolverhampton.png',
      city: 'Wolverhampton',
      matchesPlayed: {
        wins: 22,
        draws: 2,
        losses: 14
      },
      goals: {
        scored: 56,
        conceded: 39
      }
    }
  ];
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
