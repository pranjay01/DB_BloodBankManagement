//SJSU CMPE 138 Spring2020 TEAM7
import React, { Component } from "react";
import { updateEvent, getParticularEventInfo } from "./action";
import { connect } from "react-redux";
import { history } from "../../Routes";
class UpdateEvent extends Component {
  state = {
    data: {
      Name: "",
      Date_of_event: "",
      Venue: "",
      Operator_id: "",
      Drive_id: "",
    },
  };

  componentDidMount() {
    const { Drive_id } = this.props.match.params;
    const { allEvents } = this.props;
    this.props.getParticularEventInfo(Drive_id, (data) => {
      this.setState({ data });
    });
    // this.setState({ data: allEvents.filter((i) => i.Drive_id == Drive_id)[0] });
  }
  handleChange = (e) => {
    const key = e.target.name;
    let { data } = this.state;
    data[key] = e.target.value;
    this.setState({ data });
  };
  update = (e) => {
    e.preventDefault();
    let { data } = this.state;
    data.Operator_id = this.props.Operator_id;

    const { Name, Date_of_event, Venue, Operator_id, Drive_id } = data;
    if (Name && Date_of_event && Venue && Operator_id && Drive_id) {
      this.props.updateEvent(data, () => {
        history.push("/EventList");
      });
    } else {
      alert("Please enter valid data");
    }
  };
  render() {
    const { Name, Date_of_event, Venue } = this.state.data;
    return (
      <div className="card" style={{ textAlign: "left", padding: "10px" }}>
        <h4 style={{ textAlign: "left", paddingLeft: "10px" }}>Update Event</h4>
        <form onSubmit={this.update}>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Event Name : </label>
            <input
              type="text"
              name="Name"
              value={Name}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Date : </label>
            <input
              type="date"
              name="Date_of_event"
              value={Date_of_event}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <label>Venue : </label>
            <input
              type="text"
              name="Venue"
              value={Venue}
              onChange={this.handleChange}
            />
          </div>
          <div style={{ margin: "10px", display: "inline-block" }}>
            <button type="submit" className="commonbtn">
              Update
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Operator_id: state.auth.loginData.Operator_id,
    allEvents: state.app.allEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEvent: (data, callback) => {
      dispatch(updateEvent(data, callback));
    },
    getParticularEventInfo: (Drive_id, callback) => {
      dispatch(getParticularEventInfo(Drive_id, callback));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent);
