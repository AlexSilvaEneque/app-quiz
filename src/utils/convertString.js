export default (cadena) => {
    return cadena.includes('&') || cadena.includes(' ') ? 
            (cadena.split(' ')[0]+"_and_"+cadena.split(' ')[2]).toLowerCase() :
            cadena.toLowerCase()
}