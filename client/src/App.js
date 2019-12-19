import React, { Component } from 'react';
import Button from 'antd/es/button';
import './App.css';
import { Table, Divider, Tag } from 'antd';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


class App extends Component {
	
  augmentCheckpointData(d) {
	  const checkpointNames = topology.map((t) => { return t.checkpoint});
	  const index = checkpointNames.indexOf(d.checkpoint);
	  if (d.checkpointtype == 'crossing' && d.direction == 'in' && index >= 0) {
		  return Object.assign({}, d, topology[index]);
	  } else {
		  return null;
	  }
  }
	
  render() {
	const position = [this.state.lat, this.state.lng]
	/*	  
	for(var i = 0; i < topology.length; i++) {
	    var chkname = topology[i].checkpoint;
	    
	    this.state.data.forEach(
	    		function(obj) {
	    			console.log(obj.checkpoint);
	    			console.log(obj.checkpointtype);
	    			console.log(obj.direction);
	    			console.log(obj.count);
	    			
	    			if (chkname == obj.checkpoint && 'crossing' == obj.checkpointtype){
	    				alert (obj.checkpoint + ":" + obj.count + "-" + obj.direction);
	    			}
	    		});
	}
	*/	
	const markers = (
			<React.Fragment>
				{this.state.data.map((d) => {
					d = this.augmentCheckpointData(d);
					if (d) {
						return <Marker position={[d.lat, d.lng]}>
									<Popup>{d.checkpoint}: {d.count} - {d.direction}</Popup>
								</Marker>;	
					}
					return null;
					})
				}
			</React.Fragment>);
		
    return (      
      <div>
	      <div id="mapid" class="divmapclass">
		      <Map center={position} viewport={this.state.viewport} style={{height : '500px'}}>
		      <TileLayer
		        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
		        	{markers}
		      </Map>
	      </div>
	     <div id="tableid" class="divtableclass"> 
	     	<Table columns={columns} dataSource={this.state.data} bordered="true" pagination={{pageSize: 20}} showHeader="true" size="small" />
	     {/* todo */} 
	     </div>
      </div>

    );
  } // end render()
  
  
  
  componentDidMount() {	  
	  this.intervalId = setInterval(
			  () => this.loadData(),
			  60000
			  );
	  this.loadData(); // also load one immediately
  }  
  
  loadData(){
	  fetch('http://ac-node-nr-consumer-ac-project.192.168.202.24.nip.io/api/v2/status',
	    {
	        method: 'GET',
	        //body: JSON.stringify(body), //eventuale json in body
	        headers: {
	            "Content-Type": "application/json; charset=utf-8",
				"Authorization": "Bearer 1234567890",
				"Accept":"application/json"
			},
	    })
	    .then(response => response.json()).then(
	    		(json) => {
	    					this.setState({ data: json });
	    					}).catch(
	    							(error) => alert(error.message)
	    					);
	  
  }
  
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  
  state = {
		  //lat: 40.751210, 
		  //lng: 14.488297,
		  //zoom: 16,
		  viewport: {
			  center: [40.751210, 14.488297],
			  zoom: 16,
			},
		  data: [
		    {
		      key: '1',
		      checkpoint: 'PortaMarina',		      
		      checkpointtype: 'crossing',
		      direction: 'in',
			  count: 12,
		      tags: ['nice', 'developer'],
		    },
		    {
		      key: '2',
		      checkpoint: 'Anfiteatro',
		      checkpointtype: 'crossing',
		      direction: 'out',
			  count: 8,
		      tags: ['loser'],
		    },
		    {
		      key: '3',
		      checkpoint: 'Foro',
		      checkpointtype: 'crossing',
		      direction: 'in',
			  count: 10,
		      tags: ['cool', 'teacher'],
		    },
		  ]
  };
  
  
} // end class component





const topology = [
	  {
	    checkpoint: 'Anfiteatro',
	    lat: 40.750984,
		lng: 14.494694
	  },
	  {
		checkpoint: 'PortaMarina',
		lat: 40.7484834,
		lng: 14.4830869
	  },
	  {
		checkpoint: 'Foro',
	    lat: 40.7491175,
		lng: 14.4845247
	  }
	]


const columns = [
  {
    title: 'Checkpoint',
    dataIndex: 'checkpoint',
    key: 'checkpoint',
	width: 150,
	sorter: (a, b) => a.checkpoint.length - b.checkpoint.length,
	sortDirections: ['ascend']	    
  },
  {
    title: 'CheckpointType',
    dataIndex: 'checkpointtype',
    key: 'checkpointtype',
	width: 200,
	  filters: [
	        {
	          text: 'crossing',
	          value: 'crossing',
	        },
	        {
	          text: 'baggage-drop',
	          value: 'baggage-drop',
	        }
	      ],
	      // specify the condition of filtering result
	      // here is that finding the name started with `value`
	      onFilter: (value, record) => record.checkpointtype.indexOf(value) === 0,
	      sorter: (a, b) => a.checkpointtype.length - b.checkpointtype.length,
	      sortDirections: ['ascend'],
  },
  {
    title: 'Direction',
    dataIndex: 'direction',
    key: 'direction',
	  width: 80
  },
  {
    title: 'Count',
    dataIndex: 'count',
    key: 'count',
	  width: 80 ,
    render: text => <b>{text}</b>
  },
  {
    title: 'Time',
    dataIndex: 'updatetime',
    key: 'updatetime',
	   width: 200 ,
  },
  {
    title: 'Other',
    dataIndex: 'info',
    key: 'info'
  }
  
]


const DEFAULT_VIEWPORT = {
	center: [51.505, -0.09],
	zoom: 13
}
 const MAPDIVSTYLE = {
	height: "800px",
	width: "90%"
}

export default App;

//ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);
