import React, {
  Component
} from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';
import './myPDF.less';
import $ from 'jquery'
class MyPDF extends Component {
  constructor(args) {
    super();
    this.state = {
      pdf:''
    }
  }
  componentWillMount() {
    this.setState({
     url:this.props.location.state.pdf
     //url:'https://arxiv.org/pdf/quant-ph/0410100.pdf'
    })
  }
  render(){
    return(
          <div>
             <PDFViewer
               document={{
                 url: this.state.url
               }}
               css="customViewer"
               navigation={{
                 css: {
                   previousPageBtn: 'customPrevBtn',
                   nextPageBtn: 'customNextBtn',
                   pages: 'customPages',
                   wrapper: 'customWrapper'
                 }
               }} 
               />
          </div>
      )
  }
  // methods
}
export default MyPDF;