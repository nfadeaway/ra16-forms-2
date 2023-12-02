import './App.css'
import React, {ReactElement, useState} from "react";
import InputForm from "./components/InputForm.tsx";
import DataForm from "./components/DataForm.tsx";

export interface Note {
    id: number;
    date: string;
    distance: number;
}

function App(): ReactElement {
    const [value, setValue] = useState<Note[]>([])

    const sortByDate = (a: Note, b: Note): number => {
        const aDate = new Date(`${a.date.slice(6, 10)}-${a.date.slice(3, 5)}-${a.date.slice(0, 2)}`)
        const bDate = new Date(`${b.date.slice(6, 10)}-${b.date.slice(3, 5)}-${b.date.slice(0, 2)}`)
        return aDate.getTime() < bDate.getTime() ? 1 : -1
    }

    const notesChanger = (row: {date: string, distance: number}) => {
        let idx = 0
        const sameRow = value.find(el => el.date === row.date)
        if (sameRow) {
            const sameRowIndex = value.indexOf(sameRow)
            let copyValue = [...value]
            let copyRow = {...copyValue[sameRowIndex]}
            copyRow.distance = copyRow.distance + row.distance
            copyValue[sameRowIndex] = copyRow
            setValue(copyValue.sort(sortByDate))
        } else {
            if (value.length >= 1) {
                idx = value.reduce((acc, curr) => acc.id > curr.id ? acc : curr).id + 1;
            }
            setValue([...value, {id: idx, date: row.date, distance: row.distance}].sort(sortByDate))
        }
    }

    const noteRemover = (e: React.MouseEvent<HTMLElement>) => {
        const id = (e.target as HTMLElement).dataset.id
        setValue(value.filter((note) => note.id !== Number(id)))
    }

    return (
        <div className="app">
            <InputForm notesChanger={notesChanger}/>
            <DataForm notes={value} noteRemover={noteRemover}/>
        </div>
    )
}

export default App
