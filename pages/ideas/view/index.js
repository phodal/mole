import React from "react";
import NoteLayout from "../../../components/NoteLayout";

class IdeasDetailPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NoteLayout rootUrl='/ideas'>
        Ideas Detail Page
      </NoteLayout>
    )
  }
}

export default IdeasDetailPage;

