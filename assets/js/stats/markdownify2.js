function createElements(line, el, regEx) {
  const elIsParagraph = el === 'p';
  const elIsHeading = el === 'h3';
  let element = document.createElement(el);
  if ( elIsParagraph ) {
    element.innerHTML = line;
  } else if ( elIsHeading ) {
    element.classList.add('blue-heading', 'mt-4', 'mb-3');
    element.innerHTML = line.replace(regEx, '');
  }
  return element.outerHTML;
}

function markdownToHTML(line, newLines) {
  const markdownItems = {
    'h3': /^##\s/g,
    'p': /^.[^#<->].+/g
  }
  const lineIsNotBlank = line != '';
  if (lineIsNotBlank) {
    for (var key in markdownItems) {
      if (markdownItems.hasOwnProperty(key)) {
        let lineMatchesTest = line.search(markdownItems[key]) != -1;
        if (lineMatchesTest) {
          line = createElements(line, key, markdownItems[key]);
          newLines.push(line);
          return newLines;
        }
      }
    }
  }
}

function iterateLines(lines, newLines) {
  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    let nextLine = lines[i + 1];
    let prevLineCount = i - 1;
    let prevLine = false;
    if (i > 0) {
      prevLine = lines[prevLineCount];
    }
    const lineContainsListItem = line.search(/^-\s/g) != -1;
    const nextLineContainsListItem = nextLine.search(/^-\s/g) != -1;
    const prevLineContainsListItem = prevLine.search(/^-\s/g) != -1;
    if (lineContainsListItem) {
      if (i > 0 && prevLineContainsListItem) {

      }
      createList(line, newLines);
    } else {
      markdownToHTML(line, newLines);
    }
  }
  return newLines;
}

function testForMarkdown(blurb) {
  const lineEnding = /\n/g;
  let lines = blurb.toString().split(lineEnding);
  let newLines = [];
  let newBlurb = iterateLines(lines, newLines);
  return newBlurb;
}

export default testForMarkdown;
