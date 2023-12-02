import {Note} from "../App.tsx";
import React from "react";

interface DataFormProps {
    notes: Note[]
    noteRemover: (e: React.MouseEvent<HTMLElement>) => void
}

const DataForm = (props: DataFormProps) => {

    return (
        <div className="notes">
            {props.notes.length > 0 && props.notes.map((note) =>
                <div className="note" key={note.id}>
                    <div className="date">
                        {note.date}
                    </div>
                    <div className="distance">
                        {note.distance}
                    </div>
                    <div data-id={note.id} onClick={props.noteRemover} className="material-icons">delete</div>
                </div>)}
        </div>
    )
};

export default DataForm;