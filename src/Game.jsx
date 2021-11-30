import React, { Component } from 'react';
import AddNewLevel from './AddNewLevel';
import "./game.css"


class Game extends Component {

    static defaultProps = {
        team:[
            {id:1, question: "Ce echipa antreneaza momentan Jürgen Klopp?", src: "https://bit.ly/3qwJGe1", answer: "LIVERPOOL"}
            
        ]
    }


    state = {
        curentElement: this.props.team[0],
        variantsUser: new Set(),
        continueBtn: 0,
        money: 30,
        hint: false,
        level: false,
        newItem: false,
        win: false
    }


    returnElementCorect = () =>{
        return this.state.curentElement.answer.split("").map(item =>(this.state.variantsUser.has(item) ? item : "_"))
    }



    addElementInState = (value) =>{
       

        this.setState({variantsUser: this.state.variantsUser.add(value)})

        

    }

    renderVariants = () =>{
        return "QWERTYUIOPASDFGHJKLZXCVBNM".split("").map(el =>(<button disabled={this.state.variantsUser.has(el)} value={el} onClick={() =>this.addElementInState(el)} >{el}</button>))
        
    }



    nextBtn = () =>{

        if(this.state.continueBtn == this.props.team.length){
           this.setState({win: true})
           return
        }
        this.setState({continueBtn: this.state.continueBtn + 1})
        this.setState({curentElement: this.props.team[this.state.continueBtn]})
        this.setState({variantsUser: new Set()})
        this.setState({money: this.state.money + 1})
    }



    showletter = () =>{

        let random = Math.floor(Math.random()*this.state.curentElement.answer.length);
        let letter = this.state.curentElement.answer[random];


        if(this.state.money - 15 < 0){
            alert("Nu ai suficienti bani")
            return
        }

        this.setState({variantsUser: this.state.variantsUser.add(letter)})

        

        this.setState({money: this.state.money - 15})
        this.setState({hint: false})
    }




    showAnswer = () =>{
        let answer = this.state.curentElement.answer

        if(this.state.money - 30 < 0){
            alert("Nu ai suficienti bani")
         return
        }

        this.setState({variantsUser: this.state.variantsUser.add(answer)})

        


        this.setState({money: this.state.money - 30})
        this.setState({hint: false})
        this.setState({continueBtn: this.state.continueBtn +1})
    }



    hint = () =>{
        this.setState({hint: true})
    }


    close = () =>{
        this.setState({hint: false})
    }


    level = () =>{
        this.setState({level:true})
    }


    closeBtnLevel = () =>{
        this.setState({level:false})
    }




    addNewItems = (item) =>{

       const itemNew = {
           id: this.props.team[this.props.team.length - 1].id + 1,
           ...item
       }

       this.props.team.push(itemNew)

    }



    newBtnItem = () =>{
        this.setState({newItem: !this.state.newItem})
    }


    btnWin = () =>{
        this.setState({win: false})
        this.setState({newItem: !this.state.newItem})
    }




    render() { 

        let variantsHint = <div className="btn_hint">
                               <button onClick={this.hint}>Use a hint</button>
                               <p>{this.renderVariants()}</p>
                          </div>

            if(this.state.variantsUser.has(this.state.curentElement.answer)){
                variantsHint =  <div className="win_level">
                                    <div className="levels_wins">
                                        <img src={this.state.curentElement.src}/>
                                        <p>1 <i class="fas fa-coins"></i></p>
                                        <button onClick={this.nextBtn}>Continue</button>
                                    </div>
                                </div>
            }

            else if(this.state.curentElement.answer === this.returnElementCorect().join("")){
                variantsHint = <div className="win_level">
                                    <div className="levels_wins">
                                        <img src={this.state.curentElement.src}/>
                                        <p>1 <i class="fas fa-coins"></i></p>
                                        <button onClick={this.nextBtn}>Continue</button>
                                    </div>
                                </div>
            }


        return ( 
            <div className="game_footbal"> 
                
                <div className="level_coins">
                    <button>You have {this.state.money} <i class="fas fa-coins"></i></button>
                    <button onClick={this.level}>Level: {this.state.curentElement.id}</button>
                </div>


                 
                  {
                      this.state.level && <div className="level">
                          
                                              <div className="back_level">
                                                <h4>Levels</h4>
                                                <button  onClick={this.closeBtnLevel}><i class="fas fa-arrow-left"></i></button>
                                              </div>

                                            <div className="levels">
                                                
                                                {this.props.team.map(el => (this.state.curentElement.id > el.id) ? <div className="img"><img src={el.src}/><p>{el.id}</p></div> : <div><p>{el.id}</p></div>)}
                                                
                                            </div>
                                            
                                            

                                          </div>
                  }




                
                


                <div className="curent_question">
                    <h2>{this.state.curentElement.question}</h2>
                    {this.state.variantsUser.has(this.state.curentElement.answer) ? <p className="answer_first">{this.state.curentElement.answer}</p> : <p className="return_answer">{this.returnElementCorect()}</p>}
                    {variantsHint}
                </div>



            

                {
                    this.state.hint && <div className="hint">
                                          
                                          <div className="hint_coin">
                                              
                                              <div className="back_hint">
                                                <h4>Hint</h4>
                                                <button onClick={this.close}><i class="fas fa-arrow-left"></i></button>
                                              </div>

                                            <div onClick={this.showletter} className="expose_letter">
                                                <h5>Expose a letter</h5>
                                                <span>15 <i class="fas fa-coins"></i></span>
                                            </div>

                                            <div onClick={this.showAnswer} className="solve_question">
                                                <h5>Solve question</h5>
                                                <span>30 <i class="fas fa-coins"></i></span>
                                            </div>

                                            

                                          </div>
                                       </div>
                }


               

                


              




               {
                   this.state.win && <div className="win" >
                                       <div className="btn_felitari">
                                            <h3>Felictari ai castigat</h3>
                                            <button onClick={this.newBtnItem}>Add new levels</button>
                                       </div>
                                    </div>
               }



                 {
                       this.state.newItem &&  <div className="win-1" >
                                                 <div className="btn_felitari">
                                                    <AddNewLevel new={this.btnWin} add={this.addNewItems}/>
                                                    
                                                 </div>
                                                 

                                              </div>
                   }

               

            

            </div>
         );
    }
}
 
export default Game;