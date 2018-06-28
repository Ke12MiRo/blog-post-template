import React, { Component } from "react";
import "./App.css";
import LazyHero from "react-lazy-hero";
import zupage from "zupage";
import { Container, Embed } from "semantic-ui-react";
import Slider from "react-slick";

class App extends Component {
  state = {
    post: {
      slideItem: [],
      body: "",
      images: [],
      creator: { name: "" },
      page: { name: "", description: "" }
    }
  };

  async componentDidMount() {
    const response = await zupage.getCurrentPost();
    this.setState({ post: response });
  }

  bannerImageURL = () => {
    if (this.state.post.images.length > 0) {
      const { images } = this.state.post;
      if (images[0]) {
        return images[0].url;
      }
      return "";
    } else {
      const { page } = this.state.post;
      if (page) {
        return page.hero_image_url;
      }
    }
  };

  renderParagraphs = () => {
    return (
      <div>
        {this.state.post.body.split("\n").map((string, index) => {
          return <div key={index}>{string}</div>;
        })}
      </div>
    );
  };

  renderSliderItems = () => {
    return this.state.post.images.map(function(image) {
      return (
        <div>
          <img
            className="Slider-image Slider-image-backgroundimage"
            src={image.url}
            alt="Smiley face"
          />
          <img className="Slider-image" src={image.url} alt="Smiley face" />
        </div>
      );
    });
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    return (
      <div className="banner">
        <Slider>{this.renderSliderItems()}</Slider>
        <Container text>
          <h1> {this.state.post.title} </h1>
          <h4>{this.state.post.description}</h4>
          <h2 className="ui header">
            <img
              src={this.state.post.creator.profile_image_url}
              className="ui circular image"
              alt=""
            />
            {this.state.post.creator.name}
          </h2>

          {this.renderParagraphs()}
        </Container>
      </div>
    );
  }
}

export default App;
