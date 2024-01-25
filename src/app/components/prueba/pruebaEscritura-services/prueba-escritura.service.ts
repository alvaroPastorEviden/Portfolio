import { ElementRef, Injectable } from '@angular/core';
import { Diferencias } from '../pruebaEscritura-interfaces/diferencias';

@Injectable({
  providedIn: 'root'
})
export class PruebaEscrituraService {

  constructor() { }

 


  checkDifferences = (text1:string, text2:string) => { 
    const words1 = text1.split(" ");
    const words2 = text2.split(" ");
  
    let coincidencias = [];
    let malPosicionadas = [];
    let errores = [];
  
    for (let i = 0; i < words2.length; i++) {
      if (i < words1.length && words1[i] === words2[i]) {
        coincidencias.push(words1[i]);
      } else if (words1.includes(words2[i])) {
        malPosicionadas.push(words2[i]);
      } else {
        if(words2[i].trim() === ""){
          errores.push("Espacio en blanco de más entre palabras");
        }else{
          errores.push(words2[i]);
        }
        
      }
    }
  
    return {
      coincidencias: coincidencias,
      malPosicionadas: malPosicionadas,
      errores: errores,
    };
  };

  feedback = (diferencias : Diferencias) => {
    let coincidenciasP = document.createElement("p");
  console.log("Coincidencias:")
    if (!diferencias.coincidencias.length) {
      
      console.log("No hay ninguna coincidencia")
      coincidenciasP.textContent = "No hay ninguna coincidencia";
      //coincidenciasDiv.appendChild(coincidenciasP);
    } else {
      diferencias.coincidencias.forEach((coincidencia) => {
        console.log("- "+coincidencia)
        let coincidenciaP = document.createElement("p");
        coincidenciaP.textContent = coincidencia;
        //coincidenciasDiv.appendChild(coincidenciaP);
      });
    }
    console.log("Mal posicionadas:")
    diferencias.malPosicionadas.forEach((diferencia) => {
      console.log("- "+diferencia)
      let diferencias1P = document.createElement("p");
      diferencias1P.textContent = diferencia;
      //malPosicionadasDiv.appendChild(diferencias1P);
    });
    console.log("Errores:")
    diferencias.errores.forEach((error) => {
      console.log("- "+error)
      let diferencias2P = document.createElement("p");
      diferencias2P.textContent = error;
      //erroresDiv.appendChild(diferencias2P);
    });
    // resultadosSec.classList.add('resultados');
    // resultadosSec.classList.remove('ocultar');
  
  };
}
