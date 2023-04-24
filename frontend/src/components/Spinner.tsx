const Spinner: React.FC = () => {
    return (
        <main className="w-screen h-screen flex justify-center mt-14">
            <article className="loading-spin w-[300px] h-[300px] relative grid place-items-center text-[2rem] overflow-hidden">
                Loading..
                <div className="spin-sector spin-sector-1"></div>
                <div className="spin-sector spin-sector-2"></div>
                <div className="spin-sector spin-sector-3"></div>
            </article>
        </main>
    )
}

export default Spinner