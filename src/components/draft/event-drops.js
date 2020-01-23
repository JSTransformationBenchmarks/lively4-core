"enable aexpr";

import Morph from 'src/components/widgets/lively-morph.js';

import eventDrops from 'src/external/event-drops.js';
//import eventDrops from 'https://unpkg.com/event-drops@1.3.0/dist/index.js';
import d3 from 'src/external/d3.v5.js';
import repositoriesData from 'src/components/draft/event-drops-data.js'

import {AExprRegistry} from 'src/client/reactive/active-expression/active-expression.js'

export default class EventDrops extends Morph {
  async initialize() {
    this.windowTitle = "EventDrops";
    this.config = {
      d3,
      range : this.chart ? this.chart.range : void 0,
      zoom: {
          onZoom: () => {this.zoomedTo = this.chart.scale().domain()},
          onZoomEnd: () => this.updateMetaInformation(),
      },
      drop: {
          date: event => event.timestamp,
          color: event => {
            switch(event.message) {
              case 'created': return 'green';
              case 'disposed': return 'red';
              case 'changed value': return 'blue';
              default : return 'black';
            }
          }, //'#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6),
          onClick : data => {
            lively.notify(JSON.stringify(data));
          },
          onMouseOver: event => {
            // this.tooltip
            //     //.transition()
            //     //.duration(200)
            //     .style('opacity', 1)
            //     .style('pointer-events', 'auto');
            lively.showEvent(d3.event);
            
            // this.tooltip
            //     .html(
            //         <div class="commit">
            //           <img class="avatar" src="https://www.tierchenwelt.de/images/stories/fotos/saeugetiere/beuteltiere/quokka/quokka_happy_l.jpg" alt="${commit.author.name}" title="${commit.author.name}" />
            //           <div class="content">
            //               <h3 class="message">{event.message}</h3>
            //               <p>
            //                   <a href="https://www.github.com/${commit.author.name}" class="author">{event.author/*.name*/}</a>
            //                   on <span class="date">{this.humanizeDate(new Date(event.date))}</span> -
            //                   <a class="sha" href="${commit.sha}">{event/*.sha.substr(0, 10)*/}</a>
            //               </p>
            //           </div>
            //         </div>)
                // .style('left', `${d3.event.clientX - 30}px`)
                // .style('top', `${d3.event.clientY + 20}px`)
            //debugger;
            lively.setGlobalPosition(this.tooltip, lively.pt(d3.event.clientX, d3.event.clientY));
        },
        onMouseOut: () => {
            // this.tooltip
            //     //.transition()
            //     //.duration(500)
            //     //.style('opacity', 0)
            //     .style('pointer-events', 'none');
        }
      },
    };
    this.chart = eventDrops(this.config);

    //let repositoriesData = require('event-drops-data.json');
    
    repositoriesData = repositoriesData.map(repository => ({name: repository.name, data: repository.commits}));
    
    this.numberEventsContainer = this.get('#numberEvents');
    this.zoomStart = this.get('#zoomStart');
    this.zoomEnd = this.get('#zoomEnd');
    this.tooltip = undefined;
    document.body.querySelectorAll('.tooltip-d3').forEach(each => each.remove());
    if(!this.tooltip){
      this.tooltip = <div class='tooltip-d3' style='background-color=blue; width=100px; height=100px; position=absolute;'></div>
      document.body.appendChild(this.tooltip);
    }
      
      // d3
      // .select(this)
      // .append('div')
      // .classed('tooltip', true)
      // .style('opacity', 0)
      // .style('border', 'red 3px solid')
      // .style('width', '100px')
      // .style('height', '100px')
      // .style('background-color', 'blue')
      // .style('pointer-events', 'auto');

    this.d3 = d3;

    // this.chart.setDomain = (domain) => {
    //   this.chart.scale().domain(domain);
    //   let svg = d3.select(this.get('.event-drop-chart'));
    //   svg.call(this.chart.draw(_.merge(defaultConfig, this.config), this.chart.scale()));
    // }
    this.update();
   
  }
  

  getDataFromSource() {
    let dataFromSource = this.dataFromSource || (() => AExprRegistry.allAsArray());
    if(_.isFunction(dataFromSource))return dataFromSource();
    else return dataFromSource;
  }

  getGroupingFunction() {
    let deIndex = string => string.substring(0, string.lastIndexOf("#"));
    return this.groupingFunction || (each => deIndex(each.meta().get('id')))
  }
  
  update() {
    this.setAexprs(this.getDataFromSource());
    if(this.isStillInWorld())setTimeout(() => {this.update()}, 1000);
  }
  
  setAexprs(aexprs) {
    if(aexprs.length == 0)return;
    let groups = aexprs.groupBy(this.getGroupingFunction());
    groups = Object.keys(groups).map(each => ({name : each, data: groups[each].flatMap(ae => ae.meta().get('events'))}));
    this.setData(groups);
    let newDomain = this.zoomedTo;
    if(!newDomain) {
      let allEvents = groups.flatMap(each => each.data);
      let min = _.minBy(allEvents, each => each.timestamp).timestamp;
      let max = _.maxBy(allEvents, each => each.timestamp).timestamp;
      let difference = max.getTime() - min.getTime();
      if(difference == 0)difference = 100;
      min = new Date(min.getTime() - difference*0.1);
      max = new Date(max.getTime() + difference*0.1);
      newDomain = [min, max];
    }
    this.chart.scale().domain(newDomain);
    this.chart.zoomToDomain(newDomain);  
    this.updateMetaInformation();
  }
  
  setData(data) {
    d3
      .select(this.get('#eventdrops-demo'))
      .data([data])
      .call(this.chart);;
  }
  
  updateMetaInformation() {
    const numEvents = _.sumBy(this.chart.filteredData(), each => each.data.length);
    this.numberEventsContainer.textContent = numEvents;
    this.zoomStart.textContent = this.humanizeDate(this.chart.scale().domain()[0]);
    this.zoomEnd.textContent = this.humanizeDate(this.chart.scale().domain()[1]);
  }
  
  humanizeDate(date) {
    const monthNames = [
        'Jan.',
        'Feb.',
        'March',
        'Apr.',
        'May',
        'June',
        'Jul.',
        'Aug.',
        'Sept.',
        'Oct.',
        'Nov.',
        'Dec.',
    ];

    return `
        ${monthNames[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}
        ${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}
    `;
  }

  isStillInWorld() {
    return this.parentElement && this.parentElement.parentElement != undefined;
  }

  livelyMigrate(other) {
    this.zoomedTo = other.zoomedTo;
  }
  
}