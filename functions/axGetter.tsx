import React, { Component } from 'react'
import axios from 'axios'
//every http method is a template


interface printer{
posts: Post[];
errorMsg: string;
}

interface Post{
    id: number;
    title: string;
    body: string;

} 


class AxGetter extends React.Component<{},printer>{
    constructor(props: printer) {
        super(props)

        this.state = {
            posts: [],
            errorMsg: '',
        };
    }

    componentDidMount(){
        //get method 
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                console.log(response)
                this.setState({posts: response.data})
            })
            .catch(error => {
                console .log(error)
                this.setState({errorMsg: 'Error retrieving data'})
            })
    }
    render(){
        const {posts, errorMsg} = this.state
        return (
            <div>
                List of posts
                {
                    posts.length ?
                    posts.map(post => <div key={post.id}>{post.title}</div>):
                    null
                }
                {errorMsg ? <div> {errorMsg} </div> : null}
            </div>
        )
    }
    
}

export default AxGetter