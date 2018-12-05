import angular from 'angular';
import { DeepValueGetter } from '../../utils/utils';
import { TranslateXY } from '../../utils/translate';

export class RowController {

  /**
   * Returns the value for a given column
   * @param  {col}
   * @return {value}
   */
  getValue(col){
    if(!col.prop) return '';
    return DeepValueGetter(this.row, col.prop);
  }

  /**
   * Invoked when a cell triggers the tree toggle
   * @param  {cell}
   */
  onTreeToggled(cell){
    this.onTreeToggle({
      cell: cell,
      row: this.row
    });
  }

  /**
   * Calculates the styles for a pin group
   * @param  {group}
   * @return {styles object}
   */
  stylesByGroup( group){
    var styles = {
      width: this.columnWidths[group] + 'px',
      height: this.options.rowHeight + 'px'
    };

    if(group === 'left'){
      TranslateXY(styles, this.options.internal.offsetX, 0);
    } else if(group === 'right'){
      var offset = (((this.columnWidths.total - this.options.internal.innerWidth) -
        this.options.internal.offsetX) + this.options.internal.scrollBarWidth) * -1;
      TranslateXY(styles, offset, 0);
    }

    return styles;
  }

  /**
   * Invoked when the cell directive's checkbox changed state
   */
  onCheckboxChanged(ev){
    this.onCheckboxChange({
      $event: ev,
      row: this.row
    });
  }

  /**
   * Returns the corrects styles for the cell
   *
   * @returns {{width: string, height: string}}
   */
  getStyles(){
    if(this.columns['left'] && this.columns['left'].length > 0){
      return this.stylesByGroup('left')
    } else if(this.columns['right'] && this.columns['right'].length > 0){
      return this.stylesByGroup('right')
    } else{
      return this.stylesByGroup('center')
    }
  }

  /**
   * Get the correct column depending if it is in center, left ot right
   *
   * @returns {*}
   */
  getColumns(){
    if(this.columns['left'] && this.columns['left'].length > 0){
      return this.columns['left'];
    } else if(this.columns['right'] && this.columns['right'].length > 0){
      return this.columns['right'];
    } else{
      return this.columns['center'];
    }
  }

  /**
   * Get the class for the row
   *
   * @returns {string}
   */
  getRowStyle(){
    if(this.columns['left'] && this.columns['left'].length > 0){
      return 'dt-row-left';
    } else if(this.columns['right'] && this.columns['right'].length > 0){
      return 'dt-row-right';
    } else{
      return 'dt-row-center';
    }
  }
}
