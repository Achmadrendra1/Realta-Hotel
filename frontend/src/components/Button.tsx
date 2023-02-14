const Buttons = ({children, funcs, type} : {children:any, funcs?:any, type?:any}) => {
    const base = "text-white bg-sky-500 drop-shadow-none"
    const success = "text-white bg-green-600 drop-shadow-none"
    const danger = "text-white bg-red-600 drop-shadow-none"
    const warning = "text-white bg-yellow-500 drop-shadow-none"
    return(
        <button onClick={funcs} className={`px-8 py-2 text-sm ${type == 'success' ? success : type == 'danger' ? danger : type == 'warning' ? warning : base} rounded-full transition ease-in hover:drop-shadow-lg`}>{children}</button>
    )
}

export default Buttons