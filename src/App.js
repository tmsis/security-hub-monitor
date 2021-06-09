// https://www.cluemediator.com/read-csv-file-in-react
// https://www.npmjs.com/package/react-data-table-component
// https://nivo.rocks/pie/

import React, { useState } from 'react';
import { ResponsivePie } from '@nivo/pie'
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import Select from 'react-select';

function App() {

  const [columns, setColumns] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [data, setData] = useState([]);
  const [titleColumns, setTitleColumns] = useState([]);
  const [titleData, setTitleData] = useState([]);
  const [severityColumns, setSeverityColumns] = useState([]);
  const [severityData, setSeverityData] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchArray, setSearchArray] = useState({});


  const processData = dataString => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    var headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);

    const data = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      if (headers && row.length == headers.length) {
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
          let d = row[j];
          if (d.length > 0) {
            if (d[0] == '"')
              d = d.substring(1, d.length - 1);
            if (d[d.length - 1] == '"')
              d = d.substring(d.length - 2, 1);
          }
          if (headers[j]) {
            obj[headers[j]] = d;
          }
        }

        // remove the blank rows
        if (Object.values(obj).filter(x => x).length > 0) {
          data.push(obj);
        }
      }
    }

    const titleData = Object.values(data.reduce((r, e) => {
      let k = `${e.Title}`;
      if(!r[k]) r[k] = {id: e.Title, value: 1}
      else r[k].value += 1;
      return r;
    }, {}));

    const severityData = Object.values(data.reduce((r, e) => {
      let k = `${e['Severity Label']}`;
      if(!r[k]) r[k] = {id: e['Severity Label'], value: 1}
      else r[k].value += 1;
      return r;
    }, {}));

    const filterOptions = {};
    var filters = {};
    for (var h = 0; h < headers.length; h++) {
      var header = headers[h];
      filters[header] = Array.from(new Set(data.map(finding => finding[header])));
      searchArray[header] = [""];
    }
    searchArray['Search'] = [""];
    for (var f in filters) {
      if (filters.hasOwnProperty(f)) {
        filterOptions[f] = filters[f].map(x => {
          return {label: x, value: x}
        });
      }
    }

    // prepare columns list from headers
    const columns = headers.map(c => ({
      name: c,
      selector: c,
    }));

    const titleColumns = [
      {
        name: 'Title',
        selector: 'id',
        sortable: true,
        width: '80%'
      },
      {
        name: '# resources affected',
        selector: 'value',
        sortable: true,
      },
    ];

    const severityColumns = [
      {
        name: 'Severity',
        selector: 'id',
        sortable: true,
      },
      {
        name: '# resources affected',
        selector: 'value',
        sortable: true,
      },
    ];
    setData(data);
    setSearchArray(searchArray);
    setFilteredData(data);
    setTitleData(titleData);
    setSeverityData(severityData);
    setHeaders(headers);
    setColumns(columns);
    setTitleColumns(titleColumns);
    setSeverityColumns(severityColumns);
    setFilterOptions(filterOptions);
  }


  const handleFileUpload = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      processData(data);
    };
    reader.readAsBinaryString(file);
  }


  const handleFilters = (e,o) => {
    var name = o ? o.name : e.target.name;
    var vals = o ? e : [e.target];
    searchArray[name] = vals.map(v => v.value);
    setSearchArray(searchArray);
    searchData();
  }


  const searchData = () => {
    var filteredData = data;
    var firstFilter = false;
    for (var h = 0; h < headers.length; h++) {
      var field = headers[h];
      var filteredDataThisField = [];
      for (var v = 0; v < searchArray[field].length; v++) {
        var value = searchArray[field][v].toLowerCase();
        if (!value) continue;
        firstFilter = true;
        var results = filteredData.filter(d => d[field].toLowerCase().includes(value));
        filteredDataThisField = filteredDataThisField.concat(results);
      }
      if (firstFilter) {
        firstFilter = false;
        filteredData = filteredDataThisField;
      } else {
        filteredData = filteredData.concat(filteredDataThisField);
      }
    }
    var searchValue = searchArray['Search'][0].toLowerCase();
    if (searchValue) {
      var searchedData = [];
      for (var h = 0; h < headers.length; h++) {
        var field = headers[h];
        var filteredDataThisField = filteredData.filter(d => d[field].toLowerCase().includes(searchValue));
        searchedData = searchedData.concat(filteredDataThisField);
      }
      filteredData = searchedData;
    }
    setFilteredData(filteredData);

    var titleData = Object.values(filteredData.reduce((r, e) => {
      let k = `${e.Title}`;
      if(!r[k]) r[k] = {id: e.Title, value: 1}
      else r[k].value += 1;
      return r;
    }, {}));
    setTitleData(titleData);

    var severityData = Object.values(filteredData.reduce((r, e) => {
      let k = `${e['Severity Label']}`;
      if(!r[k]) r[k] = {id: e['Severity Label'], value: 1}
      else r[k].value += 1;
      return r;
    }, {}));
    setSeverityData(severityData);
  }


  const MyResponsivePie = ({}) => (
    <ResponsivePie
      data={severityData}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      // colors={{ scheme: 'yellow_orange_red' }}
      colors={(d) =>{
        switch(d.id) {
          case 'LOW': return '#ffffcc'; break;
          case 'MEDIUM': return '#ffeda0'; break;
          case 'HIGH': return '#fed976'; break;
          case 'CRITICAL': return '#feb24c';
        }
      }}
      borderWidth={1}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
      enableArcLinkLabels={false}
      className="pie"
    />
  );


  const TitleTable = () => {
    return (
      <DataTable
        pagination
        highlightOnHover
        columns={titleColumns}
        data={titleData}
        defaultSortAsc={false}
        defaultSortField={"value"}
        className="datatable"
        title="Findings by title"
      />
    );
  };


  const SeverityTable = () => {
    return (
      <DataTable
        pagination
        highlightOnHover
        columns={severityColumns}
        data={severityData}
        defaultSortAsc={false}
        defaultSortField={"value"}
        className="datatable"
        title="Findings by severity"
        conditionalRowStyles={conditionalRowStyles}
      />
    );
  };

  const conditionalRowStyles = [
    {
      when: row => row.id === 'LOW',
      style: {
        backgroundColor: '#ffffcc'
      }
    },
    {
      when: row => row.id === 'MEDIUM',
      style: {
        backgroundColor: '#ffeda0'
      }
    },
    {
      when: row => row.id === 'HIGH',
      style: {
        backgroundColor: '#fed976'
      }
    },
    {
      when: row => row.id === 'CRITICAL',
      style: {
        backgroundColor: '#feb24c'
      }
    },
  ];


  const FullTable = () => {
    return (
      <DataTable
        pagination
        highlightOnHover
        columns={columns}
        data={filteredData}
        className="datatable"
        title="All findings"
      />
    );
  };


  // const Filter = (name) = {
  //   return (
  //     <label htmlFor="{name}">{name}:</label>
  //     <Select
  //       isMulti
  //       name={name}
  //       options={filterOptions[{name}]}
  //       className="basic-multi-select"
  //       classNamePrefix="select"
  //       onChange={handleFilters}
  //     />
  //   )
  // }


  return (
    <div>
      <form id="form">
        <div className="field">
          <label htmlFor="File">File:</label>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileUpload}
            required
            name="File"
          />
        </div>
        <div className="field">
          <label htmlFor="Search">Search:</label>
          <input
            type="search"
            name="Search"
            placeholder="Type to filter all fields"
            onChange={handleFilters}
          />
        </div>
        <div className="field">
          <label htmlFor="Team">Team:</label>
          <Select
            isMulti
            name="Team"
            options={filterOptions["Team"]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleFilters}
          />
        </div>
        <div className="field">
          <label htmlFor="AWS Account ID">AWS Account ID:</label>
          <Select
            isMulti
            name="AWS Account ID"
            options={filterOptions["AWS Account ID"]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleFilters}
          />
        </div>
        <div className="field">
          <label htmlFor="Compliance Status">Compliance Status:</label>
          <Select
            isMulti
            name="Compliance Status"
            options={filterOptions["Compliance Status"]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleFilters}
          />
        </div>
        <div className="field">
          <label htmlFor="Severity">Severity:</label>
          <Select
            isMulti
            name="Severity Label"
            options={filterOptions["Severity Label"]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleFilters}
          />
        </div>
        <div className="field">
          <label htmlFor="Resource Type">Resource Type:</label>
          <Select
            isMulti
            name="Resource Type"
            options={filterOptions['Resource Type']}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleFilters}
          />
        </div>
        <div className="field">
          <label htmlFor="Record State">Record State:</label>
          <Select
            isMulti
            name="Record State"
            options={filterOptions["Record State"]}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleFilters}
          />
        </div>
        <button type="reset">Reset</button>
      </form>

      <div className="half">
        <TitleTable/>
      </div>

      <div className="twosixths">
        <SeverityTable/>
      </div>
      <div className="onesixth pie" style={{ height: 300}}>
        <MyResponsivePie/>
      </div>

      <div className="full">
        <FullTable/>
      </div>
    </div>
  );
}

export default App;
