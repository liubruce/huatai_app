import React, {
  Component
} from 'react';
import PDFViewer from 'mgr-pdf-viewer-react';
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
    })
  }
  render(){
    return(
          <div style={{minHeight:'783px'}} >
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