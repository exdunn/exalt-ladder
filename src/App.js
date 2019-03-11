import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navigator from "./components/navbar";
import Ladder from "./components/ladder";
import { Container } from "react-bootstrap";
import { PassThrough } from "stream";

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
    curLeag: "Select",
    curPage: 1,
    itemsPerPage: 20,
    limit: 200,
    max: 2000,
    name: ""
  };

  componentDidMount() {
    this.getLeagues();
  }

  sendLadderAPIRequest = (limit, offset, league) => {
    if (offset >= this.state.max) {
      console.log("Max entries reached.");
      return;
    }

    const url =
      "http://api.pathofexile.com/ladders/" +
      league +
      "?offset=" +
      offset +
      "&limit=" +
      limit;
    console.log("Sending API call:", url);
    return axios.get(url);
  };

  handlePageClick = index => {
    if (index * this.state.itemsPerPage > this.state.entries.length) {
      try {
        const entries = [];
        this.sendLadderAPIRequest(this.state.limit, 0, this.state.curLeag).then(
          response => {
            console.log(response);
            for (const entry of response.data.entries) {
              entries.push({
                id: entry.character.id,
                character: entry.character,
                account: entry.account
              });
            }
            this.setState({ entries });
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
    this.setState({ curPage: index });
  };

  handleLeagueClick = league => {
    if (this.state.curLeag === league) {
      return;
    }
    this.setState({ curLeag: league });

    try {
      const entries = [];
      this.sendLadderAPIRequest(this.state.limit, 0, league).then(response => {
        console.log(response);
        for (const entry of response.data.entries) {
          entries.push({
            id: entry.character.id,
            character: entry.character,
            account: entry.account
          });
        }
        this.setState({ entries });
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

  handleLoadMoreClick = () => {
    console.log("Load More Clicked!");
  };

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
              onLoadMoreClick={this.handleLoadMoreClick}
            />

            <Ladder
              ascendancy={this.state.curAscd}
              entries={this.state.entries}
              curPage={this.state.curPage}
              itemsPerPage={this.state.itemsPerPage}
              league={this.state.curLeag}
              onPageClick={this.handlePageClick}
            />
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
