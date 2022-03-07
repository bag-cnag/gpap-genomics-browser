

import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./igv-page/home.css"
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";



class Home extends Component{

    constructor(props){
        super(props);

        this.state={
            experimentID:undefined,
            chromosome:1,
            locus: undefined
        };


        this.handleChange_Experiment = this.handleChange_Experiment.bind(this);
        this.chromosomeHandle = this.chromosomeHandle.bind(this);
        this.locusHandle = this.locusHandle.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }


    handleSearch(evt){
        let {experimentID, locus, chromosome} = this.state;

        if(experimentID!== undefined && locus!== undefined && chromosome !== undefined){
            window.location.href = window.location.href + "browser/?file=" + experimentID + "&chrom=" + chromosome + "&locus=" + locus
        }
        else{
            alert("Please, provide the required information to go to the IGV Browser")
        }




    }

    handleChange_Experiment(evt){
       
        let fleldVal = evt.target.value;

        this.setState({
            experimentID:fleldVal
        })
    }

    chromosomeHandle(evt){
     
        let fleldVal = evt.target.value;

        this.setState({
            chromosome:fleldVal
        })
    }


    locusHandle(evt){
        
        let fleldVal = evt.target.value;
        this.setState({
            locus:fleldVal
        })
    }

    
    render(){
        return(
            <div className="main-content">
                <div className="welcome-message">
                    <Row>
                        <Col sm={3}/>
                        <Col sm={6}>
                            <div style={{marginTop:"1%", marginBottom: "3%"}}>
                            <h4 >The IGV-Browser (igv.js) hosted by the Genome-Phenome Analysis Platform (GPAP) accesses alignments served
                                by the <a href={"https://ega-archive.org/"}>European Genome-phenome Archive (EGA)</a> through its htsget server.
                            </h4>
                            <h5 >  Please, select an Experiment ID and a genomic location to visualise it in the IGV Browser.</h5>
                            </div>

                        </Col>
                        <Col sm={3}/>
                    </Row>
                    <Row>
                        <Col sm={3}/>
                        <Col sm={6}>
                            <div style={{}}>
                        <Form>
                            <FormLabel>Enter Experiment ID</FormLabel>
                        <FormControl
                            placeholder="Experiment ID"
                            onChange={this.handleChange_Experiment.bind(this)}
                        />
                        <FormGroup controlId="exampleForm.ControlSelect1">
                            <FormLabel>Chromosome: </FormLabel>
                        <FormControl
                            onChange={this.chromosomeHandle}
                            as="select">
                            {Array.from({length: 22}, (_, i) => i + 1).map(d => <option>{d}</option>)}
                            <option>X</option>
                            <option>Y</option>
                            <option>M</option>
                        </FormControl>
                        </FormGroup>
                            <FormLabel>Enter Locus: </FormLabel>
                        <FormControl
                            onChange={this.locusHandle}
                            placeholder="E.g. 13656-13670" />
                        <Button
                            style={{marginTop: "1%"}}
                        onClick={this.handleSearch}>Search & See</Button>
                        </Form>
                            </div>
                        </Col>
                        <Col sm={3}/>
                    </Row>
                </div>

            </div>

        )
    }
}



export default Home;