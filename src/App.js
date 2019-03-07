import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navigator from "./components/navbar";
import Ladder from "./components/ladder";
import { Container } from "react-bootstrap";

class App extends Component {
  state = {
    entries: [],
    matchingEntries: [],
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
    curPage: 0,
    itemsPerPage: 20,
    limit: 200,
    name: ""
  };

  handlePageClick = index => {
    this.setState({ curPage: index });

    if ((index + 1) * this.state.itemsPerPage >= this.state.entries.length) {
      const entries = this.state.entries;
      let url =
        "http://api.pathofexile.com/ladders/Betrayal?offset=" +
        this.state.entries.length +
        "&" +
        "limit=" +
        this.state.limit;
      console.log("Sending API call:", url);
      try {
        axios
          .get(url)
          .then(response => {
            const data = response.data;
            for (const entry of data.entries) {
              entries.push({
                id: entry.rank,
                char: entry.character,
                account: entry.account
              });
            }
            this.setState({ entries });
          })
          .catch(e => {
            console.error("Error caught sending API call", url, e);
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  handleLeagueClick = league => {
    if (this.state.curLeag === league) {
      return;
    }

    const curLeag = league;
    this.setState({ curLeag });
    const entries = [];

    try {
      let url =
        "http://api.pathofexile.com/ladders/Betrayal?offset=" +
        this.state.entries.length +
        "&" +
        "limit=" +
        this.state.limit;

      console.log("Sending API call:", url);
      axios
        .get(url)
        .then(response => {
          const data = response.data;
          for (const entry of data.entries) {
            entries.push({
              id: entry.rank,
              character: entry.character,
              account: entry.account
            });
          }
          this.setState({ entries });
        })
        .catch(e => {
          console.error("Error caught sending API call", url, e);
        });
    } catch (e) {
      console.log(e);
    }
  };

  handleAscdClick = ascd => {
    const curAscd = ascd;
    this.setState({ curAscd });
  };

  handleAscendancyEnterPress = e => {
    if (e.key === "Enter" && e.target.value) {
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
  }

  // set API request to get JSON data containing list of league information
  getLeagues() {
    const url = "http://api.pathofexile.com/leagues";
    try {
      console.log("Sending API call:", url);
      const leagues = [];
      axios
        .get(url)
        .then(response => {
          const today = new Date();
          for (const entry of response.data) {
            const date = new Date(entry.endAt);
            if (isNaN(Date.parse(entry.endAt)) || date > today) {
              leagues.push(entry);
            }
          }
          this.setState({ leagues });
        })
        .catch(e => {
          console.error("Error caught sending API call", url, e);
        });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <React.Fragment>
        <main>
          <Container>
            <Navigator
              leagues={this.state.leagues}
              ascendancies={this.state.ascendancies}
              curAscd={this.state.curAscd}
              curLeag={this.state.curLeag}
              onLeagueClick={this.handleLeagueClick}
              onAscdClick={this.handleAscdClick}
              onNameEnterPress={this.handleNameEnterPress}
            />

            <Ladder
              ascendancy={this.state.curAscd}
              entries={this.state.entries}
              curPage={this.state.curPage}
              itemsPerPage={this.state.itemsPerPage}
              onPageClick={this.handlePageClick}
            />
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
