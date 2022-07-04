import React from 'react';
import ReactDOM from 'react-dom';
import { ToastsWrapper } from './styled';
import { Position, Props, ToastView } from './Toast';

export default class Toast {
  private static toast: Toast | null = null;
  storage: { id: string; element: JSX.Element; isOpen: boolean }[];
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
      // document.querySelector('#portal-root')?.remove()
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

    return this.render(unicId);
  }

  private toggleOpenModal(id: string, isOpen: boolean) {
    if (isOpen) {
      if (!this.idQueue.includes(id)) {
        this.idQueue.push(id)
      }
      this.storage = this.storage.map(el => {
        return el.id === id ? {...el, isOpen} : el
      })
    } else {
      const ind = this.idQueue.findIndex(el => el === id)
      ind !== -1 && this.idQueue.splice(ind, 1)
      
      const indToDel = this.storage.findIndex(el => el.id === id)
      this.storage.splice(indToDel, 1)
    }
  }

  private addToStorage(props: Props, id: string, toast: JSX.Element) {
    const currentIndex = this.storage.findIndex(el => el.id === id);
    if (currentIndex >= 0) {
      this.storage.splice(currentIndex, 1, {
        ...this.storage[currentIndex],
        isOpen: props.open,
      });
      this.toggleOpenModal(id, props.open)
    } else {
      if (props.open) {
        this.storage.push({ element: toast, id, isOpen: props.open })
        this.toggleOpenModal(id, props.open)
      }
    }
  }

  render(id: string) {
    const offset = this.idQueue.indexOf(id)
    return ReactDOM.createPortal(
      this.storage.map(el => {
        el.isOpen && console.log(offset, this.idQueue, id)
        return el.isOpen && el.id === id && (
          <ToastsWrapper key={el.id} position={{...this.lastPosition, offset}}>
            {el.element}
          </ToastsWrapper>
        )
      }),
      document.getElementById('root') as HTMLElement
    );
  }
}
