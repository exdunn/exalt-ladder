import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navigator from "./components/navbar";
import Ladder from "./components/ladder";

class App extends Component {
  state = {
    entries: [],
    leagues: [],
    ascendancies: [
      "All",
      "Maurader",
      "Duelist",
      "Ranger",
      "Shadow",
      "Witch",
      "Templar",
      "Scion",
      "Juggernaut",
      "Berserker",
      "Chieftain",
      "Slayer",
      "Gladiator",
      "Champion",
      "Deadeye",
      "Raider",
      "Pathfinder",
      "Assassin",
      "Saboteur",
      "Trickster",
      "Necromancer",
      "Occultist",
      "Elementalist",
      "Inquisitor",
      "Hierophant",
      "Guardian",
      "Ascendant"
    ],
    curAscd: "All",
    curLeag: "Standard",
    limit: 5,
    ascdendancy: "",
    name: ""
  };

  handleLeagueClick = league => {
    const curLeag = league;
    this.setState({ curLeag });
  };

  handleAscdClick = ascd => {
    const curAscd = ascd;
    this.setState({ curAscd });
  };

  handleAscendancyEnterPress = e => {
    if (e.key == "Enter" && e.target.value) {
      this.setState({ ascdendancy: e.target.value });
    }
  };

  handleNameEnterPress = e => {
    if (e.key == "Enter" && e.target.value) {
      this.setState({ name: e.target.value });
    }
  };

  componentDidMount() {
    this.getLeagues();
    this.handleAPIRequest(5);
  }

  // set API request to get JSON data containing list of league information
  getLeagues() {
    const url = "http://api.pathofexile.com/leagues";
    try {
      console.log("Sending API call:", url);
      const leagues = [];
      axios.get(url).then(response => {
        const today = new Date();
        for (const entry of response.data) {
          const date = new Date(entry.endAt);
          if (isNaN(Date.parse(entry.endAt)) || date > today) {
            leagues.push(entry);
          }
        }
        this.setState({ leagues });
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleAPIRequest(limit) {
    const url =
      "http://api.pathofexile.com/ladders/Betrayal?offset=1&limit=" + limit;
    try {
      console.log("Sending API call:", url);
      axios.get(url).then(response => {
        const data = response.data;
        const entries = [];
        for (const [i, entry] of data.entries.entries()) {
          entries.push({
            id: i,
            char: entry.character,
            account: entry.account
          });
        }
        this.setState({ entries });
      });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navigator
          leagues={this.state.leagues}
          ascendancies={this.state.ascendancies}
          curAscd={this.state.curAscd}
          curLeag={this.state.curLeag}
          onLeagueClick={this.handleLeagueClick}
          onAscdClick={this.handleAscdClick}
          onNameEnterPress={this.handleNameEnterPress}
        />

        <main className="container">
          <Ladder entries={this.state.entries} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
