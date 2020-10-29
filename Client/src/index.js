import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

class URLForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            errorMessage: ''
          };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({url: event.target.value});
        }
    
    handleSubmit(event) {
        event.preventDefault();

        // Check if URL is valid
        if(!validURL(this.state.url))
        {
            return this.setState({errorMessage: 'Please enter a valid url!'})
        }

        // Create form data to send
        const data = new FormData();
        data.append('url', this.state.url);

        // Send new url to database
        axios.post(`http://localhost:3001/urls`, data)
        .then(res => {
            // check response codes
            if(res.status === 200) {
                this.setState({url: ''})
                this.setState({errorMessage: ''})
            } else {
                this.setState({errorMessage: 'Error: Please try again'})
            }
        })
        
    }

    render() {
        return (
            <div>
            <div className="flex-container">
            <div className="flex-header">
                <h1>URLs</h1>
            </div>
            </div>
            <div className="flex-container">
            <div className="flex-box">
                <form onSubmit={this.handleSubmit}>
                    <input type="url" className="form-control" id="url" 
                        onChange={this.handleChange} value={this.state.url} required/> 
                    <div className="errorMessage" id="response">{this.state.errorMessage}</div>
                    
                    <button type="submit">Create URL</button>
                </form>
            
            </div>
            </div>
            </div>
        );
    }
}

class ListOfUrls extends React.Component {

    render() {
        return (
            <div>
            <br></br>
            <center>
            <div className="grid-container">
            <div className="grid-item"><b>Original URL</b></div>
            <div className="grid-item"><b>Tiny URL</b></div>
            <div className="grid-item"><b>Hit Count</b></div>  
            <div className="grid-item">4</div>
            <div className="grid-item">5</div>
            <div className="grid-item">6</div>  
            <div className="grid-item">7</div>
            <div className="grid-item">8</div>
            <div className="grid-item">9</div>  
            </div>
            </center>
            </div>
        );
    }
}

class Page extends React.Component {

    render() {
        return (
            <div>
            <URLForm />
            <ListOfUrls />
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
  );
