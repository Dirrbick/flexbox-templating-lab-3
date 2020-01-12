'use strict';

function Horns(item) {
  for (let key in item) {
    this[key] = item[key];
  }
}
Horns.allHorns = [];

Horns.prototype.toHtml = function () {
  let template = $('#lab03Handlebars').html();
  let templateHandle = Handlebars.compile(template);
  $('#photo-template').append(templateHandle(this));
};

Horns.readJson = () => {
  $.get('../data/page-2.json')
    .then(data => {
      data.forEach(item => {
        Horns.allHorns.push(new Horns(item));
      });
    })
    .then(Horns.loadHorns)
    .then(console.log(Horns.allHorns))
    .then(Horns.keywordFilter)
    .then(Horns.filterHandler);

};

Horns.loadHorns = () => {
  Horns.allHorns.forEach(Horns => Horns.toHtml());
};

Horns.keywordFilter = () => {
  let keywordArr = [];

  $('option').not(':first').remove();

  Horns.allHorns.forEach(image => {
    if (!keywordArr.includes(image.keyword)) keywordArr.push(image.keyword);
  });

  keywordArr.sort();

  keywordArr.forEach(keyword => {
    let keyOption = `<option value="${keyword}">${keyword}</option>`;
    $('select').append(keyOption);
  });
};

Horns.filterHandler = () => {
  $('select').on('change', function() {
    let $selected = $(this).val();
    if ($selected !== 'default') {
      $selected.hide();
      Horns.allHorns.forEach(image => {
        if ($selected === image.keyword) {
          $(`div[class="${$selected}"]`).addClass('filtered').fadeIn();
          $(this.keyword).show();
        }
        
      });

      $(`option[value=${$selected}]`).fadeIn();
    } else {
      $('div').removeClass('filtered').fadeIn();
      $(`option[value=${$selected}]`).fadeIn();
    }

  });
};

$(() => Horns.readJson());
