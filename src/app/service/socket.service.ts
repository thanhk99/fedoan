import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  // Lưu trữ các kết nối WebSocket
  private socketConnections: Map<string, WebSocket> = new Map();
  
  // Subject để quản lý tin nhắn từ các kết nối
  private messagesSubject = new Subject<{url: string, message: any}>();
  
  // Subject theo dõi trạng thái kết nối
  private connectionStatusSubject = new BehaviorSubject<{[url: string]: boolean}>({});

  constructor() {}

  // Phương thức kết nối WebSocket thông minh
  connect(url: string): WebSocket {
    // Kiểm tra nếu đã có kết nối cho URL này
    const existingSocket = this.socketConnections.get(url);
    
    // Nếu socket đã tồn tại và đang mở, trả về socket đó
    if (existingSocket && 
        (existingSocket.readyState === WebSocket.OPEN || 
         existingSocket.readyState === WebSocket.CONNECTING)) {
      console.log(`WebSocket to ${url} already exists and is active`);
      return existingSocket;
    }

    // Tạo kết nối mới
    const socket = new window.WebSocket(url);

    // Lưu trữ kết nối
    this.socketConnections.set(url, socket);

    // Cập nhật trạng thái kết nối
    const updateConnectionStatus = (status: boolean) => {
      const currentStatus = this.connectionStatusSubject.value;
      this.connectionStatusSubject.next({
        ...currentStatus,
        [url]: status
      });
    };

    socket.onopen = (event) => {
      console.log(`WebSocket connected to ${url}:`, event);
      updateConnectionStatus(true);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        this.messagesSubject.next({ url, message });
      } catch (error) {
        this.messagesSubject.next({ url, message: event.data });
      }
    };

    socket.onclose = (event) => {
      console.log(`WebSocket disconnected from ${url}:`, event);
      updateConnectionStatus(false);
      
      // Xóa kết nối khỏi bản đồ
      this.socketConnections.delete(url);
    };

    socket.onerror = (error) => {
      console.error(`WebSocket error for ${url}:`, error);
      updateConnectionStatus(false);
    };

    return socket;
  }

  // Gửi tin nhắn đến một URL cụ thể
  sendMessage(url: string, message: any) {
    const socket = this.socketConnections.get(url);
    
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.warn(`Cannot send message. WebSocket to ${url} is not open.`);
    }
  }

  // Lấy tin nhắn từ tất cả các kết nối
  getMessages(): Observable<{url: string, message: any}> {
    return this.messagesSubject.asObservable();
  }

  // Theo dõi trạng thái kết nối của tất cả URL
  getConnectionStatus(): Observable<{[url: string]: boolean}> {
    return this.connectionStatusSubject.asObservable();
  }

  // Đóng kết nối cho một URL cụ thể
  disconnect(url: string) {
    const socket = this.socketConnections.get(url);
    
    if (socket) {
      socket.close();
      this.socketConnections.delete(url);
    }
  }

  // Đóng tất cả các kết nối
  disconnectAll() {
    this.socketConnections.forEach((socket, url) => {
      socket.close();
    });
    this.socketConnections.clear();
  }
}