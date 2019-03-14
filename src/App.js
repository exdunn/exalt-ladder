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
    account: "",
    curPage: 1,
    itemsPerPage: 50,
    limit: 200,
    max: 2000,
    name: ""
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

  sendLadderAPIRequest = (limit, offset, league, account) => {
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
      limit +
      (account ? "&accountName=" + account : "");
    console.log("Sending API call:", url);
    return axios.get(url);
  };

  // sends ladder API request and adds response to state.entries
  sendAndHandleLaddAPIRequest = (limit, offset, league, account, entries) => {
    try {
      this.sendLadderAPIRequest(limit, offset, league, account).then(
        response => {
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
  };

  handlePageClick = index => {
    this.setState({ curPage: index });
  };

  handlePrevClick = () => {
    if (this.state.curPage > 1) {
      this.setState({ curPage: this.state.curPage - 1 });
    }
  };

  handleNextClick = pageCount => {
    if (this.state.curPage < pageCount) {
      this.setState({ curPage: this.state.curPage + 1 });
    }
  };

  handleLeagueClick = league => {
    if (this.state.curLeag === league) {
      return;
    }
    this.setState({ curLeag: league });
    this.setState({ account: "" });
    this.sendAndHandleLaddAPIRequest(this.state.limit, 0, league, "", []);
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

  handleAccountChange = e => {
    this.setState({ account: e.target.value });
  };

  handleAccountEnterPress = e => {
    if (e.key === "Enter" && e.target.value) {
      e.preventDefault();
      this.sendAndHandleLaddAPIRequest(
        this.state.limit,
        this.state.entries.length - 1,
        this.state.curLeag,
        e.target.value,
        []
      );
    }
  };

  handleLoadMoreClick = () => {
    this.sendAndHandleLaddAPIRequest(
      this.state.limit,
      this.state.entries.length - 1,
      this.state.curLeag,
      this.state.account,
      this.state.entries
    );
  };

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
              account={this.state.account}
              onLeagueClick={this.handleLeagueClick}
              onAscdClick={this.handleAscdClick}
              onAccountChange={this.handleAccountChange}
              onNameEnterPress={this.handleAccountEnterPress}
              onLoadMoreClick={this.handleLoadMoreClick}
            />
            <Ladder
              ascendancy={this.state.curAscd}
              entries={this.state.entries}
              curPage={this.state.curPage}
              itemsPerPage={this.state.itemsPerPage}
              league={this.state.curLeag}
              onPageClick={this.handlePageClick}
              onPrevClick={this.handlePrevClick}
              onNextClick={this.handleNextClick}
            />
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
