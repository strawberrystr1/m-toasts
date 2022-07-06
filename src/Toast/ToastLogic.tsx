import React from 'react';
import ReactDOM from 'react-dom';
import { ToastsWrapper } from './styled';
import { Position, Props, ToastView } from './Toast';

type StorageItem = { id: string; element: JSX.Element; isOpen: boolean }
export default class Toast {
  private static toast: Toast | null = null;
  storage: number[];
  private grab: boolean;
  private start: number;
  private lastPosition: Position;
  private idQueue: string[];
  private stackInfo: { [key: string]: string[] }

  private constructor() {
    this.storage = [];
    this.grab = false;
    this.start = 0;
    this.lastPosition = { vertical: 'bottom', horizontal: 'left', offset: 0 };
    this.createToast = this.createToast.bind(this);
    this.idQueue = []
    this.stackInfo = {
      'bottom-left': [],
      'bottom-right': [],
      'bottom-center': [],
      'top-left': [],
      'top-right': [],
      'top-center': [],
    }
  }

  public static getToast() {
    if (!Toast.toast) {
      Toast.toast = new Toast();
    }
    return Toast.toast;
  }

  // private startTimer(id: string, duration: number) {
  //   return setTimeout(() => {
  //     this.storage = this.storage.filter(el => el.id !== id);
  //     // this.render();
  //   }, duration);
  // }

  // private handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  //   this.grab = true;
  //   this.start = e.clientX;
  // };

  // private handleMouseUp = () => {
  //   this.grab = false;
  //   this.start = 0;
  // };

  // private handleMouseMove = (id: string) => {
  //   return (e: React.MouseEvent<HTMLDivElement>) => {
  //     if (this.grab) {
  //       if (Math.abs(this.start - e.clientX) > 100) {
  //         this.storage = this.storage.filter(el => el.id !== id);
  //         // this.render()
  //       }
  //     }
  //   };
  // };

  createToast(props: Props) {
    const unicId = `${props.message}-${props.title ? props.title : ''}`;

    if (props.position) {
      this.lastPosition = props.position;
    } else {
      this.lastPosition = { vertical: 'bottom', horizontal: 'left', offset: 0 };
    }

    const key = `${this.lastPosition.vertical}-${this.lastPosition.horizontal}`
  
    this.toggle(unicId, props.open, key)

    const nextProps = {
      ...props,
      // onMouseDown: this.handleMouseDown,
      // onMouseUp: this.handleMouseUp,
      // onMouseMove: this.handleMouseMove(unicId),
    };
    const newToast = ToastView(nextProps);
    // if (props.autohideDuration) {
    //   this.startTimer(unicId, props.autohideDuration);
    // }

    const portal = document.getElementById(`portal-${unicId}`)
    if (portal) {
      return ReactDOM.createPortal((
        props.open && <ToastsWrapper>
          {newToast}
        </ToastsWrapper>
      ), portal)
    }
    return null
  }

  private toggle(id: string, isOpen: boolean, key: string) {
    if (isOpen) {
      if (!this.stackInfo[key].includes(id)) {
        this.stackInfo[key].push(id)
      }
    } else  {
      this.stackInfo[key] = this.stackInfo[key].filter(el => el !== id)
    }
  }

  calculateOffset(id: string, key: string) {
    return this.stackInfo[key].findIndex(el => el === id)
  }
}
