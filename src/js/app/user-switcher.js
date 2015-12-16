define([
    "jquery",
    "fuse",
    "bootbox"
], function(
    $,
    Fuse,
    bootbox
) {
    $(function() {

        userSwitcher = function() {

            var $menuItem = $('#fusion-lib-switch-user');
            var dialog = null;
            var fuse = null;

            var getDialog = function() {
                var deferred = $.Deferred();

                if(dialog) {
                    deferred.resolve(dialog);
                } else {
                    $.ajax('/find-user-ajax')
                    .done(function(data) {
                        fuse = new Fuse(data, {
                            keys: ['email','forename','surname'],
                            threshold: 0
                        });

                        dialog = '<div class="row">  ' +
                                    '<div class="col-md-12"> ' +
                                        '<form class="form-horizontal"> ' +
                                        '<div class="form-group"> ' +
                                            '<label class="col-md-1 control-label" for="user-switcher-search">Name</label> ' +
                                            '<div class="col-md-9"> ' +
                                                '<input id="user-switcher-search" name="user-switcher-search" type="text" placeholder="Type a name to search..." class="form-control input-md"> ' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' + 
                                '<div class="row">' +
                                    '<div class="col-md-12">' +
                                        '<table id="user-switcher-search-results" class="table table-striped">' + 
                                            '<thead>' +
                                                '<tr>' + 
                                                '<th>email</th><th>name</th><th></th>' +
                                                '</tr>' +
                                            '</thead>' +
                                            '<tbody style="overflow-y: auto;"></tbody>' + 
                                        '</table>' +
                                    '</div>' +
                                '</div>'
                                ;
                        deferred.resolve(dialog);
                     })
                     .fail(function(err) {
                        deferred.fail(err);
                     });
                }

                return deferred.promise();
            }

            if($menuItem.length < 1) {
                return;
            }

            $menuItem.on('click', function() {

                getDialog()
                .done(function(dialog) {
                    var $dialog = bootbox.dialog({
                      title: "Switch User",
                      message: dialog,
                      show: false,
                    });

                    $dialog.on('shown.bs.modal', function() {
                        $dialog.addClass('user-switcher');
                        $('#user-switcher-search').on('keyup', function() {
                            search = $('#user-switcher-search').val();
                            users = fuse.search(search);

                            var tableBodyContent = '';
                            for(var i = 0; i < users.length; i++) {
                                    
                                    tableBodyContent +=
                                        '<tr>' +
                                            '<td>' + users[i].email + '</td>' +
                                            '<td>' + users[i].forename + ' ' + users[i].surname  + '</td>' +
                                            '<td><button data-email="' + users[i].email + '" class="btn btn-default colour orange user-switcher-switch">Switch</button></td>' +
                                        '</tr>';
                                }
                                
                                $('#user-switcher-search-results tbody').html(tableBodyContent);
                        });

                        $('#user-switcher-search-results').on('click','button.user-switcher-switch', function() {
                            document.location = '/switch-to-user/' + $(this).data('email');
                        })
                    });

                    $dialog.modal("show");
                });

            });
        };

    });
});