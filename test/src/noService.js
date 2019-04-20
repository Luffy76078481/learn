
import React, { Component } from 'react';
import { render } from 'react-dom'
import{config} from "globalConfig"

// import ServicePage from "./global/otherPages/servicePage/NoServicePage"
// import "./global/otherPages/servicePage/NoServicePage.scss";
 
class NoServicePage extends Component {
    componentDidMount(){
        if(!config.webSiteTag){
            location.href="/NoservicePage-other.html";
            return
        }
          document.body 
    }
    render() {
        return (
            <div>
                {/*<ServicePage/>*/}
                <p style={{ fontSize:'2rem', textAlign:"center",fontWeight: 'bold',margin:'.67rem'}}>403 Forbidden</p>
                <hr/>
                <center>nginx</center>
                {/* <p style={{ fontSize:'2.5rem', textAlign:"left",margin:'1.5rem'}}>You don't have permission to access / on this server！</p>
                <p style={{ fontSize:'2rem', textAlign:"left",margin:'1.5rem'}}> Your IP details : {sessionStorage.getItem("serIP")}</p> */}
            </div>
        )
    }
}

render(<NoServicePage/>, document.getElementById('root'));
