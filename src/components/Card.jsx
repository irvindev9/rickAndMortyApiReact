import { Component } from "react";

class Card extends Component {
  render() {
    const { character } = this.props;
    if (character) {
      const { image, name, gender, species, url } = character;
      return (
        <div className="card my-3" style={{"width": "18rem"}}>
          <img  className="card-img-top" src={image} alt="" />
            <div className="card-body">
            <h5 className="card-title">{name}</h5>
              <p className="card-text">
                Gender: {gender}<br/>
                Specie: {species}
              </p>
              <a href={url} className="btn btn-primary">View more</a>
            </div>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default Card;