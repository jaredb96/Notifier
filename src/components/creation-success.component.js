import React, { Component } from "react";

export default class CreateItem extends Component {

  render() {
    return (
      <div style={{textAlign : 'center'}}>
        <h3>Success!</h3>
        <form action="/">
          <div className="div">
            <p>
              Congrats! Your item is now being scraped by our internal web
              scraper
            </p>
          </div>
          <div className="form-group">
              <input type="submit" value="Return to Home" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
}
