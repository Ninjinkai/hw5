$(function () {
    'use strict';

    //Cache the task list, input form, input button, and text input box
    var $list = $('ul');
    var $newItemForm = $('#newItemForm');
    var $enterButton = $('#add');
    var $itemDescription = $('#itemDescription');

    //Load list from local storage
    //NOT FUNCTIONAL: $list is not a JSON object
//    var $listData = localStorage.getItem("listData");
//    $list.append(JSON.parse($listData));

    //Save list to local storage
    //NOT FUNCTIONAL: $list is not a JSON object
//    function saveList() {
//        localStorage.setItem("listData", $list);
//    }

    //Update incomplete items counter
    function updateCount() {
        var $items = $('li[class!=complete]').length;
        $('#counter').text($items);
    }

    //Finish loading page and show input box
    updateCount();
    $newItemForm.show();

    //Clear editing controls, then reset input form
    //This is called whenever a task is added or changed
    function removeEditMode() {
        var $editItem = $('#editItem');
        var $editParent = $editItem.parent();
        //Remove editing state from list item and buttons
        $editItem.removeClass('editing');
        $editItem.removeAttr("id", "editItem");
        $editParent.removeClass('editing');
        $enterButton.val('add');
        $newItemForm.removeClass('editMode');
        //Reset input box
        $itemDescription.val('');
        $itemDescription.attr("placeholder", "Add a task");
        updateCount();
    }

    //Handle submission of an edit or a new item
    $newItemForm.on('submit', function (event) {
        event.preventDefault();
        var $this = $(this);
        var $text = $itemDescription.val();
        //Update edited item text
        if ($newItemForm.hasClass('editMode')) {
            var $editItem = $('#editItem');
            var $editParent = $editItem.parent();
            $editItem.text($text);
        } else {
        //Add a new item
            $list.append('<li><div class="notDone" /><div class="itemText">' + $text + '</div><div class="trash" /></li>');
        }
        removeEditMode();
//        saveList();
    });

    //Delete an item when the trash icon is clicked
    $list.on('click', '.trash', function (event) {
        //Prevent click from falling through to another element
        event.stopPropagation();
        var $this = $(this);
        var $parent = $this.parent();
        removeEditMode();
        //Animate list item being removed
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

    //Mark an item as done when the red box is clicked
    $list.on('click', '.notDone', function (event) {
        //Prevent click from falling through to another element
        event.stopPropagation();
        var $this = $(this);
        var $parent = $this.parent();
        removeEditMode();
        //Change item state from not done to done
        $this.removeClass('notDone');
        $this.addClass('done');
        $parent.addClass('complete');
        updateCount();
//        saveList();
    });

    //Mark an item as not done when the green box is clicked
    $list.on('click', '.done', function (event) {
        //Prevent click from falling through to another element
        event.stopPropagation();
        var $this = $(this);
        var $parent = $this.parent();
        removeEditMode();
        //Change item state from done to not done
        $this.removeClass('done');
        $this.addClass('notDone');
        $parent.removeClass('complete');
        updateCount();
//        saveList();
    });

    //Enable editing of an item's text when the item is clicked
    $list.on('click', 'li', function (event) {
        var $this = $(this);
        var $toEdit = $this.children('.itemText');
        var $text = $toEdit.text();
        removeEditMode();
        //Add editing state to list item
        $toEdit.addClass('editing');
        $toEdit.attr("id", "editItem");
        $this.addClass('editing');
        //Put item text into input box for editing
        $itemDescription.val($text);
        $itemDescription.attr("placeholder", "Edit task");
        $itemDescription.focus();
        //Change button to show editing is active
        $enterButton.val('edit');
        $newItemForm.addClass('editMode');
    });

});
