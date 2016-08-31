import React from "react";
import NoteLayout from "../../../components/NoteLayout";
import Textfield from 'react-mdl/lib/Textfield';
import FABButton from "react-mdl/lib/FABButton";

class IdeasCreatePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NoteLayout rootUrl='/ideas'>
        <div style={{padding: '20px'}}>
          <div>
            <Textfield
              floatingLabel
              label="标题..."
              style={{width: '100%'}}
            />
          </div>
          <div>
            <Textfield
              floatingLabel
              label="内容..."
              rows={10}
              style={{width: '100%', height: '100%', display: 'block'}}
            />
          </div>
        </div>

        <FABButton style={{float: "right", position: "fixed", right: "20px", bottom: "20px", zIndex: "100"}}>
          <i className="fa fa-send-o"/>
        </FABButton>
      </NoteLayout>
    )
  }

}

export default IdeasCreatePage;

