import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component } from '@angular/core';
import { Toast } from 'ngx-toastr';

@Component({
  selector: 'notyf-toast-component',
  styles: [],
  template: `
    <div class="notyf__toast notyf__toast--success notyf__toast bg-pink-500 rounded-lg border border-gray-300 w-[300px] mx-auto shadow-lg absolute top-0 right-0 mt-12 mr-4" [@flyInOut]="state">
      <div class="notyf__wrapper">
        <div class="notyf__icon">
          <i class="notyf__icon--success" style="color: rgb(61, 199, 99);"></i>
        </div>
        <div class="notyf__message text-center p-3">{{ title }} {{ message }}</div>
      </div>
      <div class="notyf__ripple bg-green-700"></div>
    </div>
  `,
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      transition('inactive => active', animate('300ms ease-out')),
      state('active', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('active => removed', animate('300ms ease-out', keyframes([
        style({ opacity: 1, transform: 'translateY(0)' }),
        style({ opacity: 0, transform: 'translateY(-100%)' })
      ])))
    ])
  ],
})
export class NotyfToast extends Toast {}
