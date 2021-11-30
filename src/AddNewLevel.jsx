import React, { Component } from 'react';
import "./newLevel.css";


class AddNewLevel extends Component {


    state = {
        question: "",
        src: "",
        answer: "",
        sumItem: false,
        notQuestion: undefined,
        notAnswer: undefined,
        notSrc: undefined
    }



    question = (e) =>{

         let value = e.target.value

         
        
        this.setState({question: value})
        
    }


    src = (e) =>{
        let value = e.target.value
        this.setState({src: value})
    }



    
    answer = (e) =>{
        let value = e.target.value
        this.setState({answer: value})
    }


    





    submit = (e) =>{
        e.preventDefault();

        if(this.state.question == 0){
            this.setState({notQuestion: false})
            return
        }
        else if(this.state.question.length > 0){
            this.setState({notQuestion: true})
            
        }


        if(this.state.src == 0){
            this.setState({notSrc: false})
            return
        }

        else if(this.state.src.length > 0){
            this.setState({notSrc: true})
        
        }


        if(this.state.answer == 0){
            this.setState({notAnswer: false})
            return
        }


        else if(this.state.answer.length > 0){
            this.setState({notAnswer: true})
            
        }



        this.props.add(this.state)




        this.setState({sumItem: true})

        setTimeout(() => {
            this.setState({sumItem: false})
            this.setState({question: ""})
            this.setState({src: ""})
            this.setState({answer: ""})
            
        }, 400);


        this.setState({notQuestion: undefined})
        this.setState({notSrc: undefined})
        this.setState({notAnswer: undefined})


        
        
    }



    addNewItem = () =>{
        this.props.new()
    }
    




    render() { 
        return ( 
            <form onSubmit={this.submit}>

                <div className="question">
                    
                    <input placeholder="Question" onChange={this.question} value={this.state.question}  type="text" />
                    {this.state.notQuestion == false && <div className="wrong"><p>Introdu o intrebare</p><i class="fas fa-times-circle"></i></div>}
                    {this.state.notQuestion == true && <div className="corect"><i class="fas fa-check-circle"></i></div>}
                </div>
                
                


                <div className="question">
                    
                    <input placeholder="Src" onChange={this.src} value={this.state.src}  type="text" />
                    {this.state.notSrc == false && <div className="wrong"><p>Introdu o adresa Url a pozei</p><i class="fas fa-times-circle"></i></div>}
                    {this.state.notSrc == true && <div className="corect"><i class="fas fa-check-circle"></i></div>}
                </div>


                <div className="question"> 
                    <input placeholder="Answer" onChange={this.answer} value={this.state.answer}  type="text" />
                    {this.state.notAnswer == false && <div className="wrong"><p>Introdu un raspuns</p><i class="fas fa-times-circle"></i></div>}
                    {this.state.notAnswer == true && <div className="corect"><i class="fas fa-check-circle"></i></div>}
                </div>

                <div className="btn">
                        <button>{this.state.sumItem ? <i class="fas fa-spinner fa-spin"></i> : "Add"}</button>
                        <button onClick={this.addNewItem}>Close</button>
                </div>
                
            </form>
         );
    }
}
 
export default AddNewLevel;