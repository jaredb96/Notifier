import React, { Component } from "react";
import axios from "axios";

export default class CreateItem extends Component {
  constructor(props) {
    super(props);

    this.onChangeUrl = this.onChangeUrl.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      url: "",
      phoneNumber: "",
    };
  }

  onChangeUrl(newUrl) {
    this.setState({
      url: newUrl.target.value,
    });
  }

  onChangePhoneNumber(newPhoneNumber) {
    this.setState({
      phoneNumber: newPhoneNumber.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const item = {
      url: this.state.url,
      phoneNumber: this.state.phoneNumber,
    };

    console.log(item);
    axios.post('http://localhost:5000/items/add', item)
    .then(res => console.log(res.data));

    window.location = "/success";
  }

  render() {
    return (
      <div style={{textAlign : 'center'}}>
        <h3>Enter Item</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Enter the <b>URL</b> of an item you want to track</label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.url}
              onChange={this.onChangeUrl}
            />
          </div>
          <div className="form-group">
            <label>Enter your <b>phone number</b> so we can text you when it's back in stock: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.phoneNumber}
              onChange={this.onChangePhoneNumber}
            />
          </div>

          <div className="form-group">
              <input type="submit" value="Create Item" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
