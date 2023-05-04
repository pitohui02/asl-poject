import React, { Component } from 'react';
import axios from 'axios';

//every http method is a template

interface PrinterProps {}

interface PrinterState {
  posts: Post[];
  errorMsg: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

class axPatcher extends Component<PrinterProps, PrinterState> {
  constructor(props: PrinterProps) {
    super(props);

    this.state = {
      posts: [],
      errorMsg: '',
    };
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        console.log(response);
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: 'Error retrieving data' });
      });
  };

  updatePost = (postId: number, newPost: Post) => {
    axios
      .patch(`https://jsonplaceholder.typicode.com/posts/${postId}`, newPost)
      .then((response) => {
        console.log(response);
        const updatedPosts = this.state.posts.map((post) =>
          post.id === postId ? newPost : post
        );
        this.setState({ posts: updatedPosts });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ errorMsg: 'Error updating data' });
      });
  };

  render() {
    const { posts, errorMsg } = this.state;

    return (
      <div>
        <h2>List of Posts</h2>
        {posts.length ? (
          <div>
            {posts.map((post) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <button onClick={() => this.updatePost(post.id, post)}>
                  Update Post
                </button>
              </div>
            ))}
          </div>
        ) : null}
        {errorMsg ? <div>{errorMsg}</div> : null}
      </div>
    );
  }
}

export default axPatcher;
