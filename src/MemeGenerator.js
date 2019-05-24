import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor(){
        super()
        this.state = {
            topText : "",
            bottomText : "",
            randomImg : "https://i.imgflip.com/1bij.jpg",
            allImgs : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch(" https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const data = response.data.memes
                this.setState({
                    allImgs : data
                })
            })
    }

    handleChange(e){
        const {name, value} = e.target
        this.setState({
            [name] : value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        const r = Math.floor(Math.random() * this.state.allImgs.length)
        const meme = this.state.allImgs[r].url
        this.setState({
            randomImg : meme
        })
    }

    render(){
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="topText" value={this.state.topText} 
                    onChange={this.handleChange} placeholder="Top Text" />
                    <input type="text" name="bottomText" value={this.state.bottomText} 
                    onChange={this.handleChange} placeholder="Bottom Text" />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <h2 className="top">{this.state.topText}</h2>
                    <img src={this.state.randomImg} alt="random meme"/>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator