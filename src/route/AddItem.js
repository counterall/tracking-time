import React from "react";
import { useHistory } from "react-router-dom";
import Header from "../components/ui/Header";


function AddItem(props) {

    const history = useHistory();
    const {previous, previousName, action} = props.location.state;
    console.log(history);

    const itemType = props.match.params.type;

    return (

        <div className="add-view">
            <Header previous={previous} txt={previousName} action={action} />
        </div>
    );

}


export default AddItem;