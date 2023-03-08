const Buttons = ({children, funcs, type} : {children:any, funcs?:any, type?:any}) => {
    const base = "text-white bg-[#754CFF]"
    const success = "text-white bg-green-600"
    const danger = "text-white bg-red-400"
    const warning = "text-white bg-yellow-500"
    return(
        <button onClick={funcs} className={`px-8 py-2 drop-shadow-none text-sm ${type == 'success' ? success : type == 'danger' ? danger : type == 'warning' ? warning : base} rounded-lg transition ease-in hover:drop-shadow-lg`}>{children}</button>
    )
}

export default Buttons