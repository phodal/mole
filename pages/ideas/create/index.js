import React from "react";
import NoteLayout from "../../../components/NoteLayout";
import Textfield from 'react-mdl/lib/Textfield';

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
      </NoteLayout>
    )
  }

}

export default IdeasCreatePage;

