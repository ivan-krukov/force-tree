var draw = function(graph) {

  var node_radius = 6;
  var tree_scale = document.getElementById("tree_scale_input").value;

  var simulation = d3.forceSimulation(graph.nodes)
  .force("charge", d3.forceManyBody())
  .force("link", d3.forceLink(graph.links)
    .strength(1)
    .distance(function(link) {
      return link.value * tree_scale;
    }))
  .on("tick", ticked);

  var canvas = document.querySelector("canvas"),
  context = canvas.getContext("2d"),
  width = canvas.width,
  height = canvas.height;

  d3.select(canvas)
  .call(d3.drag()
    .container(canvas)
    .subject(drag_subject)
    .on("start", drag_started)
    .on("drag", dragged)
    .on("end", drag_ended));

  function ticked() {
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);

    context.beginPath();
    graph.links.forEach(draw_link);
    context.strokeStyle = "#999";
    context.stroke();

    context.beginPath();
    context.fillStyle = "#FF7919";
    graph.nodes.forEach(draw_node);
    context.fill();

    context.beginPath();
    context.fillStyle = "#555";
    context.font = "15px sans";
    graph.nodes.forEach(label_node);
    context.fill();

    context.strokeStyle = "#FFF";
    context.stroke();

    context.restore();
  }

  function drag_subject() {
    return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
  }

  function drag_started() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  function drag_ended() {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  function draw_link(d) {
    context.moveTo(d.source.x, d.source.y);
    context.lineTo(d.target.x, d.target.y);
  }

  function draw_node(d) {
    var radius = d.leaf ? node_radius : node_radius/2;

    context.moveTo(d.x + radius, d.y);
    context.arc(d.x, d.y, radius, 0, 2 * Math.PI);
    
  }

  function label_node(d) {
    context.moveTo(d.x + node_radius, d.y);
    context.fillText(d.label, d.x + (2 * node_radius), d.y + node_radius);
  }
};

var parse = function() {
  var tree_input = document.getElementById("tree_input");
  var tree = newick.to_json(tree_input.value);
  console.log(tree);
  var graph = newick.to_link_node(tree);
  console.log(graph);
  draw(graph);
};