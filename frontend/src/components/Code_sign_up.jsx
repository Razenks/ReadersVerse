function Enter_code() {
    return (
        <main className="flex justify-center items-center">
            <div className="md:w-[500px] md:h-[250px] bg-gray-400 rounded-md justify-center items-center mt-10 p-10">
                <h1 className="text-white text-center text-3xl font-bold">ENTER CODE</h1>
                <div className="text-center items-center">
                    <input type="number" className="text-center justify-center text-xl mt-10 rounded-md w-[250px] h-[30px]" />
                </div>
                <div className="items-center justify-center text-center mt-7">
                    <button className="bg-blue-600 text-white font-bold w-[150px] h-[45px] rounded-md">SEND</button>
                </div>
            </div>
        </main>
    );
}

export default Enter_code;