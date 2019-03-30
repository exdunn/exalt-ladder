import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Navigator from "./components/navbar";
import Ladder from "./components/ladder";
import { Container } from "react-bootstrap";

class App extends Component {
  state = {
    leagues: {},
    matchingEntries: [],
    leagueNames: [
      "Synthesis",
      "Hardcore Synthesis",
      "SSF Synthesis",
      "SSF Synthesis HC"
    ],
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
    targetClass: "All",
    targetLeague: "",
    targetName: "",
    curPage: 1,
    itemsPerPage: 25,
    limit: 200,
    max: 2000,
    name: ""
  };

  constructor(props) {
    super(props);
    this.state.leagues[this.state.targetLeague] = [];
  }

  componentDidMount() {
    this.getDataFromDb();
  }

  componentWillUnmount() {}

  // fetch data from exaltDB
  getDataFromDb = () => {
    for (const name of this.state.leagueNames) {
      axios
        .get("http://localhost:3001/api/getData", {
          params: {
            colName: name
          }
        })
        .then(res => {
          const data = res.data.data;
          const leagues = this.state.leagues;
          leagues[name] = data;
          this.setState({ leagues: leagues });
        });
    }
  };

  // our put method that uses our backend api
  // TODO
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
  // TODO
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
  // TODO
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
    if (this.state.targetLeague === league) {
      return;
    }
    this.setState({ targetLeague: league });
    this.setState({ targetName: "" });
  };

  handleAscendancyClick = ascd => {
    const targetClass = ascd;
    this.setState({ targetClass });
  };

  handleAscendancyEnterPress = e => {
    if (e.key === "Enter" && e.target.value) {
      this.setState({ ascdendancy: e.target.value });
    }
  };

  // handles account search field changes
  onNameSearchChange = e => {
    this.setState({ targetName: e.target.value });
  };

  // handles account search field enter press
  handleNameSearchEnterPress = e => {
    if (e.key === "Enter" && e.target.value) {
      e.preventDefault();
    }
  };

  render() {
    return (
      <React.Fragment>
        <main>
          <Container>
            <Navigator
              leagueNames={this.state.leagueNames}
              ascendancies={this.state.ascendancies}
              targetClass={this.state.targetClass}
              targetLeague={this.state.targetLeague}
              name={this.state.targetName}
              onLeagueClick={this.handleLeagueClick}
              onAscendancyClick={this.handleAscendancyClick}
              onNameSearchChange={this.onNameSearchChange}
              onNameSearchEnterPress={this.handleNameSearchEnterPress}
            />
            <Ladder
              ascendancy={this.state.targetClass}
              entries={this.state.leagues[this.state.targetLeague]}
              curPage={this.state.curPage}
              itemsPerPage={this.state.itemsPerPage}
              league={this.state.targetLeague}
              name={this.state.targetName}
              onPageClick={this.handlePageClick}
              onPrevClick={this.handlePrevClick}
              onNextClick={this.handleNextClick}
              onAscendancyClick={this.handleAscendancyClick}
            />
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
