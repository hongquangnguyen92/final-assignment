app.directive("listitem", function() {
  return {
    restrict: 'E',
    template: '<div class="task form-control"><input type="checkbox"><span class="checkTask">Quang</span><span class="icon-pencil"></span></div>'
  };
});