import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';

import { Button } from 'react-bootstrap';

import '../TopicPage.css'

class LikeButtonStream extends Component {
  constructor(props) {
    super(props);

    this.state = {
        likedStream: false,
        count: 0
    };
  }

  componentDidMount = () => {
    if (this.props.id) {
      this.getStreamLikes(this.props.id);
      // console.log('componentDidMount, this.props.id', this.props.id);
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.id === !nextProps.id) {
      this.getStreamLikes(nextProps.id);
      console.log('nextProps', nextProps.id);
      console.log('this.props', nextProps.id);
    }
  }

  getStreamLikes = (id) => {
    axios.get(`/api/likes/get/stream/${id}`)
      .then((response) => {
        // console.log('here is response from axios.get', response.data);
        if (!response.data[0]) {
          this.setState({
              count: 0
          })
        } else {
          this.setState({
              count: response.data[0].count
          })
        }
        // console.log('this is state.count', this.state.count);
      }).catch((err) => {
          console.log(err)
      });
  }

    likeStream = (id) => {

        this.setState({
            likedStream: !this.state.likedStream
        }, () => {

            let likeToPut = {
                columnName: 'stream_id'
            };
            axios.put(`/api/likes/increment/${id}`, likeToPut)
                .then((response) => {
                    this.getStreamLikes(this.props.id);
                    console.log('this is state.count', this.state.count);
                }).catch((err) => {
                    console.log(err)
                });
        })
    }

    unlikeStream = (id) => {
        this.setState({
            likedStream: !this.state.likedStream
        }, () => {

            let likeToPut = {
                columnName: 'stream_id'
            };
            axios.put(`/api/likes/decrement/${id}`, likeToPut)
                .then((response) => {
                    this.getStreamLikes(this.props.id);
                    console.log('this is state.count', this.state.count);
                }).catch((err) => {
                    console.log(err)
                });
        })
    }

  render() {
    if (this.props.user.userInfo) {
      return (
        <span>
          { !this.state.likedStream ? 
            <Button 
              className="keyClaimFooterItem" 
              variant="light"
              onClick={() => this.likeStream(this.props.id)} >

              <i className="fa fa-thumbs-up" /> &nbsp;
              {this.state.count}
              </Button> : 
              <Button 
                className="keyClaimFooterItem" 
                variant="light"
                onClick={() => this.unlikeStream(this.props.id)} >
                <i className="fa fa-thumbs-up" /> &nbsp;
                {this.state.count}
              </Button>}
          </span>
      );
    } else {
      return (
        <span>
          <Button 
            disabled 
            variant="light"
            onClick={() => this.likeKeyClaim(this.props.id)} >
            <i className="fa fa-thumbs-up" /> &nbsp;
              {this.state.count}
          </Button>
        </span>
      );
    }
  }
}

const mapStateToProps = state => ({
    user: state.user,
});


export default connect(mapStateToProps)(LikeButtonStream);




