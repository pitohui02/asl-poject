import React, { Component } from 'react';
import axios from 'axios';

//every http method is a template

interface Post {
  id: number;
  title: string;
  body: string;
}

interface State {
  posts: Post[];
  error: string | null;
}

class axDelete extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      posts: [],
      error: null,
    };
  }

  componentDidMount() {
    axios
      .get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        this.setState({ posts: response.data });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  handleDelete(id: number) {
    axios
      .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        const updatedPosts = this.state.posts.filter((post) => post.id !== id);
        this.setState({ posts: updatedPosts });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { posts, error } = this.state;
    return (
      <div>
        <h1>List of Posts</h1>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button onClick={() => this.handleDelete(post.id)}>Delete</button>
          </div>
        ))}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default axDelete;