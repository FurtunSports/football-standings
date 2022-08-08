(function() {
  // DOM has been loaded
  const teams = [
    {
      name: 'Arsenal',
      country: 'England',
      logo: 'assets/arsenal-logo.png',
      city: 'London'
    },
    {
      name: 'Manchester City',
      country: 'England',
      logo: 'assets/manchester-city.png',
      city: 'Manchester'
    },
    {
      name: 'Liverpool',
      country: 'England',
      logo: 'assets/liverpool.png',
      city: 'Liverpool'
    },
    {
      name: 'Manchester United',
      country: 'England',
      logo: 'assets/manchester-united.png',
      city: 'Manchester'
    },
    {
      name: 'Chelsea',
      country: 'England',
      logo: 'assets/chealsea.png',
      city: 'London'
    },
    {
      name: 'Tottenham',
      country: 'England',
      logo: 'assets/tottenham.png',
      city: 'London'
    },
    {
      name: 'Wolverhamton',
      country: 'England',
      logo: 'assets/wolverhampton.png',
      city: 'Wolverhampton'
    }
  ];
  console.log(teams);

  for(let i = 0; i < 7; i++) {
    console.log(i);
    if (i === 3) {
      continue;
    }
    buildTeamElements(teams[i].name, teams[i].logo, teams[i].city);
    console.log('building the ' + (i + 1) + 'th team');
  }
})();

function buildTeamElements(name, logoSrc, city) {
  const teamWrapper = buildDiv('team-wrapper');
  document.getElementById('standings').appendChild(teamWrapper);

  const teamImageDiv = buildDiv('team-image');
  teamWrapper.appendChild(teamImageDiv);
  
  const teamImage = buildImage(logoSrc);
  teamImageDiv.appendChild(teamImage);

  const teamName = buildParagraph(name);
  teamWrapper.appendChild(teamName);

  const teamCity = buildSpan(city);
  teamWrapper.appendChild(teamCity);
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

function buildParagraph(teamName) {
  const paragraph = document.createElement('p');
  paragraph.className = 'team-name';
  paragraph.innerHTML = teamName;
  return paragraph;
}

function buildTeam(team, index) {
  document.getElementsByClassName('logo')[index].src = team.logo;
  document.getElementsByClassName('team-name')[index].innerHTML = team.name;
  document.getElementsByClassName('team-city')[index].innerHTML = team.city;
}