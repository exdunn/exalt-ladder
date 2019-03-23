import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navigator from "./components/navbar";
import Ladder from "./components/ladder";
import { Container } from "react-bootstrap";
import { PassThrough } from "stream";

class App extends Component {
  state = {
    ladders: [],
    matchingEntries: [],
    leagues: ["Synthesis", "Hardcore Synthesis"],
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
    curLeag: "Synthesis",
    account: "",
    curPage: 1,
    itemsPerPage: 50,
    limit: 200,
    max: 2000,
    name: ""
  };

  componentDidMount() {
    // this.getLeagues();
    this.getDataFromDb();
  }

  componentWillUnmount() {}

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base ladders

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    axios
      .post("http://localhost:3001/api/getData", {
        collectionName: "Synthesis"
      })
      .then(data => data.json())
      .then(result => {
        console.log(result);
        this.setState({ ladders: result });
      });
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post("http://localhost:3001/api/putData", {
      id: idToBeAdded,
      message: message
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete("http://localhost:3001/api/deleteData", {
      data: {
        id: objIdToDelete
      }
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };

  // log some stuff
  logStuff = () => {
    console.log(this.state.data);
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
        this.state.ladders.length - 1,
        this.state.curLeag,
        e.target.value,
        []
      );
    }
  };

  handleLoadMoreClick = () => {
    this.sendAndHandleLaddAPIRequest(
      this.state.limit,
      this.state.ladders.length - 1,
      this.state.curLeag,
      this.state.account,
      this.state.ladders
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
              entries={this.state.ladders}
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
