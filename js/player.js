function singleArticle(article) {
    console.log("web/viewer.html?file=https://cors-anywhere.herokuapp.com/" + "https://damp-meadow-03187.herokuapp.com/" + article['link']);
    $("#mediaplayer").attr("src", "web/viewer.html?file=https://cors-anywhere.herokuapp.com/" + "https://damp-meadow-03187.herokuapp.com/" + article['link']);
}

// Функция создания кнопки
function createButton(name, value, spanned = false) {
    var button = document.createElement('button');
    if (spanned) {
        var span = document.createElement('span')
        span.innerHTML = name;
        button.appendChild(span);
    } else {
        var t = document.createTextNode(name);
        button.appendChild(t);
    }
    button.type = 'button';
    button.value = value;
    return button;
}

// Функция отображения списка видео для одного занятия
function showPage(id) {
    var current_lesson = document.getElementById(id);
    var list = document.getElementById("medialist");
    list.insertBefore(current_lesson, list.childNodes[0]);
}

// Создание кнопки для занятий
function createPage(lesson, menu) {
    var page_button = createButton((lesson), "opt" + lesson.toString());
    page_button.addEventListener("click", function() {
        showPage(this.value);
        var current = menu.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
    })

    if (lesson == 1) {
        page_button.className += " active";
    }

    return page_button
}

// Создание списка видео внутри одного занятия
function createReader(video_json, list) {
    var video_button = createButton(video_json['name'], JSON.stringify(video_json), true);

    video_button.addEventListener("click", function() {
        let json = JSON.parse(this.value);

        singleArticle(json);

        let current = list.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
        this.className += " active";
    })

    return video_button
}

function createPagination(array) {
    var index = 0;
    var arrayLength = array.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += 5) {
        myChunk = array.slice(index, index+5);
        tempArray.push(myChunk);
    }

    result_array = [];

    for (i = 0; i < tempArray.length; i++){
      result_array.push({"page": i + 1, "files": tempArray[i]});
    }
    return result_array;
}

// Создание меню с видео
function createMedialist(data, menu_id, list_id) {
    var list = document.getElementById(list_id);
    var menu = document.getElementById(menu_id);

    var articles = data['result'];

    articles = createPagination(articles);

    for (i = 0; i < articles.length; i++) {
        let page = articles[i]['page']
        let files = articles[i]['files'];

        let page_button = createPage(page, menu);
        var doc_list = document.createElement('div');
        doc_list.className = "option";
        doc_list.id = "opt" + page.toString();

        for (j = 0; j < files.length; j++) {
            let file = files[j];
            let pdf_element = createReader(file, list);
            if (page == 1 &&  j == 0) {
              pdf_element.className += " active";
            }
            doc_list.appendChild(pdf_element);
        }

        menu.append(page_button);
        list.append(doc_list);
    }
}
