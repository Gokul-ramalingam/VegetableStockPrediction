import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public price = [];
  public chart = [];
  public weekReport=[];
  public symbol;
  public name;
  public image;
  public flag=false;
  public time;
  public past=[];
  public show = false;
  constructor(private stock:StockService,private routes:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.past = this.stock.getPast();
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: [' ',' ',' ',' ',' ',' ',' '],
        datasets: [
          { 
            data: this.price,
            borderColor: "#ffffff",
            backgroundColor:"#ffffff",
            fill: true
          },
        ]
      },
      
      options: {
        responsive:true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            display: true,
            barPercentage:0.1,
             gridLines:
             {
              color: "rgba(0, 0, 0, 0)",
              display:false
             },
             scaleLabel: {
              display: true,
              labelString: 'DAYS OF TRADE',
              fontColor:'#ffffff'
            },
            ticks: {
              fontColor: "white",
              fontSize: 14,
              min:0
          }
          }],
          yAxes: [{
            display: true,
            barPercentage:0.1,
            gridLines:
             {
              color: "rgba(0, 0, 0, 0)",
              display:false
             },
             scaleLabel: {
              display: true,
              labelString: 'STOCK IN  USD',
              fontColor:'#ffffff'
            },
            ticks: {
              display:false,
              min:0
          }
          }],
        }
      }
    });
     
  }

  public func(value)
  {
    this.price = this.stock.getStocks(value);
    this.symbol=this.stock.getSymbol(value);
    this.name=this.stock.getName(value);
    this.image=this.stock.getImage(value);
    this.time=this.stock.getTime(value);
    this.stock.addPast(value);
    this.weekReport=this.stock.getWeekReport(value);
    if(this.price!=null)
    this.flag=true;
    else if(this.price==null)
    this.flag=false;
  }

  public viewPage(id)
  {
     this.router.navigate(['view',id],{relativeTo:this.routes});
  }

}
