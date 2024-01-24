import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss',
})
export class PruebaComponent implements AfterViewInit {
  arrayFrases: Array<string> = [
    'El mundo no está en peligro por las malas personas sino por aquellas que permiten la maldad',
    'Si es bueno vivir, todavía es mejor soñar, y lo mejor de todo, despertar',
    'Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida',
    'Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida Estar preparado es importante, saber esperarlo es aún más, pero aprovechar el momento adecuado es la clave de la vida',
  ];
  inicio!: Date;
  fin!: Date;
  fraseAleatoria: string = '';
  @ViewChild('areaLectura') lectura!: ElementRef;
  @ViewChild('areaEscritura') escritura!: ElementRef;


  constructor(private renderer2: Renderer2, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.fraseAleatoria = this.arrayFrases[Math.floor(Math.random() * this.arrayFrases.length)];
  
    const asLectura = this.lectura.nativeElement;
    this.renderer2.setValue(asLectura, this.fraseAleatoria);
   

    this.cdr.detectChanges();
  }

  inicioTiempo() {
    this.inicio = new Date();
    console.log(this.inicio);
  }

  finPrueba() {
    this.fin = new Date();
    console.log(this.calcularTiempo());
  }

  controlPulsado() {
    this.trampaDetectada('Control');
  }

  btnDerechoPulsado(event: MouseEvent) {
    event.preventDefault();
    this.trampaDetectada('Click Derecho');
  }

  calcularTiempo() {
    return Math.abs((this.inicio.getTime() - this.fin.getTime()) / 1000);
  }

  trampaDetectada = (motivo: string) => {
    //Deshabilitamos el textArea
    //textAreaEscritura.disabled = true;
//textAreaEscritura.style.backgroundColor = "red";
    console.log(`Se ha pulsado ${motivo}`);
  };
  
  ajustarAltura(): void {
    const textAreaElement = this.escritura.nativeElement;
    this.renderer2.setStyle(textAreaElement, 'height', 'auto');
    this.renderer2.setStyle(textAreaElement, 'height', `${textAreaElement.scrollHeight}px`);
  }
}
