import React, { Component } from "react";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { fetchWeather } from "./api/fetchWeather";
import { getUserCity } from "./api/getUserCity";
import Loader from "react-loader-spinner";
import icon from "./img/Weather Icon.png";
import "./style/style.css";

class App extends Component {
  state = {
    query: "",
    fetching: false,
    error: false,
    data: null,
  };

  componentDidMount() {
    this.loadCity();
  }

  loadCity = async () => {
    const city = await getUserCity();
    this.setState({ query: city });
  };

  setQuery = (e) => {
    this.setState((state, props) => {
      return { query: e.target.value };
    });
  };

  HandelSearch = async (e) => {
    e.preventDefault();

    this.setState((state, props) => {
      return { data: null, fetching: true, error: false };
    });

    try {
      const data = await fetchWeather(this.state.query);
      this.setState({ data, fetching: false });
    } catch (error) {
      this.setState((state, props) => {
        return { data: null, fetching: false, error: true };
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="nav-bar">
          <h1>Weather App</h1>
        </div>
        <div className="main-content">
          <div className="search">
            <img alt="" src={icon} />
            <h2>Find the Weather in Your City</h2>
            <p>Enter your city name to find the current weather condtion.</p>
            <form onSubmit={this.HandelSearch} action="/">
              <input
                type="text"
                required
                value={this.state.query}
                onChange={this.setQuery}
                placeholder="New York City"
              />
              <button>Find</button>
            </form>
          </div>
          <div className="days-cards">
            {this.state.data ? (
              <div className="city-card">
                <h2>{this.state.data.name} City</h2>
                <img
                  src={`http://openweathermap.org/img/wn/${this.state.data.weather[0].icon.replace(
                    "n",
                    "d"
                  )}@2x.png`}
                  alt=""
                />
                <p className="description">
                  {this.state.data.weather[0].description}
                </p>
                <p className="temp">
                  {this.state.data.main.temp} <span>°C</span>
                </p>
              </div>
            ) : this.state.fetching ? (
              <Loader type="Rings" color="#ddd" height={100} width={100} />
            ) : this.state.error ? (
              <h2>City not found</h2>
            ) : null}
          </div>
        </div>
        <div className="footer">
          <p>Copyrights © {new Date().getFullYear()}</p>
        </div>
      </div>
    );
  }
}

export default App;
