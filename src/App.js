import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navigator from "./components/navbar";
import Ladder from "./components/ladder";
import { Container } from "react-bootstrap";

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
    curPage: 0,
    itemsPerPage: 20,
    limit: 200,
    max: 1000,
    ascdendancy: "",
    name: ""
  };

  handlePageClick = index => {
    this.setState({ curPage: index });
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
    this.handleAPIRequest();
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

  handleAPIRequest() {
    if (this.state.entries.length < this.state.max) {
      for (let i = 0; i < 5; i++) {
        try {
          let url =
            "http://api.pathofexile.com/ladders/Betrayal?offset=" +
            i * 200 +
            "&" +
            "limit=" +
            this.state.limit;

          console.log("Sending API call:", url);
          axios
            .get(url)
            .then(response => {
              const data = response.data;
              const entries = this.state.entries;
              for (const [j, entry] of data.entries.entries()) {
                entries.push({
                  id: j + i * 200,
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
              limit={this.state.limit}
              max={this.state.entries.length}
              itemsPerPage={this.state.itemsPerPage}
              entries={this.state.entries.slice(
                this.state.curPage * this.state.itemsPerPage,
                this.state.curPage * this.state.itemsPerPage + 20
              )}
              curPage={this.state.curPage}
              onPageClick={this.handlePageClick}
            />
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
