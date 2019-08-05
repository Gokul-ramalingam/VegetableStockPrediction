import { Component, OnInit } from '@angular/core';
import { StockService } from '../stock.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  public id;
  public stocks;
  public price;
  public chart;
  constructor(private stock:StockService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params : ParamMap)=>
    {
     let id = parseInt(params.get('id'))
     this.id = id;
    });
    this.stocks = this.stock.getStockId(this.id);
    this.price = this.stock.getPrice(this.id);

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
  back()
  {
    this.router.navigate(['../../'],{relativeTo : this.route})
  }
}
