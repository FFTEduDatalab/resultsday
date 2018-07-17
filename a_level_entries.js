Highcharts.chart('entriesChartContainer', {
    title: {
        text: 'A-Level entries in ' + subject.toLowerCase() + ', 2014-2018'
    },
    subtitle: {
        text: entriesChartSubtitle
    },
    data: {
        // enablePolling: true,
        startColumn:2,
        csvURL: window.location.origin + '/a-level/a-level-entries.csv',
        beforeParse: function (csv) {
            let arr = csv.split(/\n/)
            let len=arr.length
            let newcsv=""
            if(len>0){
                for(let i=0; i<len; i++){
                    let line=arr.shift()
                    if (i==0 || (line.split(",")[0] == subject && line.split(",")[1] == scope)){
                        newcsv=newcsv.concat(line,/\n/)
                    }
                }
            }
            return newcsv
        }
    }
});
