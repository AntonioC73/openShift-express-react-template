(this.webpackJsonpmonitor=this.webpackJsonpmonitor||[]).push([[0],{152:function(t,e,n){t.exports=n(294)},157:function(t,e,n){},158:function(t,e,n){},294:function(t,e,n){"use strict";n.r(e);var a=n(0),i=n.n(a),o=n(3),c=n.n(o),r=(n(157),n(133)),l=n(134),s=n(148),p=n(135),u=n(149),h=(n(158),n(298)),d=n(297),k=n(301),g=n(300),m=n(302),f=function(t){function e(){var t,n;Object(r.a)(this,e);for(var a=arguments.length,i=new Array(a),o=0;o<a;o++)i[o]=arguments[o];return(n=Object(s.a)(this,(t=Object(p.a)(e)).call.apply(t,[this].concat(i)))).state={viewport:{center:[40.75121,14.488297],zoom:16},data:[{key:"1",checkpoint:"PortaMarina",checkpointtype:"crossing",direction:"in",count:12,tags:["nice","developer"]},{key:"2",checkpoint:"Anfiteatro",checkpointtype:"crossing",direction:"out",count:8,tags:["loser"]},{key:"3",checkpoint:"Foro",checkpointtype:"crossing",direction:"in",count:10,tags:["cool","teacher"]}]},n}return Object(u.a)(e,t),Object(l.a)(e,[{key:"augmentCheckpointData",value:function(t){var e=y.map((function(t){return t.checkpoint})).indexOf(t.checkpoint);return"crossing"==t.checkpointtype&&"in"==t.direction&&e>=0?Object.assign({},t,y[e]):null}},{key:"render",value:function(){var t=this,e=[this.state.lat,this.state.lng],n=i.a.createElement(i.a.Fragment,null,this.state.data.map((function(e){return(e=t.augmentCheckpointData(e))?i.a.createElement(d.a,{position:[e.lat,e.lng]},i.a.createElement(k.a,null,e.checkpoint,": ",e.count," - ",e.direction)):null})));return i.a.createElement("div",null,i.a.createElement("div",{id:"mapid",class:"divmapclass"},i.a.createElement(g.a,{center:e,viewport:this.state.viewport,style:{height:"500px"}},i.a.createElement(m.a,{attribution:'&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}),n)),i.a.createElement("div",{id:"tableid",class:"divtableclass"},i.a.createElement(h.a,{columns:v,dataSource:this.state.data,bordered:"true",pagination:{pageSize:20},showHeader:"true",size:"small"})))}},{key:"componentDidMount",value:function(){var t=this;this.intervalId=setInterval((function(){return t.loadData()}),6e4),this.loadData()}},{key:"loadData",value:function(){var t=this;fetch("http://ac-node-nr-consumer-ac-project.192.168.202.24.nip.io/api/v2/status",{method:"GET",headers:{"Content-Type":"application/json; charset=utf-8",Authorization:"Bearer 1234567890",Accept:"application/json"}}).then((function(t){return t.json()})).then((function(e){t.setState({data:e})})).catch((function(t){return alert(t.message)}))}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalId)}}]),e}(a.Component),y=[{checkpoint:"Anfiteatro",lat:40.750984,lng:14.494694},{checkpoint:"PortaMarina",lat:40.7484834,lng:14.4830869},{checkpoint:"Foro",lat:40.7491175,lng:14.4845247}],v=[{title:"Checkpoint",dataIndex:"checkpoint",key:"checkpoint",width:150,sorter:function(t,e){return t.checkpoint.length-e.checkpoint.length},sortDirections:["ascend"]},{title:"CheckpointType",dataIndex:"checkpointtype",key:"checkpointtype",width:200,filters:[{text:"crossing",value:"crossing"},{text:"baggage-drop",value:"baggage-drop"}],onFilter:function(t,e){return 0===e.checkpointtype.indexOf(t)},sorter:function(t,e){return t.checkpointtype.length-e.checkpointtype.length},sortDirections:["ascend"]},{title:"Direction",dataIndex:"direction",key:"direction",width:80},{title:"Count",dataIndex:"count",key:"count",width:80,render:function(t){return i.a.createElement("b",null,t)}},{title:"Time",dataIndex:"updatetime",key:"updatetime",width:200},{title:"Other",dataIndex:"info",key:"info"}],w=f;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(i.a.createElement(w,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[152,1,2]]]);
//# sourceMappingURL=main.e81b2178.chunk.js.map