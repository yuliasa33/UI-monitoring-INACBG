import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
  standalone:true,
  imports:[CommonModule,
          ButtonModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'atom-button',
  templateUrl: './atom-button.component.html',
  styleUrls: ['./atom-button.component.scss']
})
export class AtomButtonComponent {
    @Input('button-label') buttonLabel:any
    @Input('severity') severity:'secondary'|'success'|'info'|'warning'|'help'|'danger'|'contrast'|undefined = undefined
    @Input('iconProps') iconProps:any

    @Input('styleClass') styleClass:any

    @Output('PrimengClickButtons') PrimengClickButtons = new EventEmitter<any>()


    handleClickButton(args:any):void{
      this.PrimengClickButtons.emit(args)
    }
}
