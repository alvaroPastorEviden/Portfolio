import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Diferencias } from './pruebaEscritura-interfaces/diferencias';
import { PruebaEscrituraService } from './pruebaEscritura-services/prueba-escritura.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss',
})
export class PruebaComponent implements AfterViewInit {
  arrayFrases: Array<string> = [
    "abc abc", "Hola como estas", "buenas tardes"
    // 'El mundo no está en peligro por las malas personas sino por aquellas que permiten la maldad',
    // 'Si es bueno vivir, todavía es mejor soñar, y lo mejor de todo, despertar',
    // 'Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida',
    // 'Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida',
  ];
  inicio!: Date;
  fin!: Date;
  fraseAleatoria: string = '';
  motivoTrampa: string = '';
  mostrarAlerta: boolean = false;
  mostrarJugarDeNuevo: boolean = false;
  mostrarResultado: boolean = false;
  mostrarModalResultado: boolean = false;
  resultado!: Diferencias;
  tiempo:string = "";

  @ViewChild('areaLectura') lectura!: ElementRef;
  @ViewChild('areaEscritura') escritura!: ElementRef;

  constructor(private renderer2: Renderer2, private cdr: ChangeDetectorRef, private pruebaEscrituraService: PruebaEscrituraService) {}

  ngAfterViewInit(): void {
    this.fraseAleatoria =
      this.arrayFrases[Math.floor(Math.random() * this.arrayFrases.length)];

    const asLectura = this.lectura.nativeElement;
    this.renderer2.setValue(asLectura, this.fraseAleatoria);

    this.cdr.detectChanges();
  }

  inicioTiempo() {
    this.inicio = new Date();
    this.mostrarJugarDeNuevo = false;
  }

  finPrueba() {
    //Guardamos el tiempo
    this.fin = new Date();

    //Bloqueamos el textArea
    let textEscritura = this.escritura.nativeElement;
    this.renderer2.setProperty(textEscritura, 'disabled', true);
    this.renderer2.setStyle(textEscritura, 'background-color', '#bfdbfe');
    this.renderer2.setStyle(textEscritura, 'border', '1px solid #3b82f6');

    //Comprobamos los resultados
    this.calcularResultados();

    //Habilitamos el botón para volver a jugar
    this.mostrarJugarDeNuevo = true;
  }

  calcularResultados() {
    let textLectura = this.lectura.nativeElement;
    let textEscritura = this.escritura.nativeElement;

    if (textLectura.textContent.trim() === textEscritura.value.trim()) {
     
      //Mostramos los resultados
       this.tiempo = this.calcularTiempo().toString();
       this.mostrarModalResultado = true;
    
    } else {
      this.resultado = this.pruebaEscrituraService.checkDifferences(
        textLectura.textContent.trim(),
        textEscritura.value.trim()
      );
      //Mostramos los resultados
    this.mostrarResultado = true;
    }
  };
  
  

  controlPulsado() {
    this.trampaDetectada(
      'la tecla Control.'
    );
  }

  btnDerechoPulsado(event: MouseEvent) {
    event.preventDefault();
    this.trampaDetectada(
      'el Click Derecho.'
    );
  }

  calcularTiempo() {
    return Math.abs((this.inicio.getTime() - this.fin.getTime()) / 1000);
  }

  trampaDetectada = (motivo: string) => {
    //Mostramos alerta
    this.mostrarAlerta = true;

    let textEscritura = this.escritura.nativeElement;
    this.renderer2.setProperty(textEscritura, 'disabled', true);
    this.renderer2.setStyle(textEscritura, 'background-color', '#fee2e2');
    this.renderer2.setStyle(textEscritura, 'border', '1px solid #f87171');
    this.renderer2.setStyle(textEscritura, 'color', '#b91c1c');
    textEscritura.innerHTML =
      'No está permitido intentar pegar el texto para conseguir mejor puntuación.';
    this.motivoTrampa = `Se ha pulsado ${motivo}`;
  };

  ajustarAltura(): void {
    let textEscritura = this.escritura.nativeElement;
    this.renderer2.setStyle(textEscritura, 'height', 'auto');
    this.renderer2.setStyle(
      textEscritura,
      'height',
      `${textEscritura.scrollHeight}px`
    );
  }

  cerrarAlert(): void {
    this.mostrarAlerta = false;
    this.mostrarJugarDeNuevo = false;
  }

  nuevaPartida(): void {
    //Seleccionamos una nueva frase
    this.fraseAleatoria =
      this.arrayFrases[Math.floor(Math.random() * this.arrayFrases.length)];
    const asLectura = this.lectura.nativeElement;
    this.renderer2.setValue(asLectura, this.fraseAleatoria);
    this.cdr.detectChanges();

    //Desbloqueamos el text area
    let textEscritura = this.escritura.nativeElement;
    this.renderer2.setProperty(textEscritura, 'disabled', false);
    this.renderer2.setStyle(textEscritura, 'background-color', '#f8fafc');
    this.renderer2.setStyle(textEscritura, 'border', 'none');
    this.renderer2.setStyle(textEscritura, 'color', '#111827');
    textEscritura.value = ''; 

    //Ocultamos el botón
    this.mostrarJugarDeNuevo = false;
    this.cerrarAlert();

    //Ocultamos los resultados
    this.mostrarResultado = false;

    //Cerramos el modal
    this.mostrarModalResultado = false;
  }

  cerrarModal():void{
    console.log("Se pulsa")
    this.mostrarModalResultado = false;
  }
}
