import { RowController } from './RowController';
import { TranslateXY } from '../../utils/translate';

export function RowDirective(){
  return {
    restrict: 'E',
    controller: RowController,
    controllerAs: 'rowCtrl',
    scope: true,
    bindToController: {
      row: '=',
      columns: '=',
      columnWidths: '=',
      expanded: '=',
      selected: '=',
      hasChildren: '=',
      options: '=',
      onCheckboxChange: '&',
      onTreeToggle: '&'
    },
    link: function($scope, $elm, $attrs, ctrl){
      if(ctrl.row){
        // inital render position
        TranslateXY($elm[0].style, 0, ctrl.row.$$index * ctrl.options.rowHeight);
      }

      // register w/ the style translator
      ctrl.options.internal.styleTranslator.register($scope.$index, $elm);
    },
    template: `
      <div class="dt-row">
        <div class="dt-row-block {{rowCtrl.getRowStyle()}}"
             ng-style="rowCtrl.getStyles()">
          <dt-cell ng-repeat="column in rowCtrl.getColumns() track by column.$id"
                   on-tree-toggle="rowCtrl.onTreeToggled(cell)"
                   column="column"
                   options="rowCtrl.options"
                   has-children="rowCtrl.hasChildren"
                   expanded="rowCtrl.expanded"
                   selected="rowCtrl.selected"
                   row="rowCtrl.row"
                   on-checkbox-change="rowCtrl.onCheckboxChanged($event)"
                   value="rowCtrl.getValue(column)">
          </dt-cell>
        </div>
      </div>`,
    replace:true
  };
};
