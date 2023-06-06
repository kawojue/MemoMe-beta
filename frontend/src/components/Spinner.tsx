const SpinnerOne: React.FC = () => {
    return (
        <main className="w-full h-full flex justify-center mt-20">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </main>
    )
}

const SpinnerTwo: React.FC = () => {
    return (
        <div className="small-loading-container">
            <div className="small-loading">
                <div></div>
                <div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export { SpinnerOne, SpinnerTwo }