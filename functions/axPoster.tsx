import React, { Component } from 'react'
import axios from 'axios'
//every http method is a template

interface Post{
    userId: number;
    id: number;
    title: string;
    body: string;
    }


class axPost extends React.Component<{},Post >{
    constructor (props: {}){
        super(props)
            
        this.state = {
            userId: 0,
            id:0,
            title: '',
            body: ''
     }
    }

    changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        this.setState((prevState: Post) => ({
          ...prevState,
          [name]: value,
        } as Pick<Post, keyof Post>));
    }
    
    
      submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(this.state)
        axios.post('https://jsonplaceholder.typicode.com/posts', this.state)
          .then(response => {
            console.log(response)
          })
          .catch(error => {
            console.log(error)
          })
      }
        
    render(){
        const { userId, title,  body} =this.state
        return (
            <div>
                <form onSubmit = {this.submitHandler}>
                    <div>
                        <input
                         type ="text"
                         name ="userId" 
                         value ={userId} 
                         onChange ={this.changeHandler}
                         />
                    </div>
                    <div>
                        <input 
                         type ="text"
                         name ="title" 
                         value ={title} 
                         onChange ={this.changeHandler}
                         />
                    </div>
                    <div>
                        <input 
                        type ="text" 
                        name ="body" 
                        value ={body} 
                        onChange ={this.changeHandler}
                        />
                    </div>
                    <button type = "submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default axPost