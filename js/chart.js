class Chart {
    constructor(SOI, id) {
        // console.log(SOI);
        this.SOIDimension = SOI.dimension(function(SOI) {
            return SOI.year;
        });
        // console.log(this.SOIDimension.top(Infinity));
        this.chartContainer = d3.select(id);
        this.chart = null; // This will hold chart SVG Dom element reference
        this.chartWidth = 710; // Width in pixels
        this.chartHeight = 250; // Height in pixels
        this.margin = 50; // Margin in pixels
        this.chartHeightWithoutMargin = this.chartHeight - this.margin;
        this.chartWidthWithoutMargin = this.chartWidth - this.margin;
        this.xScale = null;
        this.yScale = null;
        this.tooltipContainer = null;
    }

    rowChart() {
        this.createSvg();
        this.initScales();
        this.drawAxes();
        this.drawBar();
    }

    createSvg() {
        this.chart = this.chartContainer
            .append('svg')
            .attr('width', this.chartWidth)
            .attr('height', this.chartHeight);
    }

    initScales() {
        // console.log(+this.chart.attr('width'));
        let chartWidth = +this.chart.attr('width') - this.margin;
        let chartHeight = +this.chart.attr('height') - this.margin;

        this.xScale = d3.scaleLinear().domain([-5, 5]).range([this.margin, chartWidth]);
        this.yScale = d3.scaleLinear().domain([1979, 2020]).range([chartHeight, this.margin]);
    }

    drawAxes() {
        let yAxis = d3.axisLeft(this.yScale);
        let xAxis = d3.axisBottom(this.xScale);

        this.chart
            .append('g')
            .attr('class', 'c-axis')
            .attr('transform', 'translate(' + this.margin + ', 0)')
            .call(yAxis)
            .append('g')
            .append('text')
            .attr("fill", "currentColor")
            .attr('x', '0')
            .attr('dy', '2.5em')
            .attr('font-size', 'larger')
            .text("Year");

        this.chart
            .append('g')
            .attr('class', 'c-axis')
            .attr('transform', 'translate(0, ' + this.chartHeightWithoutMargin + ')')
            .call(xAxis)
            .append('g')
            .append('text')
            .attr("fill", "currentColor")
            .attr('x', this.margin + this.chartWidthWithoutMargin / 2)
            .attr('dy', '3.5em')
            .attr('font-size', 'larger')
            .text("SOI Index");
    }

    drawBar() {

        let line = d3.line()
            .x((d) => {
                return this.yScale(d.year);
            })
            .y((d) => {
                return this.xScale(d.SOI);
            });

        // bar
        this.chart.selectAll()
            .data(this.SOIDimension.top(Infinity))
            .enter()
            .append('rect')
            .attr('class', 'c-bar')
            .attr('y', (d) => this.yScale(d.year))
            .attr('x', (d) => this.margin)
            .attr('width', (d) => this.xScale(d.SOI) - this.margin)
            .attr('height', () => this.chartHeightWithoutMargin / 45)
            .on('mouseover', (d) => {
                this.showTooltip(
                    parseInt(d.year) + ':  ' + Math.round(d.SOI * 100) / 100,
                    d3.event.pageX,
                    d3.event.pageY
                );
            })
            .on('mouseout', (d) => {
                this.hideTooltip();
            })
            .on('mousemove', (d) => {
                this.hideTooltip();
                this.showTooltip(
                    parseInt(d.year) + ':  ' + Math.round(d.SOI * 100) / 100,
                    d3.event.pageX,
                    d3.event.pageY
                );
            });

        // Absline
        this.chart
            .append('g')
            .attr('class', 'abs-line')
            .append('path')
            .attr('d', line([{
                year: 1979,
                SOI: 0
            }, {
                year: 2020,
                SOI: 0
            }]))

    }

    createTooltipIfDoesntExist() {
        if (this.tooltipContainer !== null) {
            return;
        }

        this.tooltipContainer = this.chartContainer
            .append('div')
            .attr('class', 'c-tooltip')
    }

    showTooltip(content, left, top) {
        this.createTooltipIfDoesntExist();

        this.tooltipContainer
            .html(content)
            .style('left', left + 10 + 'px')
            .style('top', top - 50 + 'px');

        this.tooltipContainer
            .transition()
            .duration(100)
            .style('opacity', 1);
    }

    hideTooltip() {
        this.createTooltipIfDoesntExist();

        this.tooltipContainer
            .transition()
            .duration(300)
            .style('opacity', 0);
    }
}

function loadChart() {
    d3.dsv(',', 'https://raw.githubusercontent.com/lessthan41/D3_Practice/master/Climate_HW6/SOI.csv', function(row) {
        return {
            year: +row['Year'],
            month: row['Month'],
            SOI: +row['SOI']
        };
    }).then(function(SOI) {


        let i, j;
        let afterAdjust = new Array;
        for (i = 1980; i < 2019; i++) {
            for (j = 0; j < 12; j++) {
                let sum = 0;
                if (SOI[12 * (i - 1980) + j].year == i) {
                    // console.log(SOI[j + k*(i-1980)]);
                    sum += SOI[12 * (i - 1980) + j].SOI;
                }
                afterAdjust[i - 1980] = {
                    'year': i,
                    SOI: sum / 12
                }
            }
        }

        // console.log(afterAdjust);
        afterAdjust = crossfilter(afterAdjust);

        var rowChart = new Chart(afterAdjust, '#overviewChart');
        rowChart.rowChart();

    });
}
