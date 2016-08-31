import React from "react";
import NoteLayout from "../../../components/NoteLayout";

class IdeasCreatePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NoteLayout rootUrl='/ideas'>
        Creates
      </NoteLayout>
    )
  }

}

export default IdeasCreatePage;

