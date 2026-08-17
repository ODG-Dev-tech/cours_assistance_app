'use client'

export default function BuildPDF(){
return(
    <button onClick={ () => window.print()} className="print:hidden cursor-pointer">Exporter en PDF</button>
)
}