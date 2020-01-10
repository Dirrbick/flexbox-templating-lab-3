'use strict';

function Horns(item) {
  this.url = item.image_url;
  this.title = item.title;
  this.desc = item.description;
  this.keyword = item.keyword;
  this.numhorns = item.horns;
}

Horns.allHorns = [];

Horns.prototype.render = function() {
  $('#photo-template').append('<div class="copy"></div>');
  let $hornsCopy = $('div[class = "copy"]');
  let $hornsHTML = $('.testclass').html();

  $hornsCopy.html($hornsHTML);
  $hornsCopy.find('h2').text(this.title);
  $hornsCopy.find('img').attr('src', this.url);
  $hornsCopy.find('p').text(this.desc);
  $hornsCopy.removeClass('copy');
  $hornsCopy.attr('class', this.keyword);
};

Horns.readJson = () => {
  $.get('../data/page-1.json')
    .then(data => {
      data.forEach(item => {
        Horns.allHorns.push(new Horns(item));
      });
    })
    .then(Horns.loadHorns)
    .then(Horns.keywordFilter)
    .then(Horns.filterHandler);

};

Horns.loadHorns = () => {
  Horns.allHorns.forEach(Horns => Horns.render());
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
      $('div').hide();

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
      $('.testclass').hide();
    }

  });
};

$(() => Horns.readJson());
