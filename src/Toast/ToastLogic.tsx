import React from 'react';
import ReactDOM from 'react-dom';
import { ToastsWrapper } from './styled';
import { GlobalStyle } from './theme';
import { Position, Props, ToastView } from './Toast';

type StorageItem = { id: string; element: JSX.Element; isOpen: boolean; order: number }
export default class Toast {
  private static toast: Toast | null = null;
  storage: StorageItem[];
  private grab: boolean;
  private start: number;
  private lastPosition: Position;
  private idQueue: string[];

  private constructor() {
    this.storage = [];
    this.grab = false;
    this.start = 0;
    this.lastPosition = { vertical: 'bottom', horizontal: 'left', offset: 0 };
    this.render = this.render.bind(this);
    this.createToast = this.createToast.bind(this);
    this.idQueue = []
  }

  public static getToast() {
    if (!Toast.toast) {
      Toast.toast = new Toast();
    }
    return Toast.toast;
  }

  private startTimer(id: string, duration: number) {
    return setTimeout(() => {
      this.storage = this.storage.filter(el => el.id !== id);
      // this.render();
    }, duration);
  }

  private handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    this.grab = true;
    this.start = e.clientX;
  };

  private handleMouseUp = () => {
    this.grab = false;
    this.start = 0;
  };

  private handleMouseMove = (id: string) => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (this.grab) {
        if (Math.abs(this.start - e.clientX) > 100) {
          this.storage = this.storage.filter(el => el.id !== id);
          // this.render()
        }
      }
    };
  };

  createToast(props: Props) {
    const unicId = `${props.message}-${props.title ? props.title : ''}`;
    if (props.position) {
      this.lastPosition = props.position;
    } else {
      this.lastPosition = { vertical: 'bottom', horizontal: 'left', offset: 0 };
    }

    const nextProps = {
      ...props,
      onMouseDown: this.handleMouseDown,
      onMouseUp: this.handleMouseUp,
      onMouseMove: this.handleMouseMove(unicId),
    };
    const newToast = ToastView(nextProps);

    if (props.autohideDuration) {
      this.startTimer(unicId, props.autohideDuration);
    }

    this.addToStorage(nextProps, unicId, newToast);

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

  calculateOffset(id: string) {
    const currentShow = this.storage.filter(el => el.isOpen).length
    const inQueue = [...this.idQueue].reverse().findIndex(el => el === id)

    return currentShow
  }

  private toggleOpenModal(id: string, isOpen: boolean) {
    if (isOpen) {
      if (!this.idQueue.includes(id)) {
        this.idQueue.push(id)
      }
      // const ind = this.idQueue.findIndex(el => el === id)
      // this.storage = this.storage.map(el => el.id === id ? ({...el, order: ind}) : el)
    } else {
      const ind = this.idQueue.findIndex(el => el === id)
      ind !== -1 && this.idQueue.splice(ind, 1)

      // this.storage = this.storage.filter(el => el.isOpen).map(el => {
      //   const indAfter = this.idQueue.findIndex(item => item === el.id)

      //   return ({...el, order: indAfter})
      // })
    }
  }

  private addToStorage(props: Props, id: string, toast: JSX.Element) {
    const currentIndex = this.storage.findIndex(el => el.id === id);
    if (currentIndex >= 0) {
      this.storage.splice(currentIndex, 1, {
        ...this.storage[currentIndex],
        isOpen: props.open,
      });
    } else {
      if (props.open) {
        this.storage.push({ element: toast, id, isOpen: props.open, order: 0 })
      }
    }
    this.toggleOpenModal(id, props.open)
  }

  render(id: string) {
    // const toast = this.storage.find(el => el.id === id)
    // return ReactDOM.createPortal(
    //   this.storage.map(el => {
    //     console.log(el.id === id)
    //     return el.isOpen && el.id === id && (
    //       <ToastsWrapper id={`portal-${el.id}-${el.isOpen}`} key={el.id} position={{...this.lastPosition, offset: el.order}}>
    //         {el.element}
    //       </ToastsWrapper>
    //     )
    //   }),
    //   document.getElementById('root') as HTMLElement
    // );
    // console.log(this.storage)
    // const multiplier = this.storage.filter(el => el.isOpen).length - 1
    // const inQueue = [...this.idQueue].reverse().findIndex(el => el === id)
    // const p = document.getElementById(`portal-${id}`)
    // if (p) {
    //   const t = ReactDOM.createPortal(this.storage.map(el => el.isOpen && el.id === id && (
    //     <ToastsWrapper key={el.id} position={{...this.lastPosition, offset: multiplier - inQueue}}>
    //       {el.element}
    //     </ToastsWrapper>
    //   )), p)
    //   return t
    // }
    // return null
  }
}
