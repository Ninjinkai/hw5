$(function() {

  // SETUP
  var $list, $newItemForm, $newItemButton;
  var item = '';                                 // item is an empty string
  $list = $('ul');                               // Cache the unordered list
  $newItemForm = $('#newItemForm');              // Cache form to add new items
  $newItemButton = $('#newItemButton');          // Cache button to show form
    var $editButton = $('#add');

  $('li').hide().each(function(index) {          // Hide list items
    $(this).delay(450 * index).fadeIn(1600);     // Then fade them in
  });

  // ITEM COUNTER
  function updateCount() {                       // Create function to update counter
    var items = $('li[class!=complete]').length; // Number of items in list
    $('#counter').text(items);                   // Added into counter circle
  }
    updateCount();                               // Call the function
    $newItemForm.show();                         // Show the form

  // ADDING A NEW LIST ITEM
    $newItemForm.on('submit', function(e) {       // When a new item is submitted
        e.preventDefault();                       // Prevent form being submitted
        var $this = $(this);
        var text = $('input:text').val();         // Get value of text input
        var $editItem = $('#editItem');
        var $editParent = $editItem.parent();

        if ($newItemForm.hasClass('editMode')) {
            $editItem.val(text);
            $editItem.removeClass('editing');
            $editItem.removeAttr("id", "editItem");
            $editParent.removeClass('editing');
            $editButton.val('add');
            $newItemForm.removeClass('editMode');
        }
        else {
            $list.append('<li><div class="notDone">done?</div><div class="itemText">' + text + '</div><div class="trash">trash</div></li>');      // Add item to end of the list
        }
    $('input:text').val('');                  // Empty the text input
        updateCount();                            // Update the count
    });

    $list.on('click', '.trash', function () {
        var $this = $(this);
        var $parent = $this.parent();
        $('#editItem').removeClass('editing');
        $parent.removeClass('editing');
        $parent.addClass('complete');
        $parent.animate({
            opacity: 0.0,
            paddingLeft: '+=180'
        }, 500, 'swing', function() {
            $parent.remove();
        });
        updateCount();
    });

    $list.on('click', '.notDone', function () {
        var $this = $(this);
        var $parent = $this.parent();
        $('#editItem').removeClass('editing');
        $parent.removeClass('editing');
        $this.removeClass('notDone');
        $this.addClass('done').text('DONE!');
        $parent.addClass('complete');
        updateCount();
    });

    $list.on('click', '.done', function () {
        var $this = $(this);
        var $parent = $this.parent();
        $('#editItem').removeClass('editing');
        $parent.removeClass('editing');
        $this.removeClass('done');
        $this.addClass('notDone').text('done?');
        $parent.removeClass('complete');
        updateCount();
    });

    $list.on('click', '.itemText', function () {
        var $this = $(this);
        var $parent = $this.parent();
        var $editBox = $('#itemDescription');
        var $text = $this.text();
        $this.addClass('editing');
        $this.attr("id", "editItem");
        $parent.addClass('editing');
        $editBox.val($text);
        $editButton.val('edit');
        $newItemForm.addClass('editMode');
    });

});
