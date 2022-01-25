let answerReport = []

function categoriseAnswer(data) {
  data.forEach((item) => {
    answerReport.push({
      letter: item[0],
      attempt: item[item.length - 1].length,
      skipped: item[0] != item[item.length - 1].at(-1),
      duration: item[2],
      confused: findConfused(item[0], data)
    });

  });
  console.log(answerReport);
}

function findConfused(l, data) {
  var confused = false;
  data.forEach((item) => {
    if (l != item[0])
      if (item.at(-1).find(a => a == l))
        confused = true;
  });
  return confused;
}

var scale = d3.scaleLinear()
  .domain([1000, 10000])
  .range([1, 6]);

function createReport(data) {
  categoriseAnswer(data);
  d3.select('#finalScore')
    .text(function () {
      var rightanswers = answerReport.filter(item => item.attempt == 1 && !item.skipped && !item.confused).length;
      var confusedanswers = answerReport.filter(item => item.attempt == 1 && !item.skipped && item.confused).length;
      var totalletters = answerReport.length;
      return ((rightanswers * 2) + (confusedanswers * 1) + ' / ' + totalletters * 2);
    });
  if (mode != 2) {
    d3.select('#rightAnswers')
      .html("<p class='report_category'>You identified these letters correctly</p>")
      .selectAll('div')
      .data(answerReport.filter(item => item.attempt == 1 && !item.skipped && !item.confused))
      .enter()
      .append('div')
      .attr('class', 'letter correct')
      .style('width', (d) => scale(d.duration) + 'em')
      .style('height', (d) => scale(d.duration) + 'em')
      .text(function (d) {
        return d.letter;
      });
    d3.select('#confusedAnswers')
      .html("<p class='report_category'>You have confused with these letters</p>")
      .selectAll('div')
      .data(answerReport.filter(item => item.attempt == 1 && !item.skipped && item.confused))
      .enter()
      .append('div')
      .attr('class', 'letter confused')
      .style('width', (d) => scale(d.duration) + 'em')
      .style('height', (d) => scale(d.duration) + 'em')
      .text(function (d) {
        return d.letter;
      });
    d3.select('#skippedAnswers')
      .html("<p class='report_category'>You skipped these letters</p>")
      .selectAll('div')
      .data(answerReport.filter(item => item.skipped))
      .enter()
      .append('div')
      .attr('class', 'letter skipped')
      .style('width', (d) => scale(d.duration) + 'em')
      .style('height', (d) => scale(d.duration) + 'em')
      .text(function (d) {
        return d.letter;
      });
    d3.select('#wrongAnswers')
      .html("<p class='report_category'>You wrongly identify these letters</p>")
      .selectAll('div')
      .data(answerReport.filter(item => item.attempt > 1 && !item.skipped))
      .enter()
      .append('div')
      .attr('class', 'letter wrong')
      .style('width', (d) => scale(d.duration) + 'em')
      .style('height', (d) => scale(d.duration) + 'em')
      .text(function (d) {
        return d.letter;
      });
  }
}
