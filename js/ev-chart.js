const svg = d3.select("#d3-ev-chart"),
  margin = {top: 20, right: 30, bottom: 40, left: 50},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

const data = Array.from({length: 20}, (_, i) => {
  const p = 0.05 + i * 0.045;
  const odds = 2.0;
  const ev = p * odds - 1;
  return {prob: p, ev};
});

const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
const y = d3.scaleLinear().domain([d3.min(data, d => d.ev), d3.max(data, d => d.ev)]).range([height, 0]);

const line = d3.line()
  .x(d => x(d.prob))
  .y(d => y(d.ev));

g.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "green")
  .attr("stroke-width", 2)
  .attr("d", line);

g.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x).ticks(10).tickFormat(d3.format(".0%")));

g.append("g")
  .call(d3.axisLeft(y));

g.append("text")
  .attr("x", width / 2)
  .attr("y", height + margin.bottom - 5)
  .attr("text-anchor", "middle")
  .text("Probability");

g.append("text")
  .attr("x", -height / 2)
  .attr("y", -35)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Expected Value");
