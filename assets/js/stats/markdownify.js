function replaceItem(markdown, el, regEx) {
  let newMarkdown;
  switch (el) {
    case 'h3':
      newMarkdown = markdown.replace(regEx, '<h3 class="blue-heading mt-4 mb-3">$<text></h3>');
      return newMarkdown;
      break;
    case 'p':
      newMarkdown = markdown.replace(regEx, '<p>$<text></p>');
      return newMarkdown;
      break;
    case 'li':
      newMarkdown = markdown.replace(regEx, '<li>$<text></li>');
      return newMarkdown;
      break;
    case 'ul':
      newMarkdown = markdown.replace(regEx, '<ul>');
      return newMarkdown;
      break;
    case '/ul':
      newMarkdown = markdown.replace(regEx, '</ul>');
      return newMarkdown;
      break;
  }
}

function testForMarkdown(blurb) {
  //console.log(blurb);
  let markdown = blurb.toString();
  const strongRegEx = /\*\*(?<text>.+)\*\*/gm;
  const removals = [
    /^<<<.*|^>>>.*/gm,
    /^$/gm
  ];
  const markdownObject = {
    'h3': /^##\s(?<text>.+)/gm,
    'p': /^(?<text>[^-{<#>\s].+)/gm,
    'li': /^-\s(?<text>.+)/gm,
    'ul': /{:list}/gm,
    '/ul': /{:!list}/gm
  };
  for (let key in markdownObject) {
    if (markdownObject.hasOwnProperty(key)) {
      markdown = replaceItem(markdown, key, markdownObject[key]);
    }
  }
  markdown = markdown.replace(strongRegEx, '<strong>$<text></strong>');
  for (var i = 0; i < removals.length; i++) {
    markdown = markdown.replace(removals[i], '');
  }
  //console.log(markdownHeadings);
  return markdown;
}

export default testForMarkdown;
