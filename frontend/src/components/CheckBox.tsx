interface ICheckBox {
    getter: boolean
    setter: () => Promise<void>
}

const CheckBox: React.FC<ICheckBox> = ({ getter, setter }) => {
    return (
        <label className="switch">
            <input type="checkbox" checked={getter}
            onClick={async () => await setter()}/>
            <span className="slider round"></span>
        </label>
    )
}

export default CheckBox