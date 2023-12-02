import React, {MutableRefObject, useRef} from "react";

interface InputFormProps {
    notesChanger: (row: {date: string, distance: number}) => void
}

const InputForm = (props: InputFormProps) => {
    const errorRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let result= /^\d{2}.\d{2}.\d{4}$/i.exec(e.currentTarget.date.value);
        if (result && typeof +e.currentTarget.distance.value === "number") {
            props.notesChanger({date: e.currentTarget.date.value, distance: +e.currentTarget.distance.value})
            errorRef.current.classList.add("hidden")
            e.currentTarget.date.value = ""
            e.currentTarget.distance.value = ""
        } else {
            console.log('Ошибка')
            errorRef.current.classList.remove("hidden")
        }
    }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-date-column">
                    <div className="form-date-label">
                        <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
                    </div>
                    <div className="form-date-input">
                        <input
                            id="date" name="date"
                            className="input-date"
                        />
                    </div>
                </div>
                <div className="form-distance-column">
                    <div className="form-distance-label">
                        <label htmlFor="distance">Пройдено км</label>
                    </div>
                    <div className="form-distance-input">
                        <input
                            id="distance" name="distance"
                            className="input-distance"
                        />
                    </div>
                </div>
                <div className="form-button-column">
                    <button className="form-button" type="submit">ОК</button>
                </div>
            </form>
            <div ref={errorRef} className="error hidden">Неверный формат данных</div>
        </div>
    );
};

export default InputForm;