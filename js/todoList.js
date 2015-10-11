$(function () {

    //Cache key elements
    var $list = $('ul');
    var $newItemForm = $('#newItemForm');
    var $enterButton = $('#add');
    var $itemDescription = $('#itemDescription');

    //Load list from local storage
    //NOT FUNCTIONAL
//    var $listData = localStorage.getItem("listData");
//    $list.append(JSON.parse($listData));

    //List loading animation
    $('li').hide().each(function (index) {
        $(this).delay(450 * index).fadeIn(1600);
    });

    //Update incomplete items counter
    function updateCount() {
        var $items = $('li[class!=complete]').length;
        $('#counter').text($items);
    }

    //Save list to local storage
    //NOT FUNCTIONAL
//    function saveList() {
//        localStorage.setItem("listData", JSON.stringify($list));
//    }

    //Clear editing controls, reset input box
    function removeEditMode() {
        var $editItem = $('#editItem');
        var $editParent = $editItem.parent();
        $editItem.removeClass('editing');
        $editItem.removeAttr("id", "editItem");
        $editParent.removeClass('editing');
        $enterButton.val('add');
        $newItemForm.removeClass('editMode');
        $('input:text').val('');
        $itemDescription.attr("placeholder", "Add a task");
        updateCount();
    }

    //Finish loading page and show input box
    updateCount();
    $newItemForm.show();

    //Handle a new item addition or editing completion
    $newItemForm.on('submit', function (event) {
        event.preventDefault();
        var $this = $(this);
        var $text = $('input:text').val();
        if ($newItemForm.hasClass('editMode')) {
            var $editItem = $('#editItem');
            var $editParent = $editItem.parent();
            $editItem.text($text);
        } else {
            $list.append('<li><div class="notDone" /><div class="itemText">' + $text + '</div><div class="trash" /></li>');
        }
        removeEditMode();
//        saveList();
    });

    //Delete an item
    $list.on('click', '.trash', function (event) {
        event.stopPropagation();
        var $this = $(this);
        var $parent = $this.parent();
        removeEditMode();
        $parent.addClass('complete');
        $parent.animate({
            opacity: 0.0,
            paddingLeft: '+=180'
        }, 500, 'swing', function () {
            $parent.remove();
        });
        updateCount();
//        saveList();
    });

    //Mark an item as done
    $list.on('click', '.notDone', function (event) {
        event.stopPropagation();
        var $this = $(this);
        var $parent = $this.parent();
        removeEditMode();
        $this.removeClass('notDone');
        $this.addClass('done');
        $parent.addClass('complete');
        updateCount();
//        saveList();
    });

    //Mark an item as not done
    $list.on('click', '.done', function (event) {
        event.stopPropagation();
        var $this = $(this);
        var $parent = $this.parent();
        removeEditMode();
        $this.removeClass('done');
        $this.addClass('notDone');
        $parent.removeClass('complete');
        updateCount();
//        saveList();
    });

    //Enable editing of an item's text
    $list.on('click', 'li', function (event) {
        var $this = $(this);
        var $toEdit = $this.children('.itemText');
        var $editBox = $('#itemDescription');
        var $text = $toEdit.text();
        removeEditMode();
        $toEdit.addClass('editing');
        $toEdit.attr("id", "editItem");
        $this.addClass('editing');
        $itemDescription.val($text);
        $itemDescription.attr("placeholder", "Edit task");
        $enterButton.val('edit');
        $newItemForm.addClass('editMode');
        $itemDescription.focus();
    });

});
