// For this demo, we are using the UMD build of react-router-dom
const {
  HashRouter,
  Switch,
  Route,
  Link
} = ReactRouterDOM

// A simple data API that will be used to get the data for our
// components. On a real website, a more robust data fetching
// solution would be more appropriate.
const PlayerAPI = {
  players: [
    { number: 1, name: "Murali Vijay", position: "Bat" },
    { number: 2, name: "Dinesh Karthik", position: "Bat" },
    { number: 3, name: "Ravichandran Ashwin", position: "AR" },
    { number: 4, name: "Washington Sundar", position: "AR" },
    { number: 5, name: "Varun Chakravarthy", position: "Bowl" },
    { number: 6, name: "Natarajan", position: "Bowl" }
  ],
  all: function() { return this.players},
  get: function(id) {
    const isPlayer = p => p.number === id
    return this.players.find(isPlayer)
  }
}

// The FullRoster iterates over all of the players and creates
// a link to their profile page.
const FullRoster = () => (
  <div>
    <ul>
      {
        PlayerAPI.all().map(p => (
          <li key={p.number}>
            <Link to={`/Team/${p.number}`}>{p.name}</Link>
          </li>
        ))
      }
    </ul>
  </div>
)

// The Player looks up the player using the number parsed from
// the URL's pathname. If no player is found with the given
// number, then a "player not found" message is displayed.
const Player = (props) => {
  const player = PlayerAPI.get(
    parseInt(props.match.params.number, 10)
  )
  if (!player) {
    return <div>Sorry, but the player was not found</div>
  }
  return (
    <div>
      <h1>{player.name} (#{player.number})</h1>
      <h2>Position: {player.position}</h2>
      <Link to='/Team'>Back</Link>
    </div>
  )
}

// The Roster component matches one of two different routes
// depending on the full pathname
const Team = () => (
  <Switch>
    <Route exact path='/Team' component={FullRoster}/>
    <Route path='/Team/:number' component={Player}/>
  </Switch>
)

const Schedule = () => (
  <div>
    <ul>
      <li>3/8 vs CSK</li>
      <li>6/8 vs MI</li>
      <li>8/8 vs RCB</li>
    </ul>
  </div>
)

const Home = () => (
  <div>
    <h1>Welcome to Cricket Website..!!</h1>
  </div>
)

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/Team' component={Team}/>
      <Route path='/schedule'> {1}</Route>
    </Switch>
  </main>
)

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/Team'>Team</Link></li>
        <li><Link to='/schedule'>Schedule</Link></li>
      </ul>
    </nav>
  </header>
)

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

// This demo uses a HashRouter instead of BrowserRouter
// because there is no server to match URLs
ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById('root'))
