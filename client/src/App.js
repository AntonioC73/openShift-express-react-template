import React, { Component } from 'react';
import Button from 'antd/es/button';
import './App.css';
import { Table, Divider, Tag } from 'antd';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


class App extends Component {
	
  render() {
	  
	const position = [this.state.lat, this.state.lng]
	
	const markers = (<React.Fragment>
	{this.state.data.map((d) => {
		d.position = position.map((x)=>{ return x+Math.random()/100});
		return (<Marker position={d.position}><Popup>{d.checkpoint}: {d.count}</Popup></Marker>);
	})}
	</React.Fragment>);
	
    return (      
      <div>
	     
	      <Map center={position} zoom={this.state.zoom}>
	      <TileLayer
	        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
	      {markers}
	      </Map>
	      
	     
	     <Table columns={columns} dataSource={this.state.data} bordered="true" pagination={{pageSize: 20}} showHeader="true" size="small" />
	     {/* todo */}
      </div>

    );
  }
  
  
  
  componentDidMount() {	  
	  this.intervalId = setInterval(() => this.loadData(), 60000);
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
	    .then(response => response.json()).then((json) => {
	      this.setState({ data: json });
	    }).catch((error) => alert(error.message));
	  
  }
  
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  
  state = {
		  lat: 40.7462,
		  lng: 14.4989,
		  zoom: 17,
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
  
  
}

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

export default App;

//ReactDOM.render(<Table columns={columns} dataSource={data} />, mountNode);
