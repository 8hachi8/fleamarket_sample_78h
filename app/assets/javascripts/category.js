$("turbolinks:load", function(){
  // ボックスのオプション
  function appendOption(category){
    var html =`<option value="${category.id}" data-category="${category.id}">${category.name}</option>`;
    return html;
  }
  // 子カテゴリー表示のHTML
  function appendChildrenBox(insertHTML){
    // 一旦初期化
    var childSelectHTML = ''
    childSelectHTML = `<div class='listing-select-wrapper__added' id= 'children_wrapper'>
                        <div class='listing-select-wrapper__box'>
                          <select class="listing-select-wrapper__box--select" id="child_category" name="item[category_id]">
                            <option value="選択して下さい" data-category="選択して下さい">選択して下さい</option>
                            ${insertHTML}
                          </select>
                        </div>
                      </div>`;
    $('.detail-box__category-select').append(childSelectHTML);
  }
  // 孫カテゴリー表示のHTML
  function appendGrandchildrenBox(insertHTML){
    var grandchildSelectHTML = '';
    grandchildSelectHtml = `<div class='listing-select-wrapper__added' id= 'grandchildren_wrapper'>
                              <div class='listing-select-wrapper__box'>
                                <select class="listing-select-wrapper__box--select" id="grandchild_category" name="item[category_id]">
                                  <option value="選択して下さい" data-category="選択して下さい">選択して下さい</option>
                                  ${insertHTML}
                                </select>
                              </div>
                            </div>`;
    $('.detail-box__category-select').append(grandchildSelectHtml);
  }
  // 親カテゴリー選択時
  $('#parent_category').on('change',function(){
    var parentCategory = document.getElementById('parent_category').value;
    if (parentCategory != "選択して下さい"){
      $.ajax({
        url: 'get_category_children',
        type: "GET",
        data: { parent_name: parentCategory },
        dataType: 'json'
      })
      .done(function(children){
        $('#children_wrapper').remove();
        $('#grandchildren_wrapper').remove();
        var insertHTML = '';
        children.forEach(function(child){
          insertHTML += appendOption(child)
        });
        appendChildrenBox(insertHTML);
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#children_wrapper').remove();
      $('#grandchildren_wrapper').remove();
    }
  });

  $('.listing-product-detail__category').on('change', '#child_category', function(){
    var childId = $('#child_category option:selected').data('category');
    // ここまではOK
    if (childId != "選択して下さい"){
      $.ajax({
        url: 'get_category_grandchildren',
        type: 'GET',
        data: { child_id: childId },
        dataType: 'json'
      })
      .done(function(grandchildren){
        if (grandchildren.length != 0){
          $('#grandchildren_wrapper').remove();
          var insertHTML = '';
          grandchildren.forEach(function(grandchild){
            insertHTML += appendOption(grandchild);
          });
          appendGrandchildrenBox(insertHTML);
        }
      })
      .fail(function(){
        alert('カテゴリー取得に失敗しました');
      })
    }else{
      $('#grandchildren_wrapper').remove();
    }
  });
});
