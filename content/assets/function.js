/* ========================================================================== *
 * (C) Copyright 2019 Robert Grimm
 * ========================================================================== */

var options = document.currentScript.dataset;

function addReferencesFooter() {
  /* Only add references if article doesn't already have a footer with them. */
  var article = document.querySelector('main > article');
  if (!article || article.querySelector('footer.references')) return;

  /* Create the new footer containing the references. */
  var footer = document.createElement('footer');
  footer.classList.add('references');

  var h2 = document.createElement('h2');
  h2.innerText = 'References';
  if (options.h2) h2.className = options.h2;
  var div = document.createElement('div');
  div.classList.add('heading');
  div.appendChild(h2);
  footer.appendChild(div);

  var ol = document.createElement('ol');
  footer.appendChild(ol);

  var hyperlinks = article.querySelectorAll('a[href]');
  for (var i=0; i<hyperlinks.length; i++) {
    var href = hyperlinks[i].href;
    if (!href.startsWith('https://apparebit.com')) {
      var link = document.createElement('a');
      link.href = href;
      link.innerText = href;
      var li = document.createElement('li');
      li.appendChild(link);
      ol.appendChild(li);
    }
  }

  /* Add footer to article. */
  article.appendChild(footer);
}

/* Only add references iff the body has class `print-references`. */
if (document.body.classList.contains('print-references')) {
  window.onbeforeprint = addReferencesFooter;
  var queries = window.matchMedia('print');
  queries.addListener(function(mql) {
    if (mql.matches) {
      addReferencesFooter();
    }
  });
}
