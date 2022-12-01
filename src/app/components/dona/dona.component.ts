import { Component, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {


  // Doughnut Dona

@Input() titulo: string='' ;

@Input('etiquetas') doughnutChartLabels: Label[] = ['Dato1', 'Dato2', 'Datos3'];
@Input('datos')     doughnutChartData: MultiDataSet = [ [ 350, 350, 350 ] ];

public doughnutChartType: ChartType = 'doughnut';
public colores: Color[] = [
  {backgroundColor:['#6857E6','#009FEE','#F02059']}
];


}
