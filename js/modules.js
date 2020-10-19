const example_data = {
    "result": [
        {
            "name": "Article1.pdf",
            "link": "https://www.ohchr.org/en/udhr/documents/udhr_translations/eng.pdf"
        },

        {
            "name": "Article2.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article3.pdf",
            "link": "https://www.unhcr.org/4ca34be29.pdf"
        },
        {
            "name": "Article4.pdf",
            "link": "https://www.icc-cpi.int/nr/rdonlyres/aDD16852-aee9-4757-aBe7-9CDC7Cf02886/283503/romestatuteng1.pdf"
        },

        {
            "name": "Article5.pdf",
            "link": "https://www.unodc.org/documents/middleeastandnorthafrica/organised-crime/UNITED_NATIONS_CONVENTION_AGAINST_TRANSNATIONAL_ORGANIZED_CRIME_AND_THE_PROTOCOLS_THERETO.pdf"
        },

        {
            "name": "Article6.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },
        {
            "name": "Article7.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article8.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article9.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },
        {
            "name": "Article10.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article11.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article12.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },
        {
            "name": "Article13.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article14.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article15.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },
        {
            "name": "Article16.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article17.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article18.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },
        {
            "name": "Article19.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        },

        {
            "name": "Article20.pdf",
            "link": "https://www.echr.coe.int/documents/convention_eng.pdf"
        }
    ]
}

function search_request(query) {

  return new Promise(function(resolve, reject) {
    var slug = get_slug();
    var xhr = new XMLHttpRequest();
    var url='https://app.ru/v1/query?query=' + query;
    //var url='http://127.0.0.1:5000/v1/video-access?email=' + email + '&slug=' + slug;
    xhr.open('GET', url, true);

    // 400, 404 — no need to retry, 403 — may be retied
    xhr.onload = function() {
      if(this.status==200) {
        resolve(JSON.parse(this.responseText));
      } else if(this.status==403) {
        resolve(JSON.parse(this.responseText));
      } else {
        var error = new Error(this.statusText);
        error.code = this.status;
        reject(error);
      }
    };

    xhr.onerror = function() {
      reject(new Error("Network Error"));
    };

    xhr.send();
  });
}


async function load_player() {
    var query = await search_query("Example: Perceptual deep depth super-resolution");
    // var result = await search_request(query);
    var result = example_data;
    if ('error' in result) {
      show_alert("Oops, something went wrong. Server response: " + JSON.stringify(result));
    }

    var firts_article = example_data['result'][0];
    singleArticle(firts_article);

    // Создание списка всех видеозаписей
    createMedialist(example_data, 'mediamenu', 'medialist');
}
